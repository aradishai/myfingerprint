'use client';
import { useState } from 'react';
import FingerprintInteractive from './FingerprintInteractive';

const rightItems = [
  { id: 6, title: 'במה אני מומחה', answer: '1. לעזור לאנשים להבין את הלמה שלהם\n2. לעזור לאנשים להבין מי הם\n3. לעזור לאנשים להבין מה הם רוצים\n4. לעזור לאנשים להיות עצמם' },
  { id: 3, title: 'המטרות שלי', answer: '1. לעזור לכמה שיותר אנשים לגלות את טביעת האצבע שלהם\n2. להקים מוסד שעוזר לאנשים לחבר בין הייחודיות שלהם לשינוי שהם רוצים לעשות בעולם\n3. להרצות במכינות, קורסים פיקודיים בצבא וחברות שרוצות לבנות את הזהות שלהן' },
  { id: 4, title: 'מי צריך אותי', answer: 'אנשים שרוצים לצאת לאור, אנשים שרוצים חיים מלאי משמעות' },
];

const leftItems = [
  { id: 5, title: 'במה אני מאמין', answer: 'הקשבה, אותנטיות, יוזמה, עצמאות, אחריות' },
  { id: 1, title: 'התחומים שלי', answer: 'לוגותרפיה, ייחודיות, מוטיבציה, מדעי ההתנהגות, הרגלים, כדורסל' },
  { id: 2, title: 'שמות הפועל שלי', answer: 'לפתח, להקשיב, לגלות, לשחק, להרצות, ליזום' },
];

const allItems = [...rightItems, ...leftItems];

function LabelRow({ id, title, hovered, side, onEnter, onLeave }: {
  id: number; title: string; hovered: number | null;
  side: 'right' | 'left'; onEnter: () => void; onLeave: () => void;
}) {
  const active = hovered === id;
  const line = <div className={`w-10 flex-shrink-0 h-px transition-all duration-200 ${active  'bg-primary' : 'bg-primary/30'}`} />;
  const dot = <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-200 ${active  'bg-primary scale-125' : 'bg-primary/40'}`} />;
  const text = <p className={`font-bold text-lg transition-colors duration-200 whitespace-nowrap ${active  'text-primary' : 'text-text-main'}`}>{title}</p>;

  return (
    <div className="flex items-center gap-1 cursor-default" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {side === 'right'  <>{text}{line}{dot}</> : <>{dot}{line}{text}</>}
    </div>
  );
}

export default function FingerprintDiagram() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = allItems.find(i => i.id === hovered);

  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-4">
        {/* Right labels */}
        <div className="flex flex-col gap-10 flex-1 items-end">
          {rightItems.map(item => (
            <LabelRow key={item.id} {...item} hovered={hovered} side="right"
              onEnter={() => setHovered(item.id)} onLeave={() => setHovered(null)} />
          ))}
        </div>

        {/* Fingerprint */}
        <div className="flex-shrink-0">
          <FingerprintInteractive hovered={hovered} onHover={setHovered} />
        </div>

        {/* Left labels */}
        <div className="flex flex-col gap-10 flex-1 items-start">
          {leftItems.map(item => (
            <LabelRow key={item.id} {...item} hovered={hovered} side="left"
              onEnter={() => setHovered(item.id)} onLeave={() => setHovered(null)} />
          ))}
        </div>
      </div>

      {/* Reveal area */}
      <div className="mt-8 text-center min-h-28 flex flex-col items-center justify-center">
        {active  (
          <div className="transition-opacity duration-300 opacity-100">
            <p className="font-bold text-primary text-xl mb-2">{active.title}</p>
            <p className="text-text-main text-lg leading-relaxed whitespace-pre-line">{active.answer}</p>
          </div>
        ) : (
          <p className="text-text-muted text-sm">העבר את העכבר על כותרת או על הטביעה לגילוי</p>
        )}
      </div>

      {/* Mobile — list */}
      <div className="md:hidden flex flex-col items-center gap-8">
        <FingerprintInteractive hovered={hovered} onHover={setHovered} />
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
