'use client';
import { useState, useEffect, useRef } from 'react';
import FingerprintInteractive from './FingerprintInteractive';

const rightItems = [
  { id: 6, title: 'המומחיות שלי', answer: '1. לעזור לאנשים להבין את הלמה שלהם\n2. לעזור לאנשים להבין מי הם\n3. לעזור לאנשים להבין מה הם רוצים\n4. לעזור לאנשים להיות עצמם' },
  { id: 3, title: 'המטרות שלי', answer: '1. לעזור לכמה שיותר אנשים לגלות את טביעת האצבע שלהם\n2. להקים מוסד שעוזר לאנשים לחבר בין הייחודיות שלהם לשינוי שהם רוצים לעשות בעולם\n3. להרצות במכינות, קורסים פיקודיים בצבא וחברות שרוצות לבנות את הזהות שלהן' },
  { id: 4, title: 'מי צריך אותי', answer: 'אנשים שרוצים לצאת לאור, אנשים שרוצים חיים מלאי משמעות' },
];

const leftItems = [
  { id: 5, title: 'במה אני מאמין', answer: 'הקשבה, אותנטיות, יוזמה, עצמאות, אחריות' },
  { id: 1, title: 'התחומים שלי', answer: 'לוגותרפיה, ייחודיות, מוטיבציה, מדעי ההתנהגות, הרגלים, כדורסל' },
  { id: 2, title: 'שמות הפועל שלי', answer: 'לפתח, להקשיב, לגלות, לשחק, להרצות, ליזום' },
];

const allItems = [...rightItems, ...leftItems];

function LabelRow({ id, title, active, side, onEnter, onLeave }: {
  id: number; title: string; active: boolean;
  side: 'right' | 'left'; onEnter: () => void; onLeave: () => void;
}) {
  const line = <div className={`w-10 flex-shrink-0 h-px transition-all duration-200 ${active ? 'bg-primary' : 'bg-primary/30'}`} />;
  const dot = <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-200 ${active ? 'bg-primary scale-125' : 'bg-primary/40'}`} />;
  const text = <p className={`font-bold text-lg transition-colors duration-200 whitespace-nowrap ${active ? 'text-primary' : 'text-text-main'}`}>{title}</p>;

  return (
    <div className="flex items-center gap-1 cursor-default" onMouseEnter={onEnter} onMouseLeave={onLeave}>
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
  const active = allItems.find(i => i.id === displayRegion);

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex flex-col gap-10 flex-1 items-end">
          {rightItems.map(item => (
            <LabelRow key={item.id} {...item} active={displayRegion === item.id} side="right"
              onEnter={() => setHoveredRegion(item.id)} onLeave={() => setHoveredRegion(null)} />
          ))}
        </div>

        <div className="flex-shrink-0">
          <FingerprintInteractive hovered={displayRegion} onHover={setHoveredRegion} />
        </div>

        <div className="flex flex-col gap-10 flex-1 items-start">
          {leftItems.map(item => (
            <LabelRow key={item.id} {...item} active={displayRegion === item.id} side="left"
              onEnter={() => setHoveredRegion(item.id)} onLeave={() => setHoveredRegion(null)} />
          ))}
        </div>
      </div>

      {/* Reveal area */}
      <div className="mt-8 text-center min-h-28 flex flex-col items-center justify-center">
        {active && (
          <div key={displayRegion} className="animate-fade-in">
            <p className="font-bold text-primary text-xl mb-2">{active.title}</p>
            <p className="text-text-main text-lg leading-relaxed whitespace-pre-line">{active.answer}</p>
          </div>
        )}
      </div>

      {/* Mobile — list */}
      <div className="md:hidden flex flex-col items-center gap-8">
        <FingerprintInteractive hovered={displayRegion} onHover={setHoveredRegion} />
        <div className="flex flex-col gap-5 w-full">
          {allItems.map(item => (
            <div key={item.id} className="border-r-2 border-primary/50 pr-4">
              <p className="font-bold text-primary text-base">{item.title}</p>
              <p className="text-text-muted text-sm leading-snug mt-0.5 whitespace-pre-line">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
