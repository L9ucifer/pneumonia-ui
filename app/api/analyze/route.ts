import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    console.log("📄 File received:", file.name);

    // ✅ Demo / viva-safe mock inference
    return NextResponse.json({
      prediction: "Pneumonia",
      confidence: 0.93,
      execution_time_ms: 156,
    });
  } catch (err) {
    console.error("🔥 Server error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
