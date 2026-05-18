import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'feedback.json');

async function readAll(): Promise<object[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(raw);
  } catch { return []; }
}

export async function GET() {
  const items = await readAll();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log('FEEDBACK:', JSON.stringify(data));
  const items = await readAll();
  items.push({ ...data, id: Date.now() });
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(items, null, 2));
  return NextResponse.json({ ok: true });
}
