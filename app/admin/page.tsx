'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import CareerManagement from './components/CareerManagement';
import QuestionManagement from './components/QuestionManagement';
import StudentSubmissions from './components/StudentSubmissions';
import Statistics from './components/Statistics';
import { LayoutDashboard, Briefcase, HelpCircle, Users, BarChart3 } from 'lucide-react';

type Tab = 'overview' | 'careers' | 'questions' | 'submissions' | 'statistics';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: LayoutDashboard },
    { id: 'careers' as Tab, label: 'Career Management', icon: Briefcase },
    { id: 'questions' as Tab, label: 'Questions', icon: HelpCircle },
    { id: 'submissions' as Tab, label: 'Submissions', icon: Users },
    { id: 'statistics' as Tab, label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage careers, questions, view submissions, and analyze statistics
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <LayoutDashboard className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h3>
                <p className="text-sm text-gray-600">Admin Control Panel</p>
              </Card>
              <Card className="text-center cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('careers')}>
                <Briefcase className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Careers</h3>
                <p className="text-sm text-gray-600">Manage career options</p>
              </Card>
              <Card className="text-center cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('questions')}>
                <HelpCircle className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Questions</h3>
                <p className="text-sm text-gray-600">Manage assessment questions</p>
              </Card>
              <Card className="text-center cursor-pointer hover:shadow-lg" onClick={() => setActiveTab('submissions')}>
                <Users className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Submissions</h3>
                <p className="text-sm text-gray-600">View student assessments</p>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Welcome to Admin Dashboard</CardTitle>
              </CardHeader>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Use this dashboard to manage the AI Career Counselor platform. You can:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Add, edit, or delete career options</li>
                  <li>Manage assessment questions (interests, skills, strengths)</li>
                  <li>View all student submissions and their results</li>
                  <li>Analyze statistics about assessments and recommendations</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Select a tab above to get started.
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'careers' && <CareerManagement />}
        {activeTab === 'questions' && <QuestionManagement />}
        {activeTab === 'submissions' && <StudentSubmissions />}
        {activeTab === 'statistics' && <Statistics />}
      </div>
    </div>
  );
}
