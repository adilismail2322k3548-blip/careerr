-- AI Career Counselor Platform - Database Schema
-- Run this script in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Career Options Table
CREATE TABLE IF NOT EXISTS career_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    required_interests TEXT[] DEFAULT '{}',
    required_skills TEXT[] DEFAULT '{}',
    required_strengths TEXT[] DEFAULT '{}',
    minimum_education TEXT,
    roadmap TEXT,
    learning_resources TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Assessment Questions Table
CREATE TABLE IF NOT EXISTS assessment_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('interests', 'skills', 'strengths')),
    options TEXT[] DEFAULT '{}',
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    education_level TEXT NOT NULL,
    marks_cgpa NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Assessment Responses Table
CREATE TABLE IF NOT EXISTS assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    interests TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    strengths TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_profile_id UUID NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    career_option_id UUID REFERENCES career_options(id) ON DELETE SET NULL,
    match_percentage NUMERIC,
    confidence_score TEXT CHECK (confidence_score IN ('high', 'medium', 'low')),
    skill_gaps TEXT[] DEFAULT '{}',
    rank INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_responses_student ON assessment_responses(student_profile_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_student ON recommendations(student_profile_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_career ON recommendations(career_option_id);
CREATE INDEX IF NOT EXISTS idx_assessment_questions_type ON assessment_questions(question_type);

-- Note: For this simple project, RLS (Row Level Security) is disabled
-- If you want to enable RLS, uncomment the following lines:
-- ALTER TABLE career_options ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
