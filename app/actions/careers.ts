'use server';

import { supabase } from '@/lib/supabase';
import { CareerOption } from '@/lib/types';
import { revalidatePath } from 'next/cache';

/**
 * Fetch all careers from the database
 */
export async function getAllCareers(): Promise<CareerOption[]> {
  const { data, error } = await supabase
    .from('career_options')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching careers:', error);
    throw new Error('Failed to fetch careers');
  }

  return data || [];
}

/**
 * Get a single career by ID
 */
export async function getCareerById(id: string): Promise<CareerOption | null> {
  const { data, error } = await supabase
    .from('career_options')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching career:', error);
    return null;
  }

  return data;
}

/**
 * Create a new career option
 */
export async function createCareer(career: Omit<CareerOption, 'id' | 'created_at'>): Promise<CareerOption> {
  const { data, error } = await supabase
    .from('career_options')
    .insert([career])
    .select()
    .single();

  if (error) {
    console.error('Error creating career:', error);
    throw new Error('Failed to create career');
  }

  revalidatePath('/admin');
  return data;
}

/**
 * Update an existing career option
 */
export async function updateCareer(
  id: string,
  updates: Partial<Omit<CareerOption, 'id' | 'created_at'>>
): Promise<CareerOption> {
  const { data, error } = await supabase
    .from('career_options')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating career:', error);
    throw new Error('Failed to update career');
  }

  revalidatePath('/admin');
  return data;
}

/**
 * Delete a career option
 */
export async function deleteCareer(id: string): Promise<void> {
  const { error } = await supabase
    .from('career_options')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting career:', error);
    throw new Error('Failed to delete career');
  }

  revalidatePath('/admin');
}
