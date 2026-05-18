'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

type FeedbackItem = {
  id: number;
  name?: string;
  org?: string;
  open_text?: string;
  rating_enjoy?: number;
  rating_clarity?: number;
  rating_tools?: number;
  timestamp: string;
};

function FeedbackPage() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'hotam2026';

  const [items, setItems]     = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/feedback')
      .then(r => r.json())
      .then((data: FeedbackItem[]) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function deleteFeedback(id: number) {
    if (!confirm('למחוק את המשוב הזה?')) return;
    await fetch('/api/feedback', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, secret: 'hotam2026' }),
    });
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const avg = (key: keyof FeedbackItem) => {
    const vals = items.map(i => i[key] as number).filter(Boolean);
    if (!vals.length) return null;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-text-main mb-2 text-center">{'משובי הסדנה'}</h1>

        {loading && <p className="text-center text-text-muted mt-12">{'טוען...'}</p>}
        {!loading && items.length === 0 && <p className="text-center text-text-muted mt-12">{'אין משובים עדיין.'}</p>}

        {!loading && items.length > 0 && (
          <>
            <div className="flex justify-center gap-6 mt-6 mb-10 flex-wrap">
              {avg('rating_enjoy') && <div className="text-center"><p className="text-2xl font-extrabold text-primary">{avg('rating_enjoy')}</p><p className="text-xs text-text-muted">{'הנאה'}</p></div>}
              {avg('rating_clarity') && <div className="text-center"><p className="text-2xl font-extrabold text-primary">{avg('rating_clarity')}</p><p className="text-xs text-text-muted">{'דיוק עצמי'}</p></div>}
              {avg('rating_tools') && <div className="text-center"><p className="text-2xl font-extrabold text-primary">{avg('rating_tools')}</p><p className="text-xs text-text-muted">{'כלים להמשך'}</p></div>}
              <div className="text-center"><p className="text-2xl font-extrabold text-primary">{items.length}</p><p className="text-xs text-text-muted">{'משיבים'}</p></div>
            </div>

            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-cream rounded-2xl p-6 shadow-sm border border-border relative">
                  {isAdmin && (
                    <button
                      onClick={() => deleteFeedback(item.id)}
                      className="absolute top-3 left-3 text-red-400 hover:text-red-600 text-xs font-bold transition-colors"
                    >
                      {'מחק'}
                    </button>
                  )}
                  {item.open_text && (
                    <p className="text-text-main font-bold text-base leading-relaxed mb-3">
                      {'”'}{item.open_text}{'“'}
                    </p>
                  )}
                  {(item.name || item.org) && (
                    <p className="text-primary font-bold text-sm mb-2">
                      {item.name}{item.name && item.org ? ' · ' : ''}{item.org}
                    </p>
                  )}
                  <div className="flex flex-col gap-0.5 text-text-muted text-xs">
                    {item.rating_enjoy && <span>{'נהניתי מהסדנה'}: <strong>{item.rating_enjoy}/5</strong></span>}
                    {item.rating_clarity && <span>{'הסדנה עזרה לי לדייק'}: <strong>{item.rating_clarity}/5</strong></span>}
                    {item.rating_tools && <span>{'קיבלתי כלים להמשך'}: <strong>{item.rating_tools}/5</strong></span>}
                    <span className="mt-1">{new Date(item.timestamp).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={null}><FeedbackPage /></Suspense>;
}
