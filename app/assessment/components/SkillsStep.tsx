'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';

interface SkillsStepProps {
  initialData: string[];
  onNext: (skills: string[]) => void;
  onBack: () => void;
}

const skillOptions = [
  'Logical Thinking',
  'Communication',
  'Creativity',
  'Problem Solving',
  'Leadership',
  'Analytical Skills',
  'Technical Skills',
  'Empathy',
  'Writing',
  'Attention to Detail',
  'Project Management',
  'Critical Thinking',
  'Data Analysis',
  'Public Speaking',
  'Teamwork',
];

export default function SkillsStep({ initialData, onNext, onBack }: SkillsStepProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData);
  const [error, setError] = useState<string>('');

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      setError('Please select at least one skill');
      return;
    }
    onNext(selectedSkills);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills</h2>
        <p className="text-gray-600">Select all skills you possess or excel at (select multiple)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {skillOptions.map((skill) => (
          <label
            key={skill}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedSkills.includes(skill)
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => toggleSkill(skill)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-900">{skill}</span>
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
