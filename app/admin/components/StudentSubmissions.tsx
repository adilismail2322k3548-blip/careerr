'use client';

import { useState, useEffect } from 'react';
import { getAllSubmissions } from '@/app/actions/assessment';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { formatPercentage } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  education_level: string;
  marks_cgpa: number;
  created_at: string;
  recommendations: Array<{
    match_percentage: number;
    confidence_score: string;
    rank: number;
    career_option: { name: string };
  }>;
}

export default function StudentSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await getAllSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTopRecommendation = (submission: Submission) => {
    const topRec = submission.recommendations.find(r => r.rank === 1);
    return topRec;
  };

  if (loading) {
    return <div className="text-center py-12">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Student Submissions</h2>
        <p className="text-gray-600">Total: {submissions.length} assessments</p>
      </div>

      {selectedSubmission ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Submission Details</CardTitle>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to List
              </button>
            </div>
          </CardHeader>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Student Name</p>
                <p className="font-semibold text-gray-900">{selectedSubmission.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Education Level</p>
                <p className="font-semibold text-gray-900">{selectedSubmission.education_level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Marks/CGPA</p>
                <p className="font-semibold text-gray-900">{selectedSubmission.marks_cgpa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedSubmission.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
              <div className="space-y-3">
                {selectedSubmission.recommendations
                  .sort((a, b) => a.rank - b.rank)
                  .map((rec, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            #{rec.rank} {rec.career_option?.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Confidence: {rec.confidence_score.toUpperCase()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">
                            {formatPercentage(rec.match_percentage)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Education
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks/CGPA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Top Career
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => {
                  const topRec = getTopRecommendation(submission);
                  return (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{submission.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {submission.education_level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {submission.marks_cgpa}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {topRec?.career_option?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-blue-600">
                          {topRec ? formatPercentage(topRec.match_percentage) : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {submissions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No submissions found yet.
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
