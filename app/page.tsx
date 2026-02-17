import Link from 'next/link';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Brain, Target, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Discover Your Perfect Career Path
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Get AI-powered career recommendations based on your interests, skills, and strengths.
          Our intelligent system analyzes your profile to suggest the best career options tailored just for you.
        </p>
        <Link href="/assessment">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced algorithm analyzes your profile for accurate recommendations
            </p>
          </Card>

          <Card className="text-center">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized</h3>
            <p className="text-gray-600">
              Get career suggestions matched to your unique strengths and interests
            </p>
          </Card>

          <Card className="text-center">
            <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Roadmap</h3>
            <p className="text-gray-600">
              Step-by-step guidance on how to achieve your career goals
            </p>
          </Card>

          <Card className="text-center">
            <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Login Required</h3>
            <p className="text-gray-600">
              Quick and easy assessment process without any registration
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Take Assessment</h3>
            <p className="text-gray-600">
              Answer questions about your interests, skills, and personal strengths
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Our AI algorithm processes your responses and matches you with careers
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-gray-600">
              Receive top 3 career recommendations with detailed roadmaps and resources
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What You'll Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Top 3 Career Recommendations</h4>
                <p className="text-gray-600">Ranked by match score with your profile</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Match Percentage</h4>
                <p className="text-gray-600">See how well each career fits your profile</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Skill Gap Analysis</h4>
                <p className="text-gray-600">Identify skills you need to develop</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Career Roadmap</h4>
                <p className="text-gray-600">Step-by-step path to achieve your goals</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Learning Resources</h4>
                <p className="text-gray-600">Curated resources to help you get started</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Confidence Score</h4>
                <p className="text-gray-600">Know how confident we are about each match</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-600 text-white rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Perfect Career?
        </h2>
        <p className="text-xl mb-8">
          Take the assessment now and get personalized career recommendations in minutes!
        </p>
        <Link href="/assessment">
          <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-0">
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
