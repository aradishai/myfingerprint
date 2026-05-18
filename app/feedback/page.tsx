'use client';
import { useEffect, useState, useRef } from 'react';

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

function StarRow({ label, value }: { label: string; value?: number }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-text-muted">{label}:</span>
      <span className="font-bold text-primary">{value}/5</span>
    </div>
  );
}

export default function FeedbackPage() {
  const [items, setItems]   = useState<FeedbackItem[]>([]);
  const [index, setIndex]   = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/feedback')
      .then(r => r.json())
      .then((data: FeedbackItem[]) => {
        const withText = data.filter(d => d.open_text?.trim());
        setItems(withText.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % items.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items]);

  function go(next: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIndex((next + items.length) % items.length);
  }

  const avg = (key: keyof FeedbackItem) => {
    const vals = items.map(i => i[key] as number).filter(Boolean);
    if (!vals.length) return null;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-extrabold text-text-main mb-2 text-center">משובי הסדנה</h1>

        {loading && <p className="text-center text-text-muted mt-12">טוען...</p>}

        {!loading && items.length === 0 && (
          <p className="text-center text-text-muted mt-12">אין משובים עדיין.</p>
        )}

        {!loading && items.length > 0 && (
          <>
            {/* Averages */}
            <div className="flex justify-center gap-6 mt-6 mb-10 flex-wrap">
              {avg('rating_enjoy') && (
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">{avg('rating_enjoy')}</p>
                  <p className="text-xs text-text-muted">הנאה</p>
                </div>
              )}
              {avg('rating_clarity') && (
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">{avg('rating_clarity')}</p>
                  <p className="text-xs text-text-muted">דיוק עצמי</p>
                </div>
              )}
              {avg('rating_tools') && (
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">{avg('rating_tools')}</p>
                  <p className="text-xs text-text-muted">כלים להמשך</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-2xl font-extrabold text-primary">{items.length}</p>
                <p className="text-xs text-text-muted">משיבים</p>
              </div>
            </div>

            {/* Carousel */}
            <div className="relative bg-cream rounded-3xl shadow-lg p-8 min-h-[200px] flex flex-col justify-between">
              <div key={index} className="animate-fade-in">
                <p className="text-text-main text-lg leading-relaxed mb-6">
                  &ldquo;{items[index].open_text}&rdquo;
                </p>
                <div className="flex flex-col gap-1">
                  {(items[index].name || items[index].org) && (
                    <p className="font-bold text-text-main text-sm">
                      {items[index].name}{items[index].name && items[index].org ? ' · ' : ''}{items[index].org}
                    </p>
                  )}
                  <StarRow label="הנאה"       value={items[index].rating_enjoy} />
                  <StarRow label="דיוק עצמי"  value={items[index].rating_clarity} />
                  <StarRow label="כלים"       value={items[index].rating_tools} />
                </div>
              </div>

              {/* Nav dots */}
              {items.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-primary w-4' : 'bg-primary/30'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Prev / Next */}
            {items.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => go(index - 1)} className="text-primary font-bold px-4 py-2 rounded-full border-2 border-primary/30 hover:border-primary transition-all">
                  הקודם
                </button>
                <button onClick={() => go(index + 1)} className="text-primary font-bold px-4 py-2 rounded-full border-2 border-primary/30 hover:border-primary transition-all">
                  הבא
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
