'use client';

import { useState, useEffect } from 'react';
import { getStatistics } from '@/app/actions/assessment';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/ui/Card';
import { BarChart, TrendingUp, Users, Award } from 'lucide-react';
import { formatPercentage } from '@/lib/utils';

interface Stats {
  totalAssessments: number;
  mostSelectedInterests: [string, number][];
  mostRecommendedCareers: [string, number][];
  averageMatchPercentage: number;
  educationLevelBreakdown: [string, number][];
}

export default function Statistics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const data = await getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading statistics...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12 text-red-500">Failed to load statistics</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Platform Statistics</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assessments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalAssessments}
                </p>
              </div>
              <Users className="h-12 w-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Match Score</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatPercentage(stats.averageMatchPercentage)}
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unique Careers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.mostRecommendedCareers.length}
                </p>
              </div>
              <Award className="h-12 w-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Selected Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Most Selected Interests</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.mostSelectedInterests.length > 0 ? (
            <div className="space-y-3">
              {stats.mostSelectedInterests.map(([interest, count]) => {
                const maxCount = Math.max(...stats.mostSelectedInterests.map(([, c]) => c));
                const percentage = (count / maxCount) * 100;

                return (
                  <div key={interest}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{interest}</span>
                      <span className="text-sm text-gray-600">{count} selections</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </CardContent>
      </Card>

      {/* Most Recommended Careers */}
      <Card>
        <CardHeader>
          <CardTitle>Most Recommended Careers</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.mostRecommendedCareers.length > 0 ? (
            <div className="space-y-3">
              {stats.mostRecommendedCareers.map(([career, count]) => {
                const maxCount = Math.max(...stats.mostRecommendedCareers.map(([, c]) => c));
                const percentage = (count / maxCount) * 100;

                return (
                  <div key={career}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{career}</span>
                      <span className="text-sm text-gray-600">{count} recommendations</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </CardContent>
      </Card>

      {/* Education Level Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Education Level Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.educationLevelBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.educationLevelBreakdown.map(([level, count]) => {
                const totalCount = stats.totalAssessments;
                const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;

                return (
                  <div key={level}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{level}</span>
                      <span className="text-sm text-gray-600">
                        {count} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
