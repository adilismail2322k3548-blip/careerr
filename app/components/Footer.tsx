import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AI Career Counselor</h3>
            <p className="text-gray-400 text-sm">
              Guiding students toward suitable career paths using AI-powered recommendations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              This platform uses a rule-based AI algorithm to match students with careers based on their interests, skills, and strengths.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Career Counselor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
