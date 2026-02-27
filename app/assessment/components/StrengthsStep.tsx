'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Loader2 } from 'lucide-react';

interface StrengthsStepProps {
  initialData: string[];
  onSubmit: (strengths: string[]) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const strengthOptions = [
  'Quick Learner',
  'Team Player',
  'Independent Worker',
  'Detail-Oriented',
  'Innovative',
  'Patient',
  'Risk Taker',
  'Adaptable',
  'Persistent',
  'Organized',
  'Confident',
  'Empathetic',
  'Decisive',
];

export default function StrengthsStep({ initialData, onSubmit, onBack, isSubmitting }: StrengthsStepProps) {
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>(initialData);
  const [error, setError] = useState<string>('');

  const toggleStrength = (strength: string) => {
    setSelectedStrengths(prev =>
      prev.includes(strength)
        ? prev.filter(s => s !== strength)
        : [...prev, strength]
    );
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStrengths.length === 0) {
      setError('Please select at least one strength');
      return;
    }
    onSubmit(selectedStrengths);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Strengths</h2>
        <p className="text-gray-600">Select your personal strengths (select multiple)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {strengthOptions.map((strength) => (
          <label
            key={strength}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedStrengths.includes(strength)
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedStrengths.includes(strength)}
              onChange={() => toggleStrength(strength)}
              className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              disabled={isSubmitting}
            />
            <span className="ml-3 text-sm font-medium text-gray-900">{strength}</span>
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between pt-4">
        <Button type="button" variant="secondary" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Results...
            </>
          ) : (
            'Get Results'
          )}
        </Button>
      </div>
    </form>
  );
}
