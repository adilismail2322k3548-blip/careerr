'use server';

import { CareerOption, CareerScore } from '@/lib/types';
import { educationLevelToNumber } from '@/lib/utils';

/**
 * AI Career Counselor Logic - Rule-Based Scoring System
 * 
 * Scoring Algorithm:
 * - Interest match: +10 points per match
 * - Skill match: +8 points per match
 * - Strength match: +6 points per match
 * - Academic performance bonus: +0 to +15 points based on CGPA/marks
 * 
 * Weights:
 * - Interest weight: 40%
 * - Skills weight: 35%
 * - Strengths weight: 15%
 * - Academic performance weight: 10%
 */

interface MatchScores {
  interestScore: number;
  skillScore: number;
  strengthScore: number;
  academicBonus: number;
  totalScore: number;
}

/**
 * Calculate raw match scores for a career based on student responses
 */
function calculateRawScores(
  career: CareerOption,
  studentInterests: string[],
  studentSkills: string[],
  studentStrengths: string[],
  marksOrCgpa: number
): MatchScores {
  // Count matches
  const interestMatches = career.required_interests.filter(interest =>
    studentInterests.includes(interest)
  ).length;

  const skillMatches = career.required_skills.filter(skill =>
    studentSkills.includes(skill)
  ).length;

  const strengthMatches = career.required_strengths.filter(strength =>
    studentStrengths.includes(strength)
  ).length;

  // Calculate scores with point values
  const interestScore = interestMatches * 10; // 10 points per interest match
  const skillScore = skillMatches * 8; // 8 points per skill match
  const strengthScore = strengthMatches * 6; // 6 points per strength match

  // Academic performance bonus (0-15 points)
  // Assuming marks/CGPA is on a scale of 0-100 or 0-10
  // Normalize to 0-15 range
  let academicBonus = 0;
  if (marksOrCgpa <= 10) {
    // CGPA scale (0-10)
    academicBonus = (marksOrCgpa / 10) * 15;
  } else {
    // Percentage scale (0-100)
    academicBonus = (marksOrCgpa / 100) * 15;
  }

  const totalScore = interestScore + skillScore + strengthScore + academicBonus;

  return {
    interestScore,
    skillScore,
    strengthScore,
    academicBonus,
    totalScore,
  };
}

/**
 * Calculate weighted match score based on defined weights
 * 
 * Weights:
 * - Interest: 40%
 * - Skills: 35%
 * - Strengths: 15%
 * - Academic: 10%
 */
function calculateWeightedScore(scores: MatchScores, career: CareerOption): number {
  // Calculate maximum possible scores for each category
  const maxInterestScore = career.required_interests.length * 10;
  const maxSkillScore = career.required_skills.length * 8;
  const maxStrengthScore = career.required_strengths.length * 6;
  const maxAcademicBonus = 15;

  // Calculate normalized scores (0-1 range)
  const normalizedInterest = maxInterestScore > 0 ? scores.interestScore / maxInterestScore : 0;
  const normalizedSkill = maxSkillScore > 0 ? scores.skillScore / maxSkillScore : 0;
  const normalizedStrength = maxStrengthScore > 0 ? scores.strengthScore / maxStrengthScore : 0;
  const normalizedAcademic = scores.academicBonus / maxAcademicBonus;

  // Apply weights
  const weightedScore = (
    normalizedInterest * 0.40 +
    normalizedSkill * 0.35 +
    normalizedStrength * 0.15 +
    normalizedAcademic * 0.10
  );

  // Convert to 0-100 scale
  return weightedScore * 100;
}

/**
 * Determine confidence score based on match percentage
 */
function determineConfidence(matchPercentage: number): 'high' | 'medium' | 'low' {
  if (matchPercentage >= 75) return 'high';
  if (matchPercentage >= 50) return 'medium';
  return 'low';
}

/**
 * Identify skill gaps - skills required for career that student doesn't have
 */
function identifySkillGaps(
  requiredSkills: string[],
  studentSkills: string[]
): string[] {
  return requiredSkills.filter(skill => !studentSkills.includes(skill));
}

/**
 * Check if student's education level meets the minimum requirement
 */
function meetsEducationRequirement(
  studentEducation: string,
  minimumEducation: string | null
): boolean {
  if (!minimumEducation) return true;

  const studentLevel = educationLevelToNumber(studentEducation);
  const minimumLevel = educationLevelToNumber(minimumEducation);

  return studentLevel >= minimumLevel;
}

/**
 * Main AI algorithm - Calculate match scores for all careers
 */
export async function calculateMatchScore(
  career: CareerOption,
  studentInterests: string[],
  studentSkills: string[],
  studentStrengths: string[],
  studentEducation: string,
  marksOrCgpa: number
): Promise<CareerScore> {
  // Calculate raw scores
  const scores = calculateRawScores(
    career,
    studentInterests,
    studentSkills,
    studentStrengths,
    marksOrCgpa
  );

  // Calculate weighted match percentage
  let matchPercentage = calculateWeightedScore(scores, career);

  // Apply education requirement penalty if not met
  if (!meetsEducationRequirement(studentEducation, career.minimum_education)) {
    matchPercentage *= 0.7; // 30% penalty for not meeting education requirement
  }

  // Ensure match percentage is between 0 and 100
  matchPercentage = Math.min(100, Math.max(0, matchPercentage));

  // Determine confidence score
  const confidenceScore = determineConfidence(matchPercentage);

  // Identify skill gaps
  const skillGaps = identifySkillGaps(career.required_skills, studentSkills);

  return {
    career,
    score: scores.totalScore,
    matchPercentage,
    confidenceScore,
    skillGaps,
    rank: 0, // Will be set during ranking
  };
}

/**
 * Rank careers by match percentage and return top N
 */
function rankCareers(careerScores: CareerScore[], topN: number = 3): CareerScore[] {
  // Sort by match percentage in descending order
  const sortedCareers = careerScores.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Assign ranks to top N careers
  return sortedCareers.slice(0, topN).map((careerScore, index) => ({
    ...careerScore,
    rank: index + 1,
  }));
}

/**
 * Process all careers and return ranked recommendations
 */
export async function generateCareerRecommendations(
  careers: CareerOption[],
  studentInterests: string[],
  studentSkills: string[],
  studentStrengths: string[],
  studentEducation: string,
  marksOrCgpa: number
): Promise<CareerScore[]> {
  // Calculate scores for all careers
  const careerScores = await Promise.all(
    careers.map(career =>
      calculateMatchScore(
        career,
        studentInterests,
        studentSkills,
        studentStrengths,
        studentEducation,
        marksOrCgpa
      )
    )
  );

  // Rank and return top 3 careers
  return rankCareers(careerScores, 3);
}
