'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/Input';
import { Select } from '@/app/components/ui/Select';
import { Button } from '@/app/components/ui/Button';
import { PersonalInfo } from '@/lib/types';

interface PersonalInfoStepProps {
  initialData: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
}

export default function PersonalInfoStep({ initialData, onNext }: PersonalInfoStepProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const educationOptions = [
    { value: 'High School', label: 'High School' },
    { value: 'Undergraduate', label: 'Undergraduate' },
    { value: 'Graduate', label: 'Graduate' },
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.marks_cgpa || formData.marks_cgpa <= 0) {
      newErrors.marks_cgpa = 'Please enter a valid marks/CGPA';
    }

    if (formData.marks_cgpa > 100 && formData.marks_cgpa <= 10) {
      // Likely a mistake - CGPA should be 0-10
    } else if (formData.marks_cgpa > 100) {
      newErrors.marks_cgpa = 'Please enter a valid value (0-10 for CGPA or 0-100 for percentage)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      <Input
        label="Full Name"
        type="text"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        placeholder="Enter your full name"
      />

      <Select
        label="Education Level"
        required
        value={formData.education_level}
        onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
        options={educationOptions}
      />

      <Input
        label="Marks/CGPA"
        type="number"
        required
        min="0"
        max="100"
        step="0.01"
        value={formData.marks_cgpa || ''}
        onChange={(e) => setFormData({ ...formData, marks_cgpa: parseFloat(e.target.value) || 0 })}
        error={errors.marks_cgpa}
        placeholder="Enter your marks (0-100) or CGPA (0-10)"
      />

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Next
        </Button>
      </div>
    </form>
  );
}
