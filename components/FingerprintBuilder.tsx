'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { regions } from './FingerprintInteractive';

const questions = [
  { id: 1, label: 'התחומים שלי',    prompt: 'מה הנושאים שאתה הכי אוהב, סקרן לגביהם או טוב בהם?' },
  { id: 2, label: 'שמות הפועל שלי', prompt: 'מה הם 5 שמות הפועל שאתה הכי אוהב וטוב בהם? (לדוגמה: לתכנן, לפתח, להקשיב...)' },
  { id: 3, label: 'המטרות שלי',     prompt: 'מה החלומות והמטרות שלך בחיים?' },
  { id: 4, label: 'מי צריך אותי',   prompt: 'לאיזה אוכלוסיה אתה הכי רוצה לעזור? איזה סוג של אנשים צריכים אותך?' },
  { id: 5, label: 'במה אני מאמין',  prompt: 'מהם הערכים שמובילים אותך?' },
  { id: 6, label: 'המומחיות שלי',   prompt: 'אם מישהו רוצה להתייעץ איתך לגבי משהו, מה זה יהיה?' },
];

const rightIds = [1, 2, 3];
const leftIds  = [4, 5, 6];

export default function FingerprintBuilder() {
  const [answers, setAnswers]   = useState<Record<number, string>>({});
  const [name, setName]         = useState('');
  const [hovered, setHovered]   = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving]     = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const activeId = selected ?? hovered;
  const activeQ  = questions.find(q => q.id === activeId);

  function handleSelect(id: number) {
    setSelected(prev => prev === id ? null : id);
  }

  async function handleSave() {
    if (!printRef.current) return;
    setSaving(true);
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(printRef.current, {
      backgroundColor: '#FFFEF5',
      scale: 2,
      useCORS: true,
    });

    // Add watermark to top-right corner
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const pad = 24;
      ctx.font = 'bold 28px Arial';
      ctx.fillStyle = 'rgba(82, 196, 122, 0.55)';
      ctx.textAlign = 'right';
      ctx.direction = 'rtl';
      ctx.fillText('חותם בעולם | ערד ישי', canvas.width - pad, pad + 20);
    }

    const link = document.createElement('a');
    link.download = 'טביעת-האצבע-שלי.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setSaving(false);
    setShowModal(true);
  }

  function LabelRow({ id, side }: { id: number; side: 'right' | 'left' }) {
    const q       = questions.find(q => q.id === id)!;
    const isActive = hovered === id || selected === id;
    const answered = !!answers[id];

    const dot  = <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-[7px] transition-all duration-200 ${isActive || answered ? 'bg-primary' : 'bg-primary/30'}`} />;
    const line = <div className={`w-10 flex-shrink-0 h-px mt-[13px] transition-all duration-200 ${isActive ? 'bg-primary' : 'bg-primary/30'}`} />;
    const text = (
      <div className={`cursor-pointer select-none transition-colors duration-200 ${side === 'right' ? 'text-right' : 'text-left'}`}>
        <p className={`font-bold text-lg leading-tight ${isActive ? 'text-primary' : answered ? 'text-text-main' : 'text-text-muted'}`}>
          {q.label}
        </p>
        {answers[id] && (
          <p className="text-text-muted text-xs leading-snug mt-0.5 max-w-[160px] whitespace-pre-line">{answers[id]}</p>
        )}
      </div>
    );

    return (
      <div
        className="flex items-start gap-1"
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleSelect(id)}
      >
        {side === 'right' ? <>{text}{line}{dot}</> : <>{dot}{line}{text}</>}
      </div>
    );
  }

  return (
    <>
      <div ref={printRef} className="bg-cream rounded-3xl p-8">
        <div className="flex items-baseline justify-center gap-2 mb-10">
          <h2 className="text-2xl font-extrabold text-text-main">טביעת האצבע של</h2>
          <input
            type="text"
            placeholder="שמך"
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-2xl font-extrabold text-primary bg-transparent border-b-2 border-primary focus:outline-none w-32 text-center"
          />
        </div>

        {/* Diagram */}
        <div className="flex items-center gap-4">
          {/* Right labels */}
          <div className="flex flex-col gap-10 flex-1 items-start">
            {rightIds.map(id => <LabelRow key={id} id={id} side="right" />)}
          </div>

          {/* Fingerprint */}
          <div className="flex-shrink-0">
            <svg viewBox="40 15 170 220" className="w-52 h-52 md:w-64 md:h-64" xmlns="http://www.w3.org/2000/svg">
              {regions.map(region =>
                region.paths.map((d, i) => (
                  <path
                    key={`${region.id}-${i}`}
                    d={d}
                    fill={hovered === region.id || selected === region.id || answers[region.id] ? '#52C47A' : '#1A1A1A'}
                    className="cursor-pointer transition-colors duration-300"
                    onMouseEnter={() => setHovered(region.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleSelect(region.id)}
                  />
                ))
              )}
            </svg>
          </div>

          {/* Left labels */}
          <div className="flex flex-col gap-10 flex-1 items-start">
            {leftIds.map(id => <LabelRow key={id} id={id} side="left" />)}
          </div>
        </div>

        {/* Reveal / input area */}
        <div className="mt-8 min-h-36 flex flex-col items-center justify-start text-center">
          {activeQ ? (
            <div className="w-full max-w-lg">
              <p className="font-bold text-primary text-lg mb-1">{activeQ.label}</p>
              <p className="text-text-muted text-sm mb-3">{activeQ.prompt}</p>
              <textarea
                rows={3}
                placeholder="כתוב כאן..."
                value={answers[activeQ.id] || ''}
                onChange={e => setAnswers(prev => ({ ...prev, [activeQ.id]: e.target.value }))}
                onFocus={() => setSelected(activeQ.id)}
                onBlur={() => setSelected(null)}
                className="w-full bg-white border-2 border-primary rounded-xl px-4 py-3 text-sm focus:outline-none resize-none text-right"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-10 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all disabled:opacity-60 shadow-md"
        >
          {saving ? 'מוריד...' : 'הורד את טביעת האצבע שלך לטלפון/למחשב ⬇'}
        </button>
        <Link href="/#contact" className="text-primary font-semibold text-sm underline underline-offset-4 hover:opacity-80">
          לתיאום פגישת היכרות עם ערד
        </Link>
      </div>

      {/* Modal */}
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
            <button onClick={() => setShowModal(false)} className="block mx-auto mt-4 text-text-muted text-sm underline">
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  );
}
