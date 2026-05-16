'use client';
import { useState } from 'react';
import FingerprintInteractive from './FingerprintInteractive';

const rightItems = [
  { id: 6, title: 'במה אני מומחה?', answer: '"אני לא מוצא את הלמה שלי, לא מצליח להיות מי שאני במערכת הזאת, ואתה הבן אדם הראשון שעולה לי לראש כשאני חושב על זה"' },
  { id: 3, title: 'המטרות שלי', answer: '1. לעזור לכמה שיותר אנשים לגלות את טביעת האצבע שלהם\n2. להקים מוסד שמחבר ייחודיות לשינוי\n3. להיות מרצה במכינות קדם צבאיות' },
  { id: 4, title: 'מי צריך אותי?', answer: 'אנשים שרוצים לצאת לאור, אנשים שרוצים חיים מלאי משמעות' },
];

const leftItems = [
  { id: 5, title: 'במה אני מאמין?', answer: 'הקשבה, אותנטיות, יוזמה' },
  { id: 1, title: 'התחומים שלי', answer: 'לוגותרפיה, ייחודיות, מוטיבציה, מדעי ההתנהגות, הרגלים, כדורסל' },
  { id: 2, title: 'שמות הפועל שלי', answer: 'לפתח, להקשיב, לגלות, לשחק, להרצות, ליזום' },
];

function Label({ id, title, answer, hovered, side, onEnter, onLeave }: {
  id: number; title: string; answer: string;
  hovered: number | null; side: 'right' | 'left';
  onEnter: () => void; onLeave: () => void;
}) {
  const active = hovered === id;
  const line = (
    <div className={`flex-1 h-px transition-all duration-200 ${active ? 'bg-primary' : 'bg-primary/30'}`} />
  );
  const dot = (
    <div className={`w-4 h-4 rounded-full flex-shrink-0 transition-all duration-200 ${active ? 'bg-primary scale-125' : 'bg-primary/50'}`} />
  );
  const text = (
    <div className={`transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-70'} ${side === 'right' ? 'text-right' : 'text-left'}`}>
      <p className="font-bold text-primary text-lg leading-tight">{title}</p>
      <p className="text-text-muted text-base leading-snug mt-1 max-w-[200px] whitespace-pre-line">{answer}</p>
    </div>
  );

  return (
    <div className="flex items-center gap-1 cursor-default" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {side === 'right' ? <>{text}{line}{dot}</> : <>{dot}{line}{text}</>}
    </div>
  );
}

export default function FingerprintDiagram() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2">
        {/* Right labels */}
        <div className="flex flex-col justify-around flex-1 gap-12">
          {rightItems.map(item => (
            <Label key={item.id} {...item} hovered={hovered} side="right"
              onEnter={() => setHovered(item.id)} onLeave={() => setHovered(null)} />
          ))}
        </div>

        {/* Fingerprint */}
        <div className="flex-shrink-0">
          <FingerprintInteractive hovered={hovered} onHover={setHovered} />
        </div>

        {/* Left labels */}
        <div className="flex flex-col justify-around flex-1 gap-12">
          {leftItems.map(item => (
            <Label key={item.id} {...item} hovered={hovered} side="left"
              onEnter={() => setHovered(item.id)} onLeave={() => setHovered(null)} />
          ))}
        </div>
      </div>

      {/* Mobile — list */}
      <div className="md:hidden flex flex-col items-center gap-8">
        <FingerprintInteractive hovered={hovered} onHover={setHovered} />
        <div className="flex flex-col gap-5 w-full">
          {[...rightItems, ...leftItems].map(item => (
            <div key={item.id} className="border-r-2 border-primary/50 pr-4">
              <p className="font-bold text-primary text-sm">{item.title}</p>
              <p className="text-text-muted text-xs leading-snug mt-0.5">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
