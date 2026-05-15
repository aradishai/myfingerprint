'use client';
import { useState } from 'react';
import Link from 'next/link';
import FingerprintInteractive from './FingerprintInteractive';

const stations = [
  { num: 1, title: 'נרטיב',               desc: 'איך נוצרת זהות?' },
  { num: 2, title: 'בחירות בחיים',         desc: 'איך אנחנו מקבלים החלטות?' },
  { num: 3, title: 'החלק שלי ברכב',        desc: 'מה התפקיד שלנו?' },
  { num: 4, title: 'חוויה מול יעילות',     desc: 'האם אנחנו נוכחים בחיים של עצמינו?' },
  { num: 5, title: 'מי צריך אותי?',        desc: 'ממה וממי אכפת לי?' },
  { num: 6, title: 'זהות יוצרת אחריות',   desc: 'סיכום התהליך' },
];

export default function ServicesSection() {
  const [openRight, setOpenRight] = useState(false); // fingerprint card
  const [openLeft, setOpenLeft]   = useState(false); // workshops timeline

  const isOpen = openRight || openLeft;

  const title = openLeft
    ? 'לפניכם ששת הסדנאות שיעזרו לכם להבין מה התפקיד שלכם בעולם המופלא שלנו'
    : 'מה אפשר לעשות יחד';

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="section-title transition-all duration-300">{title}</h2>
          {openLeft && (
            <p className="text-text-muted mt-2">ניתן להזמין בנפרד או כקורס שלם</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Right card — fingerprint / personal coaching */}
          <div
            className={`transition-all duration-500 ${isOpen ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'} bg-cream rounded-2xl p-12 shadow-sm border border-border hover:shadow-md cursor-pointer min-h-72 flex flex-col justify-between`}
            style={isOpen ? { visibility: 'hidden' } : {}}
            onClick={() => setOpenRight(true)}
          >
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">ליווי אישי</p>
              <h3 className="text-xl font-bold text-text-main mb-4">מה היא טביעת האצבע שלך בעולם?</h3>
              <p className="text-text-muted leading-relaxed">
                תהליך אישי אחד על אחד בו נחקור מה נועדתם לעשות? מה היא הייחודיות האישית שלכם ואיך תוכלו לייצר שינוי בעולם ובכך להביא את עצמכם לחיים בעלי משמעות ועשייה.
              </p>
            </div>
            <span className="text-primary font-semibold text-sm mt-6 inline-block">לחץ לגילוי ←</span>
          </div>

          {/* Left card — workshops */}
          <div
            className={`transition-all duration-500 ${isOpen ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'} bg-cream rounded-2xl p-12 shadow-sm border border-border hover:shadow-md cursor-pointer min-h-72 flex flex-col justify-between`}
            style={isOpen ? { visibility: 'hidden' } : {}}
            onClick={() => setOpenLeft(true)}
          >
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">קורסים | סדנאות | הרצאות</p>
              <h3 className="text-xl font-bold text-text-main mb-4">מה תרצו להיות כשתהיו גדולים?</h3>
              <p className="text-text-muted leading-relaxed">
                הרצאה / סדנה לקבוצה בה נעבור תהליך בן שישה שלבים בו נגלה את הסיפור האישי שלנו, הייחודיות והשינוי שנרצה להוביל בעולם.
              </p>
            </div>
            <span className="bg-primary text-white px-3 py-1 rounded-full font-semibold text-xs transition-all duration-200 hover:opacity-90 mt-6 inline-block w-fit">לתיאום סדנה</span>
          </div>

          {/* Expanded: fingerprint */}
          <div
            className={`md:col-span-2 bg-cream rounded-2xl p-10 shadow-sm border border-border transition-all duration-500 ${openRight ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}
            style={!openRight ? { visibility: 'hidden' } : {}}
          >
            <div className="flex justify-start mb-6">
              <button
                onClick={() => setOpenRight(false)}
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
              >
                חזרה
              </button>
            </div>
            <FingerprintInteractive />
            <div className="text-center mt-8">
              <Link href="#contact" className="btn-primary">
                לתיאום פגישה ופרטים נוספים
              </Link>
            </div>
          </div>

          {/* Expanded: workshops timeline */}
          <div
            className={`md:col-span-2 bg-cream rounded-2xl p-10 shadow-sm border border-border transition-all duration-500 ${openLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}
            style={!openLeft ? { visibility: 'hidden' } : {}}
          >
            <div className="flex justify-start mb-10">
              <button
                onClick={() => setOpenLeft(false)}
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
              >
                חזרה
              </button>
            </div>

            {/* Desktop */}
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
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base shadow-lg flex-shrink-0"
                        style={{
                          backgroundColor: `rgba(82, 196, 122, ${(s.num / 6).toFixed(2)})`,
                          color: '#1A1A1A',
                        }}
                      >
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

            {/* Mobile */}
            <div className="md:hidden flex flex-col gap-4">
              {stations.map((s, i) => (
                <div key={s.num} className="flex items-start gap-4">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-md"
                      style={{
                        backgroundColor: `rgba(82, 196, 122, ${(s.num / 6).toFixed(2)})`,
                        color: '#1A1A1A',
                      }}
                    >
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

            <div className="text-center mt-10">
              <Link href="#contact" className="btn-primary">
                לתיאום סדנה ופרטים נוספים
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
