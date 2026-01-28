'use client';

import { useState } from 'react';
import Dropzone from '@/components/Dropzone';
import ResultCard from '@/components/ResultCard';

export default function Page() {
  const [result, setResult] = useState<any>(null);

  return (
    <main className="max-w-xl mx-auto mt-16 px-4">
      <h1 className="text-2xl font-bold text-center mb-2">
        Pneumonia Assistant
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Upload an anonymised chest X-ray to run it through the research model.
      </p>

      <Dropzone onResult={setResult} />

      {result && (
        <div className="mt-6">
          <ResultCard result={result} />
        </div>
      )}

      <p className="text-xs text-center text-gray-500 mt-6">
        Research tool only — not for clinical use.
      </p>
    </main>
  );
}
