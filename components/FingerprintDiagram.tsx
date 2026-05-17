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
    <div className="flex flex-col items-center gap-4">
      <FingerprintInteractive hovered={displayRegion} onHover={setHoveredRegion} />
      <div className="min-h-20 text-center px-4">
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
