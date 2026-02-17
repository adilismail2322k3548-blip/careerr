'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRecommendations, getStudentProfile } from '@/app/actions/assessment';
import { Recommendation, StudentProfile } from '@/lib/types';
import CareerCard from './components/CareerCard';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Loader2, Download, Home } from 'lucide-react';
import Link from 'next/link';

export default function ResultsContent() {
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId');

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadResults() {
      if (!studentId) {
        setError('No student ID provided');
        setLoading(false);
        return;
      }

      try {
        const [recs, profile] = await Promise.all([
          getRecommendations(studentId),
          getStudentProfile(studentId),
        ]);

        setRecommendations(recs);
        setStudentProfile(profile);
      } catch (err) {
        console.error('Error loading results:', err);
        setError('Failed to load results. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [studentId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Loading your results...</p>
        </Card>
      </div>
    );
  }

  if (error || !studentProfile) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="text-center py-12">
          <p className="text-red-500 mb-4">{error || 'No results found'}</p>
          <Link href="/assessment">
            <Button>Take Assessment</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8 print:mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Career Recommendations
            </h1>
            <p className="text-gray-600">
              Results for {studentProfile.name} ({studentProfile.education_level})
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 print:hidden">
            <Button variant="outline" onClick={handlePrint}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Link href="/">
              <Button variant="secondary">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <p className="text-gray-700">
            Based on your interests, skills, and strengths, we&apos;ve identified the top 3 career paths
            that match your profile. Each recommendation includes a match percentage, confidence
            score, skill gap analysis, and a roadmap to help you achieve your goals.
          </p>
        </Card>
      </div>

      {/* Career Recommendations */}
      {recommendations.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600 mb-4">No recommendations available</p>
          <Link href="/assessment">
            <Button>Take Assessment Again</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-8">
          {recommendations.map((recommendation) => (
            <CareerCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}

      {/* Next Steps Section */}
      <Card className="mt-8 bg-gray-50 print:hidden">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            Review each career option carefully and consider which aligns best with your goals
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            Check the skill gaps and start working on developing those missing skills
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            Follow the career roadmap provided for your chosen path
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            Explore the learning resources to get started on your journey
          </li>
        </ul>
      </Card>
    </div>
  );
}
