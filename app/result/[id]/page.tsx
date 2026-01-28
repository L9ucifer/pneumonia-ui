'use client';

import { useState } from 'react';
import Dropzone from '@/components/Dropzone';
import ResultCard from '@/components/ResultCard';

type InferenceResult = {
  prediction: string;
  confidence: number;
  execution_time_ms: number;
};

export default function HomePage() {
  const [result, setResult] = useState<InferenceResult | null>(null);

  return (
    <main className="max-w-xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">
        Pneumonia Assistant
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Upload an anonymised chest X-ray to run it through the research model.
      </p>

      <Dropzone
        onResult={(data) => {
          setResult(data);
        }}
      />

      {result && (
        <div className="mt-8">
          <ResultCard result={result} />
        </div>
      )}

      <p className="text-center text-xs text-gray-500 mt-6">
        Research tool only — not for clinical use.
      </p>
    </main>
  );
}
