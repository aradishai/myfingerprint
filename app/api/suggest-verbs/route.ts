import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const STARTER_VERBS = [
  'לתכנן', 'ליצור', 'להקשיב', 'לחנך', 'לפתח',
  'להוביל', 'לחקור', 'לעצב', 'לנתח', 'לחבר',
];

export async function POST(req: NextRequest) {
  const { liked = [], disliked = [], seen = [] } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    const fresh = STARTER_VERBS.filter(v => !seen.includes(v)).slice(0, 6);
    return NextResponse.json({ verbs: fresh });
  }

  const isFirst = liked.length === 0 && disliked.length === 0;

  const prompt = isFirst
    ? `אתה עוזר לאנשים לגלות את שמות הפועל שמגדירים אותם.
הצע 8 שמות פועל עבריים מגוונים בצורת שם פועל (לX) שמתארים תחביבים, כישורים ותשוקות.
דוגמאות לטון: לתכנן, ליצור, להנחות, לבנות, לנתח, לחבר, לחקור, לעצב.
החזר רק מערך JSON של 8 שמות פועל עבריים. ללא הסבר.`
    : `אתה עוזר לאנשים לגלות את שמות הפועל שמגדירים אותם.

שמות פועל שאהב: ${liked.join(', ') || 'אין עדיין'}
שמות פועל שלא דיברו אליו: ${disliked.join(', ') || 'אין עדיין'}
כבר הוצגו: ${seen.join(', ')}

הצע 6 שמות פועל עבריים חדשים (שלא מופיעים ברשימת "כבר הוצגו") שמתאימים לדפוס הדברים שאהב.
החזר רק מערך JSON של 6 שמות פועל עבריים. ללא הסבר.`;

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = (msg.content[0] as { text: string }).text.trim();
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('no json');
    const verbs: string[] = JSON.parse(match[0]);
    const fresh = verbs.filter(v => !seen.includes(v));
    return NextResponse.json({ verbs: fresh });
  } catch {
    const fallback = STARTER_VERBS.filter(v => !seen.includes(v)).slice(0, 6);
    return NextResponse.json({ verbs: fallback });
  }
}
