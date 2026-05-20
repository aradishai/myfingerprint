'use client';
import { useState, useEffect } from 'react';
import SmartContactLink from './SmartContactLink';

const MAX_LOCKED = 5;

export default function VerbDiscovery() {
  const [currentVerbs, setCurrentVerbs] = useState<string[]>([]);
  const [ratings, setRatings] = useState<Record<string, 'liked' | 'disliked'>>({});
  const [locked, setLocked] = useState<string[]>([]);
  const [seen, setSeen] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const allLiked = Object.entries(ratings).filter(([, v]) => v === 'liked').map(([k]) => k);
  const allDisliked = Object.entries(ratings).filter(([, v]) => v === 'disliked').map(([k]) => k);
  const batchRated = currentVerbs.length > 0 && currentVerbs.every(v => v in ratings || locked.includes(v));

  async function fetchVerbs(likedSoFar: string[], dislikedSoFar: string[], seenSoFar: string[]) {
    setLoading(true);
    try {
      const res = await fetch('/api/suggest-verbs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: likedSoFar, disliked: dislikedSoFar, seen: seenSoFar }),
      });
      const data = await res.json();
      const verbs: string[] = data.verbs || [];
      setCurrentVerbs(verbs);
      setSeen(prev => [...prev, ...verbs]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVerbs([], [], []);
  }, []);

  function rate(verb: string, rating: 'liked' | 'disliked') {
    setRatings(prev => ({ ...prev, [verb]: rating }));
  }

  function toggleLock(verb: string) {
    if (locked.includes(verb)) {
      setLocked(prev => prev.filter(v => v !== verb));
    } else if (locked.length < MAX_LOCKED) {
      setLocked(prev => {
        const next = [...prev, verb];
        if (next.length === MAX_LOCKED) setDone(true);
        return next;
      });
    }
  }

  async function nextBatch() {
    await fetchVerbs(allLiked, allDisliked, seen);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-6">
        <div className="text-4xl">🌿</div>
        <h3 className="text-2xl font-extrabold text-text-main">שמות הפועל שלך!</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {locked.map(v => (
            <span key={v} className="bg-primary text-white px-5 py-2 rounded-full text-base font-bold shadow">{v}</span>
          ))}
        </div>
        <p className="text-text-muted text-sm max-w-sm">אלה הפעלים שמגדירים אותך. תוכל להוסיף אותם לטביעת האצבע שלך בטאב "טביעת האצבע".</p>
        <SmartContactLink
          waText="היי ערד, גיליתי את שמות הפועל שלי ואשמח לשוחח"
          className="bg-primary text-white px-8 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all"
        >
          לשיחה עם ערד על הממצאים
        </SmartContactLink>
        <button onClick={() => { setDone(false); setLocked([]); setRatings({}); setSeen([]); fetchVerbs([], [], []); }} className="text-text-muted text-sm underline">
          התחל מחדש
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-main mb-1">מה הם שמות הפועל שלך?</h2>
        <p className="text-text-muted text-sm">סמן כל פועל — מה מדבר אליך ומה לא. נעל את {MAX_LOCKED} שמות הפועל שמגדירים אותך.</p>
      </div>

      {/* Locked slots */}
      <div className="flex flex-wrap gap-2 justify-center min-h-10">
        {Array.from({ length: MAX_LOCKED }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-full border-2 text-sm font-bold transition-all duration-200 ${
              locked[i]
                ? 'bg-primary text-white border-primary cursor-pointer hover:opacity-80'
                : 'border-dashed border-primary/30 text-primary/30'
            }`}
            onClick={() => locked[i] && toggleLock(locked[i])}
          >
            {locked[i] ? <><span>🔒</span> {locked[i]}</> : `פועל ${i + 1}`}
          </div>
        ))}
      </div>

      {/* Verb cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-primary/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {currentVerbs.map(verb => {
            const r = ratings[verb];
            const isLocked = locked.includes(verb);
            return (
              <div
                key={verb}
                className={`rounded-2xl border-2 p-3 flex flex-col items-center gap-2 transition-all duration-200 ${
                  isLocked
                    ? 'border-primary bg-primary/10'
                    : r === 'liked'
                    ? 'border-primary/50 bg-primary/5'
                    : r === 'disliked'
                    ? 'border-gray-200 bg-gray-50 opacity-50'
                    : 'border-border bg-white'
                }`}
              >
                <p className="font-bold text-text-main text-base text-center leading-snug">{verb}</p>
                {isLocked ? (
                  <button onClick={() => toggleLock(verb)} className="text-xs text-primary underline">
                    שחרר
                  </button>
                ) : (
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => { rate(verb, 'liked'); }}
                      className={`flex-1 py-1 rounded-full text-xs font-semibold transition-all ${r === 'liked' ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                    >
                      זה אני ✓
                    </button>
                    <button
                      onClick={() => rate(verb, 'disliked')}
                      className={`flex-1 py-1 rounded-full text-xs font-semibold transition-all ${r === 'disliked' ? 'bg-gray-300 text-gray-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      לא ✕
                    </button>
                  </div>
                )}
                {r === 'liked' && !isLocked && locked.length < MAX_LOCKED && (
                  <button onClick={() => toggleLock(verb)} className="text-xs text-primary font-semibold underline">
                    נעל 🔒
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {batchRated && !loading && (
        <div className="flex justify-center">
          <button
            onClick={nextBatch}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all shadow-md"
          >
            שמות פועל נוספים →
          </button>
        </div>
      )}
    </div>
  );
}
