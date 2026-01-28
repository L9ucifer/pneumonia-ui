'use client';

import React, { useCallback, useState } from 'react';

type AnalysisResult = {
  prediction: string;
  confidence: number;
  execution_time_ms: number;
};

type Props = {
  onResult: (result: AnalysisResult) => void;
};

export default function Dropzone({ onResult }: Props) {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File): Promise<AnalysisResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Upload failed');
    }

    return res.json();
  };

  const handleFile = async (file: File) => {
    try {
      setLoading(true);

      const result = await uploadFile(file);

      // Safety validation (prevents silent UI bugs)
      if (
        !result ||
        typeof result.prediction !== 'string' ||
        typeof result.confidence !== 'number' ||
        typeof result.execution_time_ms !== 'number'
      ) {
        throw new Error('Invalid response format from server');
      }

      onResult(result);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to analyze image. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setHover(false);

      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    []
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={onDrop}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition ${
        hover ? 'border-blue-600 bg-blue-50/40' : 'border-gray-300 bg-white'
      }`}
      onClick={() => {
        const input = document.getElementById('fileInput');
        input?.click();
      }}
    >
      <p className="text-lg mb-2 font-medium">
        {loading ? 'Analyzing image…' : 'Drag & drop a chest X-ray here'}
      </p>

      <p className="text-sm text-gray-500">
        JPG or PNG · Max 10 MB
      </p>

      <input
        id="fileInput"
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
