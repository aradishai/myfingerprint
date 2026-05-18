import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { error } = await supabase.from('feedback').insert({
    rating_enjoy:   body.rating_enjoy   ?? null,
    rating_clarity: body.rating_clarity ?? null,
    rating_tools:   body.rating_tools   ?? null,
    open_text:      body.open_text      ?? null,
    name:           body.name           ?? null,
    org:            body.org            ?? null,
  });

  if (error) console.error('FEEDBACK ERROR:', error);
  return NextResponse.json({ ok: !error });
}

export async function DELETE(req: NextRequest) {
  const { id, secret } = await req.json();
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { error } = await supabase.from('feedback').delete().eq('id', id);
  if (error) return NextResponse.json({ ok: false }, { status: 500 });
  return NextResponse.json({ ok: true });
}
