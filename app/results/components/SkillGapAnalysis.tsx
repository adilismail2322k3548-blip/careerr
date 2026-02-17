import { CheckCircle, XCircle } from 'lucide-react';

interface SkillGapAnalysisProps {
  requiredSkills: string[];
  skillGaps: string[];
}

export default function SkillGapAnalysis({ requiredSkills, skillGaps }: SkillGapAnalysisProps) {
  const acquiredSkills = requiredSkills.filter(skill => !skillGaps.includes(skill));

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">
        🎯 Skill Gap Analysis
      </h4>

      {/* Skills You Have */}
      {acquiredSkills.length > 0 && (
        <div className="mb-4">
          <h5 className="text-sm font-medium text-green-700 mb-2">✓ Skills You Have:</h5>
          <div className="space-y-2">
            {acquiredSkills.map((skill) => (
              <div key={skill} className="flex items-center text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills to Develop */}
      {skillGaps.length > 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="text-sm font-medium text-yellow-800 mb-2">⚠ Skills to Develop:</h5>
          <div className="space-y-2">
            {skillGaps.map((skill) => (
              <div key={skill} className="flex items-center text-sm text-gray-700">
                <XCircle className="h-4 w-4 text-yellow-600 mr-2 flex-shrink-0" />
                {skill}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-yellow-700">
            Focus on developing these skills to increase your readiness for this career path.
          </p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            🎉 Great news! You have all the required skills for this career.
          </p>
        </div>
      )}
    </div>
  );
}
