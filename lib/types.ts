export type PresignResponse = {
  url: string;
  fields: Record<string, string>;
  key?: string;
};

export type InferResponse = {
  id: string;
  label: 'Pneumonia' | 'Normal';
  prob: number; // 0..1
  latency_ms: number;
  model: string;
  heatmap_key?: string;
  heatmap_url?: string;
};

export type InferenceResult = {
  image: string;
  prediction: "NORMAL" | "PNEUMONIA";
  confidence: number;
  execution_time_ms: number;
};
