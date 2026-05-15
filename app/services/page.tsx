import Link from 'next/link';

export const metadata = {
  title: 'שירותים | ערד ישי',
  description: 'אימון אישי, סדנאות קבוצתיות והרצאות — ערד ישי',
};

const services = [
  {
    tag: 'אימון אישי',
    title: 'מסע של גילוי עצמי',
    desc: 'פגישות אישיות 1:1 שמובילות אותך לחשוף את הסיפור הייחודי שלך — מי אתה, מה הכוחות שלך, ואיך לחיות אותם ביומיום.',
    bullets: [
      'זיהוי הערכים והכוחות הייחודיים שלך',
      'פיתוח שפה אישית לתיאור עצמך',
      'תוכנית פעולה מותאמת אישית',
      'ליווי מתמשך לאורך תהליך השינוי',
    ],
    cta: 'לפגישת היכרות',
  },
  {
    tag: 'סדנאות קבוצתיות',
    title: 'חוויה שמשנה קבוצות',
    desc: 'תהליך בן 3 שלבים שמחבר בין חברי הקבוצה דרך הסיפורים האישיים שלהם.',
    bullets: [
      'שלב 1: הסיפור האישי — מאיפה אתה בא',
      'שלב 2: הייחוד — מה אתה מביא לעולם',
      'שלב 3: השינוי הרצוי — לאן אתה הולך',
      'מתאים לארגונים, צוותים ומסגרות חינוכיות',
    ],
    cta: 'לפרטים על סדנאות',
  },
  {
    tag: 'הרצאות',
    title: 'הרצאה שמדליקה אנשים',
    desc: 'הרצאה מרתקת ועוצמתית שמשאירה חותם — על זהות, ייעוד ואומץ לחיות את הסיפור האמיתי שלך.',
    bullets: [
      'מותאמת לקהל ולמסר שלך',
      'משלבת סיפורים אישיים ותרגולים',
      'מתאימה לאירועי חברה, כנסים ועוד',
      'משוב מרגש מכל הרצאה',
    ],
    cta: 'לפרטים על הרצאות',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-bl from-surface to-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">שירותים</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mt-4 mb-6">
            איך אני יכול לעזור לך
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            בין אם אתה מחפש מסע אישי עמוק, חוויה קבוצתית, או הרצאה שמשאירה חותם — יש לי את הפתרון עבורך.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {services.map((s, i) => (
            <div key={s.tag} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div>
                <span className="inline-block bg-accent/10 text-accent text-sm font-semibold px-4 py-1 rounded-full mb-4">
                  {s.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{s.title}</h2>
                <p className="text-text-muted leading-relaxed mb-6">{s.desc}</p>
                <Link href="/contact" className="btn-primary">{s.cta} ←</Link>
              </div>
              <div className="card">
                <ul className="space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span className="text-text-muted text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">לא בטוח מה מתאים לך?</h2>
          <p className="text-white/70 mb-8 text-lg">נדבר. אני אבין מה אתה צריך ואמליץ על הדרך הנכונה.</p>
          <Link href="/contact" className="btn-primary bg-accent hover:bg-accent-light text-lg px-10 py-4">
            שלח לי הודעה ←
          </Link>
        </div>
      </section>
    </div>
  );
}
