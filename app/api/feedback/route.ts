import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log('FEEDBACK:', JSON.stringify(data));
  return NextResponse.json({ ok: true });
}
