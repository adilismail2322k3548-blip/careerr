// Database Types

export interface CareerOption {
  id: string;
  name: string;
  description: string | null;
  required_interests: string[];
  required_skills: string[];
  required_strengths: string[];
  minimum_education: string | null;
  roadmap: string | null;
  learning_resources: string | null;
  created_at: string;
}

export interface AssessmentQuestion {
  id: string;
  question_text: string;
  question_type: 'interests' | 'skills' | 'strengths';
  options: string[];
  order_index: number | null;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  education_level: string;
  marks_cgpa: number;
  created_at: string;
}

export interface AssessmentResponse {
  id: string;
  student_profile_id: string;
  interests: string[];
  skills: string[];
  strengths: string[];
  created_at: string;
}

export interface Recommendation {
  id: string;
  student_profile_id: string;
  career_option_id: string | null;
  match_percentage: number;
  confidence_score: 'high' | 'medium' | 'low';
  skill_gaps: string[];
  rank: number;
  created_at: string;
  career_option?: CareerOption;
}

// Form Types
export interface PersonalInfo {
  name: string;
  education_level: string;
  marks_cgpa: number;
}

export interface AssessmentData {
  personalInfo: PersonalInfo;
  interests: string[];
  skills: string[];
  strengths: string[];
}

// AI Logic Types
export interface CareerScore {
  career: CareerOption;
  score: number;
  matchPercentage: number;
  confidenceScore: 'high' | 'medium' | 'low';
  skillGaps: string[];
  rank: number;
}

export type EducationLevel = 'High School' | 'Undergraduate' | 'Graduate';
