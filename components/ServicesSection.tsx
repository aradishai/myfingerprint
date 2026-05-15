'use client';
import { useState } from 'react';
import Link from 'next/link';
import FingerprintInteractive from './FingerprintInteractive';


export default function ServicesSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="section-title transition-all duration-300">
            {open
              ? 'לפניכם ששת הסדנאות שיעזרו לכם להבין מה התפקיד שלכם בעולם המופלא שלנו'
              : 'מה אפשר לעשות יחד'}
          </h2>
          {open && (
            <p className="text-text-muted mt-2">ניתן להזמין בנפרד או כקורס שלם</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left card — personal coaching */}
          <div className={`transition-all duration-500 ${open ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'} bg-cream rounded-2xl p-12 shadow-sm border border-border hover:shadow-md min-h-72`}
            style={open ? { visibility: 'hidden' } : {}}
          >
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-3">ליווי אישי</p>
              <h3 className="text-xl font-bold text-text-main mb-4">מה היא טביעת האצבע שלך בעולם?</h3>
              <p className="text-text-muted leading-relaxed">
                תהליך אישי אחד על אחד בו נחקור מה נועדתם לעשות? מה היא הייחודיות האישית שלכם ואיך תוכלו לייצר שינוי בעולם ובכך להביא את עצמכם לחיים בעלי משמעות ועשייה.
              </p>
              <Link href="#contact" className="inline-block mt-6 text-primary font-semibold hover:underline">
                לפרטים נוספים ←
              </Link>
          </div>

          {/* Right card — workshops */}
          <div
            className={`transition-all duration-500 ${open ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'} bg-cream rounded-2xl p-12 shadow-sm border border-border hover:shadow-md cursor-pointer min-h-72 flex flex-col justify-between`}
            style={open ? { visibility: 'hidden' } : {}}
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

          {/* Fingerprint — full width */}
          <div className={`md:col-span-2 bg-cream rounded-2xl p-10 shadow-sm border border-border transition-all duration-500 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}
            style={!open ? { visibility: 'hidden' } : {}}
          >
              <div className="flex justify-start mb-6">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
                >
                  חזרה
                </button>
              </div>

              <FingerprintInteractive />

              <div className="text-center mt-8">
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
