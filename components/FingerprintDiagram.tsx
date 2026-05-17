'use client';
import { useState, useEffect, useRef } from 'react';
import FingerprintInteractive from './FingerprintInteractive';

const items = [
  { id: 1, label: 'התחומים שלי',    answer: 'לוגותרפיה, ייחודיות, מוטיבציה, מדעי ההתנהגות, הרגלים, כדורסל' },
  { id: 2, label: 'שמות הפועל שלי', answer: 'לפתח, להקשיב, לגלות, לשחק, להרצות, ליזום' },
  { id: 3, label: 'המטרות שלי',     answer: 'לעזור לכמה שיותר אנשים לגלות את טביעת האצבע שלהם ולהקים מוסד שעוזר לאנשים לחבר בין הייחודיות שלהם לשינוי שהם רוצים לעשות בעולם' },
  { id: 4, label: 'מי צריך אותי',   answer: 'אנשים שרוצים לצאת לאור, אנשים שרוצים חיים מלאי משמעות' },
  { id: 5, label: 'במה אני מאמין',  answer: 'הקשבה, אותנטיות, יוזמה, עצמאות, אחריות' },
  { id: 6, label: 'המומחיות שלי',   answer: 'לעזור לאנשים להבין את הלמה שלהם, מי הם, מה הם רוצים ולהיות עצמם' },
];

const rightIds = [1, 2, 3];
const leftIds  = [4, 5, 6];

function LabelRow({ label, active, side, onEnter, onLeave }: {
  label: string; active: boolean;
  side: 'right' | 'left'; onEnter: () => void; onLeave: () => void;
}) {
  const dot  = <div className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full flex-shrink-0 transition-all duration-200 ${active ? 'bg-primary scale-125' : 'bg-primary/30'}`} />;
  const line = <div className={`w-8 lg:w-16 flex-shrink-0 h-0.5 transition-all duration-200 ${active ? 'bg-primary' : 'bg-primary/30'}`} />;
  const text = (
    <p className={`min-w-0 font-bold text-sm lg:text-xl leading-tight transition-colors duration-200 ${active ? 'text-primary' : 'text-text-main'}`}>
      {label}
    </p>
  );

  return (
    <div
      className={`flex items-center gap-1 w-full cursor-default ${side === 'right' ? 'justify-end' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {side === 'right' ? <>{text}{line}{dot}</> : <>{dot}{line}{text}</>}
    </div>
  );
}

export default function FingerprintDiagram() {
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
  const [autoRegion, setAutoRegion]       = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const pick = (prev: number | null) => {
      let next: number;
      do { next = Math.floor(Math.random() * 6) + 1; } while (next === prev);
      return next;
    };
    setAutoRegion(pick(null));
    intervalRef.current = setInterval(() => setAutoRegion(prev => pick(prev)), 8000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const displayRegion = hoveredRegion ?? autoRegion;
  const active = items.find(i => i.id === displayRegion);

  return (
    <div>
      {/* Mobile: fingerprint centered + cycling answer */}
      <div className="md:hidden flex flex-col items-center gap-4">
        <FingerprintInteractive hovered={displayRegion} onHover={setHoveredRegion} />
        <div className="min-h-20 text-center px-2 w-full">
          {active && (
            <div key={displayRegion} className="animate-fade-in">
              <p className="text-primary font-bold text-base mb-1">{active.label}</p>
              <p className="text-text-main text-sm leading-relaxed">{active.answer}</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop: anatomy with side labels */}
      <div className="hidden md:grid w-full items-center gap-6" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <div className="flex flex-col gap-12 items-start">
          {rightIds.map(id => {
            const item = items.find(i => i.id === id)!;
            return (
              <LabelRow key={id} {...item} active={displayRegion === id} side="right"
                onEnter={() => setHoveredRegion(id)} onLeave={() => setHoveredRegion(null)} />
            );
          })}
        </div>
        <div className="flex-shrink-0">
          <FingerprintInteractive hovered={displayRegion} onHover={setHoveredRegion} />
        </div>
        <div className="flex flex-col gap-12 items-start">
          {leftIds.map(id => {
            const item = items.find(i => i.id === id)!;
            return (
              <LabelRow key={id} {...item} active={displayRegion === id} side="left"
                onEnter={() => setHoveredRegion(id)} onLeave={() => setHoveredRegion(null)} />
            );
          })}
        </div>
      </div>

      {/* Desktop answer */}
      <div className="hidden md:block mt-8 text-center min-h-16 px-4">
        {active && (
          <div key={displayRegion} className="animate-fade-in">
            <p className="text-primary font-bold text-lg mb-1">{active.label}</p>
            <p className="text-text-main text-base leading-relaxed">{active.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
