type Props = {
  result: {
    prediction: string;
    confidence: number;
    execution_time_ms: number;
  };
};

export default function ResultCard({ result }: Props) {
  const confidencePercent = (result.confidence * 100).toFixed(1);

  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Prediction</h2>

      <p className="text-lg font-medium">
        {result.prediction}
      </p>

      <p className="text-gray-600">
        {confidencePercent}% confidence
      </p>

      <p className="mt-2 inline-block bg-gray-100 text-sm px-2 py-1 rounded">
        Latency: {result.execution_time_ms} ms
      </p>

      <p className="text-xs text-gray-500 mt-4">
        This is a research tool only and not a clinical decision system.
        Results must be confirmed by a qualified clinician.
      </p>
    </div>
  );
}
