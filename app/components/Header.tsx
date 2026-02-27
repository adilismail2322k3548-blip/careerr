import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">AI Career Counselor</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/assessment"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Take Assessment
          </Link>
          <Link
            href="/admin"
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}
