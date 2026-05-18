'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Ratings = Record<number, number>;

function RatingRow({ id, ratings, setRatings }: {
  id: number;
  ratings: Ratings;
  setRatings: React.Dispatch<React.SetStateAction<Ratings>>;
}) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onClick={() => setRatings(prev => ({ ...prev, [id]: n }))}
          className={`w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 border-2 ${
            ratings[id] === n
              ? 'bg-primary border-primary text-white scale-110 shadow-md'
              : 'bg-white border-primary/30 text-text-muted hover:border-primary hover:text-primary'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export default function FeedbackModal() {
  const searchParams = useSearchParams();
  const [show, setShow]         = useState(false);
  const [slide, setSlide]       = useState(1);
  const [dir, setDir]           = useState<'right' | 'left'>('right');
  const [ratings, setRatings]   = useState<Ratings>({});
  const [openText, setOpenText] = useState('');
  const [name, setName]         = useState('');
  const [org, setOrg]           = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [animKey, setAnimKey]   = useState(0);

  useEffect(() => {
    if (searchParams.get('feedback') === '1') {
      setShow(true);
    }
  }, [searchParams]);

  if (!show) return null;

  const TOTAL = 6;
  const progress = ((slide - 1) / (TOTAL - 1)) * 100;

  function goTo(next: number) {
    setDir(next > slide ? 'right' : 'left');
    setSlide(next);
    setAnimKey(k => k + 1);
  }

  async function handleNext() {
    if (slide === 5) {
      setSubmitting(true);
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rating_enjoy:   ratings[2] ?? null,
            rating_clarity: ratings[3] ?? null,
            rating_tools:   ratings[4] ?? null,
            open_text:      openText,
            name:           name || null,
            org:            org || null,
            timestamp:      new Date().toISOString(),
          }),
        });
      } catch { /* silent */ }
      setSubmitting(false);
    }
    goTo(slide + 1);
  }

  const animClass = dir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 px-0 sm:px-4">
      <div className="bg-cream rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md shadow-2xl">

        {/* Progress */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex justify-between text-xs text-text-muted mb-2">
            <span>{slide} מתוך {TOTAL}</span>
          </div>
          <div className="w-full h-1.5 bg-primary/20 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 min-h-[200px] flex flex-col justify-center overflow-hidden">
          <div key={animKey} className={animClass}>

            {slide === 1 && (
              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-text-main mb-4">תודה שהייתם חלק מהסדנה!</h2>
                <p className="text-text-muted text-base leading-relaxed">אשמח אם תוכלו לענות על כמה שאלות קצרות.</p>
              </div>
            )}

            {slide === 2 && (
              <div className="text-center">
                <p className="font-bold text-text-main text-lg leading-snug">עד כמה נהניתם מהסדנה?</p>
                <RatingRow id={2} ratings={ratings} setRatings={setRatings} />
              </div>
            )}

            {slide === 3 && (
              <div className="text-center">
                <p className="font-bold text-text-main text-lg leading-snug">עד כמה הסדנה עזרה לכם לדייק את עצמכם?</p>
                <RatingRow id={3} ratings={ratings} setRatings={setRatings} />
              </div>
            )}

            {slide === 4 && (
              <div className="text-center">
                <p className="font-bold text-text-main text-lg leading-snug">עד כמה הרגשתם שקיבלתם כלים להמשך?</p>
                <RatingRow id={4} ratings={ratings} setRatings={setRatings} />
              </div>
            )}

            {slide === 5 && (
              <div>
                <p className="font-bold text-text-main text-lg leading-snug text-center mb-4">נשמח לשמוע כל מחשבה, תובנה או הצעה שעולה לכם</p>
                <textarea
                  rows={4}
                  placeholder="תשובה פתוחה"
                  value={openText}
                  onChange={e => setOpenText(e.target.value)}
                  className="w-full bg-white border-2 border-primary/30 focus:border-primary rounded-2xl px-4 py-3 text-sm focus:outline-none resize-none text-right leading-relaxed"
                />
                <details className="mt-3 group">
                  <summary className="text-sm text-text-muted cursor-pointer select-none list-none flex items-center gap-1">
                    <span className="transition-transform group-open:rotate-90 inline-block">▶</span>
                    רוצים להוסיף שם ומסגרת?
                  </summary>
                  <div className="mt-2 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="שם"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white border-2 border-primary/30 focus:border-primary rounded-2xl px-4 py-2 text-sm focus:outline-none text-right"
                    />
                    <input
                      type="text"
                      placeholder="מסגרת (חברה, ארגון, בית ספר...)"
                      value={org}
                      onChange={e => setOrg(e.target.value)}
                      className="w-full bg-white border-2 border-primary/30 focus:border-primary rounded-2xl px-4 py-2 text-sm focus:outline-none text-right"
                    />
                  </div>
                </details>
              </div>
            )}

            {slide === 6 && (
              <div className="text-center">
                <h2 className="text-2xl font-extrabold text-text-main mb-4">תודה רבה על המשוב!</h2>
                <p className="text-text-muted text-base leading-relaxed mb-8">אני מזמין אתכם לבנות את טביעת האצבע האישית שלכם!</p>
                <Link
                  href="/builder"
                  onClick={() => setShow(false)}
                  className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-base hover:opacity-90 transition-all inline-block"
                >
                  לבניית טביעת האצבע האישית שלי
                </Link>
                <button
                  onClick={() => setShow(false)}
                  className="block mx-auto mt-4 text-sm text-text-muted hover:text-text-main transition-colors"
                >
                  אולי אחר כך
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Navigation */}
        {slide < 6 && (
          <div className={`px-6 pb-8 flex gap-3 ${slide === 1 ? 'justify-end' : 'justify-between'}`}>
            {slide > 1 && (
              <button
                onClick={() => goTo(slide - 1)}
                className="flex-1 bg-white border-2 border-primary text-primary py-3 rounded-full font-semibold text-base hover:bg-primary/10 transition-all"
              >
                הקודם
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={submitting}
              className="flex-1 bg-primary text-white py-3 rounded-full font-semibold text-base hover:opacity-90 transition-all disabled:opacity-60"
            >
              {slide === 5 ? 'שלח!' : 'הבא'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
