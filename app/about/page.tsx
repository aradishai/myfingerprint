import Link from 'next/link';

export const metadata = {
  title: 'אודות | ערד ישי',
  description: 'הסיפור שלי — ערד ישי, מאמן אישי ויועץ ארגוני',
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-bl from-surface to-bg">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">אודות</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mt-4 mb-6">הסיפור שלי</h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            כל אחד מאיתנו הוא עולם ומלואו. אני כאן כדי לעזור לך לגלות את העולם שלך.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">איך התחיל המסע</h2>
            <p className="text-text-muted leading-relaxed text-lg">
              4 שנות שירות קרבי לימדו אותי שהרגעים הגדולים ביותר בחיים קורים כשאדם מגלה מה הוא באמת שווה.
              ראיתי לוחמים מצטיינים שלא ידעו לספר את הסיפור שלהם, ואנשים פשוטים שהכוח שלהם היה עצום.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">מה הוביל אותי לפה</h2>
            <p className="text-text-muted leading-relaxed text-lg">
              אחרי הצבא, לקחתי תפקיד חינוכי בכיר. שם הבנתי שהדבר שהכי מניע אנשים הוא לא כסף ולא כבוד —
              אלא תחושה שמה שהם עושים מחובר למי שהם באמת.
            </p>
            <p className="text-text-muted leading-relaxed text-lg mt-4">
              מאז אני עושה בדיוק את זה: עוזר לאנשים לחבר בין הסיפור הפנימי שלהם לחיים שהם חיים בחוץ.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">מה מניע אותי</h2>
            <p className="text-text-muted leading-relaxed text-lg">
              החלום שלי הוא שכל אדם יידע מה החותם שלו בבניין עולמנו. לא ישאיר את הסיפור שלו סגור בפנים.
              יביא את עצמו — המלא, האמיתי — לכל מקום שבו הוא נמצא.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="section-title text-center mb-14">מה אני מאמין בו</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'אותנטיות', desc: 'הסיפור הכי עוצמתי הוא תמיד הסיפור האמיתי.' },
              { title: 'ייחוד', desc: 'כל אדם נושא בו משהו שאין לאף אחד אחר בדיוק ככה.' },
              { title: 'חותם', desc: 'כולנו כאן כדי להשאיר משהו — השאלה היא מה.' },
            ].map((v) => (
              <div key={v.title} className="card text-center">
                <h3 className="text-xl font-bold text-primary mb-3">{v.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <h2 className="section-title">רוצה להכיר אותי קצת יותר?</h2>
        <p className="section-subtitle">בואו נדבר. פגישת היכרות ללא עלות.</p>
        <Link href="/contact" className="btn-primary text-lg px-10 py-4">
          דברו איתי ←
        </Link>
      </section>
    </div>
  );
}
