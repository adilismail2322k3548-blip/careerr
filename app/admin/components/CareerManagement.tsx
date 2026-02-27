'use client';

import { useState, useEffect } from 'react';
import { getAllCareers, createCareer, updateCareer, deleteCareer } from '@/app/actions/careers';
import { CareerOption } from '@/lib/types';
import { Card, CardHeader, CardTitle } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { Input, Textarea } from '@/app/components/ui/Input';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function CareerManagement() {
  const [careers, setCareers] = useState<CareerOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCareer, setEditingCareer] = useState<CareerOption | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    required_interests: '',
    required_skills: '',
    required_strengths: '',
    minimum_education: 'Undergraduate',
    roadmap: '',
    learning_resources: '',
  });

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    try {
      const data = await getAllCareers();
      setCareers(data);
    } catch (error) {
      console.error('Error loading careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const careerData = {
      name: formData.name,
      description: formData.description,
      required_interests: formData.required_interests.split(',').map(s => s.trim()).filter(Boolean),
      required_skills: formData.required_skills.split(',').map(s => s.trim()).filter(Boolean),
      required_strengths: formData.required_strengths.split(',').map(s => s.trim()).filter(Boolean),
      minimum_education: formData.minimum_education,
      roadmap: formData.roadmap,
      learning_resources: formData.learning_resources,
    };

    try {
      if (editingCareer) {
        await updateCareer(editingCareer.id, careerData);
      } else {
        await createCareer(careerData);
      }
      await loadCareers();
      resetForm();
    } catch (error) {
      console.error('Error saving career:', error);
      alert('Failed to save career. Please try again.');
    }
  };

  const handleEdit = (career: CareerOption) => {
    setEditingCareer(career);
    setFormData({
      name: career.name,
      description: career.description || '',
      required_interests: career.required_interests.join(', '),
      required_skills: career.required_skills.join(', '),
      required_strengths: career.required_strengths.join(', '),
      minimum_education: career.minimum_education || 'Undergraduate',
      roadmap: career.roadmap || '',
      learning_resources: career.learning_resources || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career?')) {
      return;
    }

    try {
      await deleteCareer(id);
      await loadCareers();
    } catch (error) {
      console.error('Error deleting career:', error);
      alert('Failed to delete career. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      required_interests: '',
      required_skills: '',
      required_strengths: '',
      minimum_education: 'Undergraduate',
      roadmap: '',
      learning_resources: '',
    });
    setEditingCareer(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-12">Loading careers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Career Options</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
          {showForm ? 'Cancel' : 'Add Career'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCareer ? 'Edit Career' : 'Add New Career'}</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Input
              label="Career Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Textarea
              label="Description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <Input
              label="Required Interests (comma-separated)"
              placeholder="Technology, Problem Solving, etc."
              value={formData.required_interests}
              onChange={(e) => setFormData({ ...formData, required_interests: e.target.value })}
            />

            <Input
              label="Required Skills (comma-separated)"
              placeholder="Logical Thinking, Technical Skills, etc."
              value={formData.required_skills}
              onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
            />

            <Input
              label="Required Strengths (comma-separated)"
              placeholder="Quick Learner, Innovative, etc."
              value={formData.required_strengths}
              onChange={(e) => setFormData({ ...formData, required_strengths: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Education
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.minimum_education}
                onChange={(e) => setFormData({ ...formData, minimum_education: e.target.value })}
              >
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            <Textarea
              label="Career Roadmap"
              placeholder="Step-by-step guide (one step per line, numbered)"
              rows={6}
              value={formData.roadmap}
              onChange={(e) => setFormData({ ...formData, roadmap: e.target.value })}
            />

            <Textarea
              label="Learning Resources"
              placeholder="Links and resources for learning"
              rows={3}
              value={formData.learning_resources}
              onChange={(e) => setFormData({ ...formData, learning_resources: e.target.value })}
            />

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                {editingCareer ? 'Update Career' : 'Create Career'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6">
        {careers.map((career) => (
          <Card key={career.id} hover>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{career.name}</h3>
                {career.description && (
                  <p className="text-gray-600 mb-3">{career.description}</p>
                )}

                <div className="space-y-2 text-sm">
                  {career.minimum_education && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Min. Education:</span> {career.minimum_education}
                    </p>
                  )}
                  {career.required_interests.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-700">Interests:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {career.required_interests.map((interest) => (
                          <span key={interest} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {career.required_skills.length > 0 && (
                    <div>
                      <span className="font-semibold text-gray-700">Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {career.required_skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(career)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(career.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {careers.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-gray-600">No careers found. Add your first career to get started.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
