import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a number as a percentage with one decimal place
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/**
 * Get color based on confidence score
 */
export function getConfidenceColor(confidence: 'high' | 'medium' | 'low'): string {
  switch (confidence) {
    case 'high':
      return 'text-green-600 bg-green-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-red-600 bg-red-50';
  }
}

/**
 * Get badge color based on confidence score
 */
export function getConfidenceBadgeColor(confidence: 'high' | 'medium' | 'low'): string {
  switch (confidence) {
    case 'high':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-red-100 text-red-800 border-red-200';
  }
}

/**
 * Get progress bar color based on percentage
 */
export function getProgressColor(percentage: number): string {
  if (percentage >= 75) return 'bg-green-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Convert education level to numeric value for comparison
 */
export function educationLevelToNumber(level: string): number {
  const levels: { [key: string]: number } = {
    'High School': 1,
    'Undergraduate': 2,
    'Graduate': 3,
  };
  return levels[level] || 0;
}
