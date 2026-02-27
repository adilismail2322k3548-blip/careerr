'use server';

import { supabase } from '@/lib/supabase';
import { AssessmentQuestion } from '@/lib/types';
import { revalidatePath } from 'next/cache';

/**
 * Fetch all assessment questions from the database
 */
export async function getAllQuestions(): Promise<AssessmentQuestion[]> {
  const { data, error } = await supabase
    .from('assessment_questions')
    .select('*')
    .order('order_index');

  if (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }

  return data || [];
}

/**
 * Get questions by type
 */
export async function getQuestionsByType(type: 'interests' | 'skills' | 'strengths'): Promise<AssessmentQuestion[]> {
  const { data, error } = await supabase
    .from('assessment_questions')
    .select('*')
    .eq('question_type', type)
    .order('order_index');

  if (error) {
    console.error('Error fetching questions by type:', error);
    throw new Error('Failed to fetch questions');
  }

  return data || [];
}

/**
 * Create a new assessment question
 */
export async function createQuestion(
  question: Omit<AssessmentQuestion, 'id' | 'created_at'>
): Promise<AssessmentQuestion> {
  const { data, error } = await supabase
    .from('assessment_questions')
    .insert([question])
    .select()
    .single();

  if (error) {
    console.error('Error creating question:', error);
    throw new Error('Failed to create question');
  }

  revalidatePath('/admin');
  return data;
}

/**
 * Update an existing question
 */
export async function updateQuestion(
  id: string,
  updates: Partial<Omit<AssessmentQuestion, 'id' | 'created_at'>>
): Promise<AssessmentQuestion> {
  const { data, error } = await supabase
    .from('assessment_questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating question:', error);
    throw new Error('Failed to update question');
  }

  revalidatePath('/admin');
  return data;
}

/**
 * Delete a question
 */
export async function deleteQuestion(id: string): Promise<void> {
  const { error } = await supabase
    .from('assessment_questions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting question:', error);
    throw new Error('Failed to delete question');
  }

  revalidatePath('/admin');
}
