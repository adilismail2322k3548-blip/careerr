import { Suspense } from 'react';
import ResultsContent from './ResultsContent';
import { Card } from '@/app/components/ui/Card';
import { Loader2 } from 'lucide-react';

function LoadingResults() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="text-center py-12">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
        <p className="text-gray-600">Loading your results...</p>
      </Card>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingResults />}>
      <ResultsContent />
    </Suspense>
  );
}
