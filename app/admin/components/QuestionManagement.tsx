'use client';

import { useState, useEffect } from 'react';
import { getAllQuestions, createQuestion, updateQuestion, deleteQuestion } from '@/app/actions/questions';
import { AssessmentQuestion } from '@/lib/types';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input, Textarea } from '@/app/components/ui/Input';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function QuestionManagement() {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AssessmentQuestion | null>(null);

  const [formData, setFormData] = useState({
    question_text: '',
    question_type: 'interests' as 'interests' | 'skills' | 'strengths',
    options: '',
    order_index: 0,
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const questionData = {
      question_text: formData.question_text,
      question_type: formData.question_type,
      options: formData.options.split(',').map(s => s.trim()).filter(Boolean),
      order_index: formData.order_index,
    };

    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, questionData);
      } else {
        await createQuestion(questionData);
      }
      await loadQuestions();
      resetForm();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question. Please try again.');
    }
  };

  const handleEdit = (question: AssessmentQuestion) => {
    setEditingQuestion(question);
    setFormData({
      question_text: question.question_text,
      question_type: question.question_type,
      options: question.options.join(', '),
      order_index: question.order_index || 0,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      await deleteQuestion(id);
      await loadQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      question_text: '',
      question_type: 'interests',
      options: '',
      order_index: 0,
    });
    setEditingQuestion(null);
    setShowForm(false);
  };

  const groupedQuestions = {
    interests: questions.filter(q => q.question_type === 'interests'),
    skills: questions.filter(q => q.question_type === 'skills'),
    strengths: questions.filter(q => q.question_type === 'strengths'),
  };

  if (loading) {
    return <div className="text-center py-12">Loading questions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Assessment Questions</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'Add Question'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingQuestion ? 'Edit Question' : 'Add New Question'}</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Textarea
              label="Question Text"
              required
              rows={2}
              value={formData.question_text}
              onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.question_type}
                onChange={(e) => setFormData({ ...formData, question_type: e.target.value as any })}
                required
              >
                <option value="interests">Interests</option>
                <option value="skills">Skills</option>
                <option value="strengths">Strengths</option>
              </select>
            </div>

            <Textarea
              label="Options (comma-separated)"
              placeholder="Option 1, Option 2, Option 3, etc."
              required
              rows={4}
              value={formData.options}
              onChange={(e) => setFormData({ ...formData, options: e.target.value })}
            />

            <Input
              label="Order Index"
              type="number"
              min="0"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
            />

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                {editingQuestion ? 'Update Question' : 'Create Question'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Interests Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Interests Questions</CardTitle>
        </CardHeader>
        <div className="p-6 space-y-4">
          {groupedQuestions.interests.map((question) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{question.question_text}</p>
                  <div className="flex flex-wrap gap-1">
                    {question.options.map((option) => (
                      <span key={option} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(question)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(question.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {groupedQuestions.interests.length === 0 && (
            <p className="text-gray-500 text-center py-4">No interests questions found.</p>
          )}
        </div>
      </Card>

      {/* Skills Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Skills Questions</CardTitle>
        </CardHeader>
        <div className="p-6 space-y-4">
          {groupedQuestions.skills.map((question) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{question.question_text}</p>
                  <div className="flex flex-wrap gap-1">
                    {question.options.map((option) => (
                      <span key={option} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(question)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(question.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {groupedQuestions.skills.length === 0 && (
            <p className="text-gray-500 text-center py-4">No skills questions found.</p>
          )}
        </div>
      </Card>

      {/* Strengths Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">Strengths Questions</CardTitle>
        </CardHeader>
        <div className="p-6 space-y-4">
          {groupedQuestions.strengths.map((question) => (
            <div key={question.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{question.question_text}</p>
                  <div className="flex flex-wrap gap-1">
                    {question.options.map((option) => (
                      <span key={option} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(question)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(question.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {groupedQuestions.strengths.length === 0 && (
            <p className="text-gray-500 text-center py-4">No strengths questions found.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
