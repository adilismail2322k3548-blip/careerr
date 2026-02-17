'use server';

import { supabase } from '@/lib/supabase';
import { StudentProfile, AssessmentResponse, Recommendation, CareerOption } from '@/lib/types';
import { generateCareerRecommendations } from './ai-logic';
import { getAllCareers } from './careers';

/**
 * Save student profile information
 */
export async function saveStudentProfile(
  name: string,
  educationLevel: string,
  marksCgpa: number
): Promise<StudentProfile> {
  const { data, error } = await supabase
    .from('student_profiles')
    .insert([
      {
        name,
        education_level: educationLevel,
        marks_cgpa: marksCgpa,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving student profile:', error);
    throw new Error('Failed to save student profile');
  }

  return data;
}

/**
 * Save assessment responses (interests, skills, strengths)
 */
export async function saveAssessmentResponses(
  studentProfileId: string,
  interests: string[],
  skills: string[],
  strengths: string[]
): Promise<AssessmentResponse> {
  const { data, error } = await supabase
    .from('assessment_responses')
    .insert([
      {
        student_profile_id: studentProfileId,
        interests,
        skills,
        strengths,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving assessment responses:', error);
    throw new Error('Failed to save assessment responses');
  }

  return data;
}

/**
 * Generate and save career recommendations based on assessment
 */
export async function generateRecommendations(
  studentProfileId: string,
  interests: string[],
  skills: string[],
  strengths: string[],
  educationLevel: string,
  marksCgpa: number
): Promise<Recommendation[]> {
  // Fetch all careers
  const careers = await getAllCareers();

  // Generate recommendations using AI logic
  const careerScores = await generateCareerRecommendations(
    careers,
    interests,
    skills,
    strengths,
    educationLevel,
    marksCgpa
  );

  // Save recommendations to database
  const recommendationsToInsert = careerScores.map(score => ({
    student_profile_id: studentProfileId,
    career_option_id: score.career.id,
    match_percentage: score.matchPercentage,
    confidence_score: score.confidenceScore,
    skill_gaps: score.skillGaps,
    rank: score.rank,
  }));

  const { data, error } = await supabase
    .from('recommendations')
    .insert(recommendationsToInsert)
    .select();

  if (error) {
    console.error('Error saving recommendations:', error);
    throw new Error('Failed to save recommendations');
  }

  return data || [];
}

/**
 * Get recommendations for a student with career details
 */
export async function getRecommendations(studentProfileId: string): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from('recommendations')
    .select(`
      *,
      career_option:career_options(*)
    `)
    .eq('student_profile_id', studentProfileId)
    .order('rank');

  if (error) {
    console.error('Error fetching recommendations:', error);
    throw new Error('Failed to fetch recommendations');
  }

  return data || [];
}

/**
 * Get student profile by ID
 */
export async function getStudentProfile(studentProfileId: string): Promise<StudentProfile | null> {
  const { data, error } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('id', studentProfileId)
    .single();

  if (error) {
    console.error('Error fetching student profile:', error);
    return null;
  }

  return data;
}

/**
 * Get assessment response for a student
 */
export async function getAssessmentResponse(studentProfileId: string): Promise<AssessmentResponse | null> {
  const { data, error } = await supabase
    .from('assessment_responses')
    .select('*')
    .eq('student_profile_id', studentProfileId)
    .single();

  if (error) {
    console.error('Error fetching assessment response:', error);
    return null;
  }

  return data;
}

/**
 * Get all student submissions for admin view
 */
export async function getAllSubmissions() {
  const { data, error } = await supabase
    .from('student_profiles')
    .select(`
      *,
      recommendations!inner(
        match_percentage,
        confidence_score,
        rank,
        career_option:career_options(name)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    throw new Error('Failed to fetch submissions');
  }

  return data || [];
}

/**
 * Get statistics for admin dashboard
 */
export async function getStatistics() {
  try {
    // Total assessments
    const { count: totalAssessments } = await supabase
      .from('student_profiles')
      .select('*', { count: 'exact', head: true });

    // Most selected interests
    const { data: responses } = await supabase
      .from('assessment_responses')
      .select('interests');

    const interestCounts: { [key: string]: number } = {};
    responses?.forEach(response => {
      response.interests?.forEach((interest: string) => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1;
      });
    });

    // Most recommended careers
    const { data: recommendations } = await supabase
      .from('recommendations')
      .select(`
        career_option:career_options(name)
      `)
      .eq('rank', 1);

    const careerCounts: { [key: string]: number } = {};
    recommendations?.forEach(rec => {
      const careerName = (rec.career_option as any)?.name;
      if (careerName) {
        careerCounts[careerName] = (careerCounts[careerName] || 0) + 1;
      }
    });

    // Average match percentage
    const { data: allRecommendations } = await supabase
      .from('recommendations')
      .select('match_percentage')
      .eq('rank', 1);

    const avgMatch = allRecommendations && allRecommendations.length > 0
      ? allRecommendations.reduce((sum, rec) => sum + (rec.match_percentage || 0), 0) / allRecommendations.length
      : 0;

    // Education level breakdown
    const { data: profiles } = await supabase
      .from('student_profiles')
      .select('education_level');

    const educationCounts: { [key: string]: number } = {};
    profiles?.forEach(profile => {
      const level = profile.education_level;
      educationCounts[level] = (educationCounts[level] || 0) + 1;
    });

    return {
      totalAssessments: totalAssessments || 0,
      mostSelectedInterests: Object.entries(interestCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
      mostRecommendedCareers: Object.entries(careerCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10),
      averageMatchPercentage: avgMatch,
      educationLevelBreakdown: Object.entries(educationCounts),
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
}
