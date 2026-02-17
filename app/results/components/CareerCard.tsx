import { Recommendation } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/Card';
import { getConfidenceBadgeColor, formatPercentage, getProgressColor } from '@/lib/utils';
import { Trophy, TrendingUp, AlertCircle } from 'lucide-react';
import SkillGapAnalysis from './SkillGapAnalysis';
import CareerRoadmap from './CareerRoadmap';

interface CareerCardProps {
  recommendation: Recommendation;
}

export default function CareerCard({ recommendation }: CareerCardProps) {
  const { career_option, match_percentage, confidence_score, skill_gaps, rank } = recommendation;

  if (!career_option) {
    return null;
  }

  const rankColors = {
    1: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    2: 'text-gray-600 bg-gray-50 border-gray-200',
    3: 'text-orange-600 bg-orange-50 border-orange-200',
  };

  const rankIcons = {
    1: <Trophy className="h-6 w-6" />,
    2: <TrendingUp className="h-6 w-6" />,
    3: <AlertCircle className="h-6 w-6" />,
  };

  return (
    <Card className="border-2 border-gray-200 hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg border-2 ${rankColors[rank as keyof typeof rankColors] || 'text-gray-600 bg-gray-50'}`}>
                {rankIcons[rank as keyof typeof rankIcons]}
              </div>
              <CardTitle className="text-2xl">
                #{rank} {career_option.name}
              </CardTitle>
            </div>
            {career_option.description && (
              <p className="text-gray-600 mt-2">{career_option.description}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Match Percentage and Confidence */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Match Score</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatPercentage(match_percentage)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getConfidenceBadgeColor(confidence_score)}`}>
                {confidence_score.toUpperCase()} CONFIDENCE
              </span>
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor(match_percentage)} transition-all duration-500`}
              style={{ width: `${match_percentage}%` }}
            />
          </div>
        </div>

        {/* Required Education */}
        {career_option.minimum_education && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Minimum Education:</span> {career_option.minimum_education}
            </p>
          </div>
        )}

        {/* Skill Gap Analysis */}
        <SkillGapAnalysis
          requiredSkills={career_option.required_skills}
          skillGaps={skill_gaps}
        />

        {/* Career Roadmap */}
        <CareerRoadmap roadmap={career_option.roadmap} />

        {/* Learning Resources */}
        {career_option.learning_resources && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              📚 Learning Resources
            </h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {career_option.learning_resources}
              </p>
            </div>
          </div>
        )}

        {/* Required Interests */}
        {career_option.required_interests && career_option.required_interests.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Interests:</h4>
            <div className="flex flex-wrap gap-2">
              {career_option.required_interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Required Strengths */}
        {career_option.required_strengths && career_option.required_strengths.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Important Strengths:</h4>
            <div className="flex flex-wrap gap-2">
              {career_option.required_strengths.map((strength) => (
                <span
                  key={strength}
                  className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
