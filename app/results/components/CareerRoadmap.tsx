import { MapPin } from 'lucide-react';

interface CareerRoadmapProps {
  roadmap: string | null;
}

export default function CareerRoadmap({ roadmap }: CareerRoadmapProps) {
  if (!roadmap) {
    return null;
  }

  // Parse roadmap - assuming it's in the format of numbered steps
  const steps = roadmap
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^\d+\.\s*/, '').trim());

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-3">
        🗺️ Career Roadmap
      </h4>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm mr-3">
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
