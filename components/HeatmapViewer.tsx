type Props = {
  heatmapUrl?: string;
};

export default function HeatmapViewer({ heatmapUrl }: Props) {
  if (!heatmapUrl) return null;

  return (
    <section className="space-y-2">
      <h3 className="text-lg font-semibold">
        Model attention (Grad-CAM)
      </h3>
      <div className="bg-black rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={heatmapUrl}
          alt="Model attention heatmap"
          className="max-h-[480px] w-full object-contain"
        />
      </div>
      <p className="text-xs text-gray-500">
        Highlighted regions show areas the model focused on when making
        its decision. For research illustration only.
      </p>
    </section>
  );
}
