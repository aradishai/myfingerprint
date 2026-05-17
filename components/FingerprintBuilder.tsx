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
  const [hovered, setHovered]   = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const activeId = selected ?? hovered;
  const activeQ  = questions.find(q => q.id === activeId);

  function handleSelect(id: number) {
    setSelected(prev => prev === id ? null : id);
  }

  async function handleSave() {
    if (!printRef.current) return;
    setSaving(true);
    setSelected(null);
    setHovered(null);
    setShowWatermark(true);
    await new Promise(resolve => setTimeout(resolve, 100));

    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(printRef.current, {
      backgroundColor: '#FFFEF5',
      scale: 2,
      useCORS: true,
    });

    setShowWatermark(false);

    const link = document.createElement('a');
    link.download = 'טביעת-האצבע-שלי.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    setSaving(false);
    setShowModal(true);
  }

  function LabelRow({ id, side }: { id: number; side: 'right' | 'left' }) {
    const q       = questions.find(q => q.id === id)!;
    const isActive = selected !== null ? selected === id : hovered === id;
    const answered = !!answers[id];

    const dot  = <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0 transition-all duration-200 ${isActive || answered ? 'bg-primary' : 'bg-primary/30'}`} />;
    const line = <div className={`w-6 md:w-16 flex-shrink-0 h-0.5 transition-all duration-200 ${isActive ? 'bg-primary' : 'bg-primary/30'}`} />;
    const text = (
      <div className={`cursor-pointer select-none transition-colors duration-200 ${side === 'right' ? 'text-right' : 'text-left'}`}>
        <p className={`font-bold text-sm md:text-xl leading-tight ${isActive ? 'text-primary' : answered ? 'text-text-main' : 'text-text-muted'}`}>
          {q.label}
        </p>
        {answers[id] && (
          <p className="text-text-muted text-xs md:text-sm leading-snug mt-0.5 max-w-[90px] md:max-w-[180px] whitespace-pre-line">{answers[id]}</p>
        )}
      </div>
    );

    return (
      <div
        className={`flex items-center gap-1 w-full ${side === 'right' ? 'justify-end' : ''}`}
        onMouseEnter={() => { if (selected === null) setHovered(id); }}
        onMouseLeave={() => { if (selected === null) setHovered(null); }}
        onClick={() => handleSelect(id)}
      >
        {side === 'right' ? <>{text}{line}{dot}</> : <>{dot}{line}{text}</>}
      </div>
    );
  }

  return (
    <>
      <div ref={printRef} className="relative bg-cream rounded-3xl p-3 md:p-8">
        <div className="flex items-baseline justify-center gap-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">טביעת האצבע שלי</h2>
        </div>

        {/* Diagram */}
        <div className="w-full grid items-center gap-2 md:gap-6" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          <div className="flex flex-col gap-6 md:gap-12 items-start">
            {rightIds.map(id => <LabelRow key={id} id={id} side="right" />)}
          </div>
          <div className="flex-shrink-0">
            <svg viewBox="40 15 170 220" className="w-28 h-28 sm:w-44 sm:h-44 md:w-64 md:h-64 lg:w-80 lg:h-80" xmlns="http://www.w3.org/2000/svg">
              {regions.map(region =>
                region.paths.map((d, i) => (
                  <path
                    key={`${region.id}-${i}`}
                    d={d}
                    fill={hovered === region.id || selected === region.id || answers[region.id] ? '#52C47A' : '#1A1A1A'}
                    className="cursor-pointer transition-colors duration-300"
                    onMouseEnter={() => { if (selected === null) setHovered(region.id); }}
                    onMouseLeave={() => { if (selected === null) setHovered(null); }}
                    onClick={() => handleSelect(region.id)}
                  />
                ))
              )}
            </svg>
          </div>
          <div className="flex flex-col gap-6 md:gap-12 items-start">
            {leftIds.map(id => <LabelRow key={id} id={id} side="left" />)}
          </div>
        </div>

        {/* Reveal / input area */}
        <div className="mt-8 flex flex-col items-center justify-start text-center">
          {showWatermark ? (
            <div className="py-4">
              <p className="font-bold text-primary text-base">ערד ישי | חותם בעולם</p>
            </div>
          ) : activeQ ? (
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
        <a href="https://wa.me/972542086591?text=היי ערד, אשמח לתאם פגישת היכרות" className="text-primary font-semibold text-sm underline underline-offset-4 hover:opacity-80">
          לתיאום פגישת היכרות עם ערד
        </a>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6" onClick={() => setShowModal(false)}>
          <div className="bg-cream rounded-3xl p-10 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-extrabold text-text-main mb-3">טביעת האצבע שלך נשמרה!</h2>
            <a
              href="https://wa.me/972542086591?text=היי ערד, סיימתי למלא את טביעת האצבע שלי ואשמח להמשיך את התהליך"
              className="bg-primary text-white px-8 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all inline-block"
              onClick={() => setShowModal(false)}
            >
              להמשך התהליך לחץ כאן
            </a>
            <button onClick={() => setShowModal(false)} className="block mx-auto mt-4 text-text-muted text-sm underline">
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  );
}
