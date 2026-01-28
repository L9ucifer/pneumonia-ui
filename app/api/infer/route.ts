import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json(); // { s3_key }

  const response = await fetch(`${process.env.INFER_API_BASE}/infer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.INFER_API_KEY!,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: err }, { status: response.status });
  }

  return NextResponse.json(await response.json());
}
