import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `${process.env.INFER_API_BASE}/predictions/${params.id}`,
    {
      headers: {
        'x-api-key': process.env.INFER_API_KEY!,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: response.status }
    );
  }

  return NextResponse.json(await response.json());
}
