'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonalInfoStep from './components/PersonalInfoStep';
import InterestsStep from './components/InterestsStep';
import SkillsStep from './components/SkillsStep';
import StrengthsStep from './components/StrengthsStep';
import { AssessmentData, PersonalInfo } from '@/lib/types';
import { saveStudentProfile, saveAssessmentResponses, generateRecommendations } from '@/app/actions/assessment';
import { Card } from '@/app/components/ui/Card';
import { CheckCircle } from 'lucide-react';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    personalInfo: {
      name: '',
      education_level: 'Undergraduate',
      marks_cgpa: 0,
    },
    interests: [],
    skills: [],
    strengths: [],
  });

  const handlePersonalInfoNext = (data: PersonalInfo) => {
    setAssessmentData(prev => ({ ...prev, personalInfo: data }));
    setCurrentStep(2);
  };

  const handleInterestsNext = (interests: string[]) => {
    setAssessmentData(prev => ({ ...prev, interests }));
    setCurrentStep(3);
  };

  const handleSkillsNext = (skills: string[]) => {
    setAssessmentData(prev => ({ ...prev, skills }));
    setCurrentStep(4);
  };

  const handleStrengthsSubmit = async (strengths: string[]) => {
    setIsSubmitting(true);
    try {
      // Save complete assessment data
      const updatedData = { ...assessmentData, strengths };

      // 1. Save student profile
      const studentProfile = await saveStudentProfile(
        updatedData.personalInfo.name,
        updatedData.personalInfo.education_level,
        updatedData.personalInfo.marks_cgpa
      );

      // 2. Save assessment responses
      await saveAssessmentResponses(
        studentProfile.id,
        updatedData.interests,
        updatedData.skills,
        updatedData.strengths
      );

      // 3. Generate and save recommendations
      await generateRecommendations(
        studentProfile.id,
        updatedData.interests,
        updatedData.skills,
        updatedData.strengths,
        updatedData.personalInfo.education_level,
        updatedData.personalInfo.marks_cgpa
      );

      // 4. Redirect to results page
      router.push(`/results?studentId=${studentProfile.id}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Assessment</h1>
        <p className="text-gray-600 mb-6">
          Complete this assessment to get personalized career recommendations
        </p>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-600">
                  {step === 1 && 'Personal'}
                  {step === 2 && 'Interests'}
                  {step === 3 && 'Skills'}
                  {step === 4 && 'Strengths'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card>
        {currentStep === 1 && (
          <PersonalInfoStep
            initialData={assessmentData.personalInfo}
            onNext={handlePersonalInfoNext}
          />
        )}

        {currentStep === 2 && (
          <InterestsStep
            initialData={assessmentData.interests}
            onNext={handleInterestsNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <SkillsStep
            initialData={assessmentData.skills}
            onNext={handleSkillsNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <StrengthsStep
            initialData={assessmentData.strengths}
            onSubmit={handleStrengthsSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </Card>
    </div>
  );
}
