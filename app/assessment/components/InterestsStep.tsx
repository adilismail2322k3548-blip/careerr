'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';

interface InterestsStepProps {
  initialData: string[];
  onNext: (interests: string[]) => void;
  onBack: () => void;
}

const interestOptions = [
  'Technology',
  'Healthcare',
  'Business',
  'Arts',
  'Science',
  'Education',
  'Engineering',
  'Finance',
  'Writing',
  'Helping Others',
  'Analytics',
  'Problem Solving',
  'Creativity',
  'Leadership',
  'Innovation',
  'Communication',
  'Research',
];

export default function InterestsStep({ initialData, onNext, onBack }: InterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData);
  const [error, setError] = useState<string>('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    onNext(selectedInterests);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Interests</h2>
        <p className="text-gray-600">Select all areas that interest you (select multiple)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {interestOptions.map((interest) => (
          <label
            key={interest}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedInterests.includes(interest)
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedInterests.includes(interest)}
              onChange={() => toggleInterest(interest)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-900">{interest}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Next
        </Button>
      </div>
    </form>
  );
}
