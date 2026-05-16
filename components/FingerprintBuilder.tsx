'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { regions } from './FingerprintInteractive';

const questions = [
  { id: 1, label: 'התחומים שלי',    prompt: 'מה הנושאים שאתה הכי אוהב, סקרן לגביהם או טוב בהם?' },
  { id: 2, label: 'שמות הפועל שלי', prompt: 'מה שמות הפועל שמתארים אותך? (לדוגמה: לפתח, להקשיב, ליצור...)' },
  { id: 3, label: 'המטרות שלי',     prompt: 'מה החלומות והמטרות שלך בחיים?' },
  { id: 4, label: 'מי צריך אותי',   prompt: 'מי הכי נהנה מהנוכחות שלך? לאיזה אנשים אתה נמשך לעזור?' },
  { id: 5, label: 'במה אני מאמין',  prompt: 'מהם הערכים שמובילים אותך?' },
  { id: 6, label: 'המומחיות שלי',   prompt: 'אם מישהו צריך עצה, על מה הם פונים אליך?' },
];

export default function FingerprintBuilder() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hovered, setHovered] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const active = questions.find(q => q.id === hovered);

  async function handleSave() {
    if (!printRef.current) return;
    setSaving(true);
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(printRef.current, {
      backgroundColor: '#FFFEF5',
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement('a');
    link.download = 'טביעת-האצבע-שלי.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setSaving(false);
    setShowModal(true);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* Questions panel */}
        <div className="flex-1 flex flex-col gap-6">
          {questions.map(q => (
            <div
              key={q.id}
              className={`rounded-2xl border-2 p-5 transition-all duration-200 cursor-default ${hovered === q.id ? 'border-primary bg-primary/5' : 'border-border bg-white'}`}
              onMouseEnter={() => setHovered(q.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <p className="font-bold text-primary text-base mb-1">{q.label}</p>
              <p className="text-text-muted text-sm mb-3">{q.prompt}</p>
              <textarea
                rows={2}
                placeholder="כתוב כאן..."
                value={answers[q.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                className="w-full bg-surface border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
          ))}
        </div>

        {/* Fingerprint + preview */}
        <div className="flex-1 flex flex-col items-center gap-6 sticky top-28">

          {/* Capturable area */}
          <div ref={printRef} className="bg-cream rounded-3xl p-8 w-full flex flex-col items-center gap-6">
            {/* Header */}
            <div className="flex items-center gap-3 w-full justify-center">
              <img src="/logo.svg" alt="לוגו" className="h-8 w-8" />
              <div className="text-center">
                <p className="font-extrabold text-primary text-lg leading-tight">חותם בעולם</p>
                <p className="text-xs text-text-muted">ערד ישי</p>
              </div>
            </div>

            <h2 className="font-extrabold text-2xl text-text-main">טביעת האצבע שלי</h2>

            {/* Diagram */}
            <div className="flex items-center gap-4 w-full">
              {/* Right labels */}
              <div className="flex flex-col gap-6 flex-1 items-end">
                {[1, 2, 3].map(id => {
                  const q = questions.find(q => q.id === id)!;
                  const answered = answers[id];
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-1 cursor-default"
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="text-right">
                        <p className={`font-bold text-sm leading-tight ${hovered === id ? 'text-primary' : 'text-text-main'}`}>{q.label}</p>
                        {answered && <p className="text-text-muted text-xs mt-0.5 max-w-[130px]">{answered}</p>}
                      </div>
                      <div className={`w-8 flex-shrink-0 h-px ${hovered === id ? 'bg-primary' : 'bg-primary/30'}`} />
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${hovered === id || answered ? 'bg-primary' : 'bg-primary/30'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Fingerprint SVG */}
              <svg viewBox="40 15 170 220" className="w-44 h-44 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                {regions.map(region =>
                  region.paths.map((d, i) => (
                    <path
                      key={`${region.id}-${i}`}
                      d={d}
                      fill={hovered === region.id || answers[region.id] ? '#52C47A' : '#1A1A1A'}
                      className="cursor-pointer transition-colors duration-300"
                      onMouseEnter={() => setHovered(region.id)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  ))
                )}
              </svg>

              {/* Left labels */}
              <div className="flex flex-col gap-6 flex-1 items-start">
                {[4, 5, 6].map(id => {
                  const q = questions.find(q => q.id === id)!;
                  const answered = answers[id];
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-1 cursor-default"
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${hovered === id || answered ? 'bg-primary' : 'bg-primary/30'}`} />
                      <div className={`w-8 flex-shrink-0 h-px ${hovered === id ? 'bg-primary' : 'bg-primary/30'}`} />
                      <div className="text-left">
                        <p className={`font-bold text-sm leading-tight ${hovered === id ? 'text-primary' : 'text-text-main'}`}>{q.label}</p>
                        {answered && <p className="text-text-muted text-xs mt-0.5 max-w-[130px]">{answered}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hint or active answer */}
            <div className="min-h-12 text-center">
              {active && answers[active.id] ? (
                <p className="text-text-main text-base font-medium">{answers[active.id]}</p>
              ) : active ? (
                <p className="text-text-muted text-sm italic">{active.prompt}</p>
              ) : (
                <p className="text-text-muted text-xs">ענה על השאלות משמאל כדי לבנות את הטביעה שלך</p>
              )}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all disabled:opacity-60 shadow-md"
          >
            {saving ? 'שומר...' : '📥 שמור את הטביעה שלך כתמונה'}
          </button>

          <Link href="/#contact" className="text-primary font-semibold text-sm underline underline-offset-4 hover:opacity-80">
            לתיאום פגישת היכרות עם ערד ←
          </Link>
        </div>
      </div>

      {/* Success modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6" onClick={() => setShowModal(false)}>
          <div className="bg-cream rounded-3xl p-10 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-extrabold text-primary mb-3">הטביעה שלך נשמרה!</h2>
            <p className="text-text-muted text-base leading-relaxed mb-8">
              עכשיו שאתה יודע מהי הטביעה שלך — הצעד הבא הוא לממש אותה. ערד יעזור לך לעשות בדיוק את זה.
            </p>
            <Link
              href="/#contact"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all inline-block"
              onClick={() => setShowModal(false)}
            >
              להמשך התהליך עם ערד — לחץ כאן
            </Link>
            <button
              onClick={() => setShowModal(false)}
              className="block mx-auto mt-4 text-text-muted text-sm underline"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  );
}
