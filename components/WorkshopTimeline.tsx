'use client';
import { useState, ReactNode } from 'react';
import Link from 'next/link';

const stations = [
  { num: 1, title: 'נרטיב',                 desc: 'איך נוצרת זהות?' },
  { num: 2, title: 'בחירות בחיים',           desc: 'איך אנחנו מקבלים החלטות?' },
  { num: 3, title: 'החלק שלי ברכב',          desc: 'מה התפקיד שלנו?' },
  { num: 4, title: 'חוויה מול יעילות',       desc: 'האם אנחנו נוכחים בחיים של עצמינו?' },
  { num: 5, title: 'מי צריך אותי?',          desc: 'ממה וממי אכפת לי?' },
  { num: 6, title: 'זהות יוצרת אחריות',      desc: 'סיכום התהליך' },
];

export default function WorkshopTimeline({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="col-span-2 bg-cream rounded-2xl p-10 shadow-sm border border-border transition-all duration-500">
        <div className="flex items-center justify-between mb-10">
          <button onClick={() => setOpen(false)} className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all">
            חזרה
          </button>
          <p className="text-primary font-bold text-sm uppercase tracking-widest">קורסים | סדנאות | הרצאות</p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          <div className="flex items-stretch justify-between relative">
            <div className="absolute top-[88px] right-0 left-0 h-1 bg-primary/30 rounded-full z-0" />
            {stations.map((s) => {
              const isAbove = s.num % 2 === 0;
              return (
                <div key={s.num} className="flex flex-col items-center flex-1 relative z-10">
                  <div className="h-24 flex flex-col justify-end items-center pb-4 px-3 text-center">
                    {isAbove && (
                      <>
                        <p className="font-bold text-text-main text-base leading-snug mb-1">{s.title}</p>
                        <p className="text-text-muted text-sm leading-snug">{s.desc}</p>
                      </>
                    )}
                  </div>
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-lg flex-shrink-0">
                    {s.num}
                  </div>
                  <div className="h-24 flex flex-col justify-start items-center pt-4 px-3 text-center">
                    {!isAbove && (
                      <>
                        <p className="font-bold text-text-main text-base leading-snug mb-1">{s.title}</p>
                        <p className="text-text-muted text-sm leading-snug">{s.desc}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-4">
          {stations.map((s, i) => (
            <div key={s.num} className="flex items-start gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {s.num}
                </div>
                {i < stations.length - 1 && <div className="w-0.5 h-6 bg-primary/30 mt-1" />}
              </div>
              <div className="pt-1">
                <p className="font-bold text-text-main text-sm">{s.title}</p>
                <p className="text-text-muted text-xs mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="#contact" className="btn-primary">
            רוצה לשמוע עוד? ←
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      <div
        className="bg-cream rounded-2xl p-12 shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer min-h-72 flex flex-col justify-between"
        onClick={() => setOpen(true)}
      >
        <div>
          <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">קורסים | סדנאות | הרצאות</p>
          <h3 className="text-xl font-bold text-text-main mb-4">מה תרצו להיות כשתהיו גדולים?</h3>
          <p className="text-text-muted leading-relaxed">
            הרצאה / סדנה לקבוצה בה נעבור תהליך בן שישה שלבים בו נגלה את הסיפור האישי שלנו, הייחודיות והשינוי שנרצה להוביל בעולם.
          </p>
        </div>
        <span className="text-primary font-semibold text-sm mt-6 inline-block">לחץ לראות את התהליך ←</span>
      </div>
    </>
  );
}
