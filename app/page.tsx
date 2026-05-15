import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      {/* Hero — ירוק */}
      <section className="min-h-screen flex items-center justify-center pt-16 bg-primary">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-10">
            "החלום שלי הוא שכל אדם יידע מה היא טביעת האצבע שלו בבניית העולם שלנו"
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-cream mb-8">מה החותם שלך?</h2>
          <p className="text-lg text-white/85 leading-relaxed mb-6">
            אני מאמין שלכל אדם יש ייחודיות משלו, ערכים משלו וסט חוזקות איתם הוא צועד במסלול חייו.
          </p>
          <p className="text-lg text-white/85 leading-relaxed mb-6">
            לכל אדם יש ייעוד אותו הוא יכול וצריך לממש.
          </p>
          <p className="text-lg text-white/85 leading-relaxed mb-10">
            לאורך שנים של חקר מעמיק ועבודת שטח, פיתחתי כלים פרקטיים שייסעו לכל אחד ואחת להצליח למצוא את הדרך הייחודיות שלו\ה להפוך את העולם שלנו לטוב יותר.
          </p>
          <Link href="#contact" className="bg-cream text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-lg">
            צרו איתי קשר
          </Link>
        </div>
      </section>

      {/* Services — שמנת */}
      <section className="py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="section-title">מה אפשר לעשות יחד</h2>
            <p className="text-text-muted">לחצו על הכרטיסיות לפרטים נוספים</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-text-main mb-4">מה היא טביעת האצבע שלך בעולם?</h3>
              <p className="text-text-muted leading-relaxed">
                תהליך אישי אחד על אחד בו נחקור מה נועדתם לעשות? מה היא הייחודיות האישית שלכם ואיך תוכלו לייצר שינוי בעולם ובכך להביא את עצמכם לחיים בעלי משמעות ועשייה.
              </p>
              <Link href="#contact" className="inline-block mt-6 text-primary font-semibold hover:underline">
                לפרטים נוספים ←
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-text-main mb-4">איזה שינוי תרצו להוביל בעולם?</h3>
              <p className="text-text-muted leading-relaxed">
                הרצאה / סדנה לקבוצה בה נעבור תהליך בן שלושה שלבים בו נגלה את הסיפור האישי שלנו, הייחודיות והשינוי שנרצה להוביל בעולם.
              </p>
              <Link href="#contact" className="inline-block mt-6 text-primary font-semibold hover:underline">
                לפרטים נוספים ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial — ירוק */}
      <section className="py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-medium mb-8 italic">
            "היה ממש ממש טוב. המדריך היה תיאטרלי וגרם לאנשים להקשיב. במיוחד שזה היה אחרי יום שלם. קיבל פידבקים ממש חיוביים מהחיילים"
          </blockquote>
          <p className="text-white/80 font-semibold">עידן, מ"פ צמ"ה איו"ש</p>
          <p className="text-white/60 text-sm">הכנת סגל מפקדים</p>
        </div>
      </section>

      {/* About — שמנת */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="section-title text-center mb-10">קצת עליי</h2>
          <p className="text-text-muted leading-relaxed text-lg mb-6">
            אני מאמין שלכל אחד מאיתנו יש תפקיד ייחודי בתיקון העולם המופלא שלנו. לאחר 4 שנים של שירות קרבי ושנתיים נוספות בתפקידים בכירים בחיל החינוך בהן חקרתי, העמקתי והתנסתי בכלים שפיתחתי, יצאתי לאזרחות להגשים את חלומי בו כל אחד יכול לממש את הפוטנציאל האישי שלו על מנת לשנות את העולם.
          </p>
          <p className="text-text-muted leading-relaxed text-lg mb-2">מאמן מנטלי</p>
          <p className="text-text-muted leading-relaxed text-lg mb-8">מנחה בחברה לייעוץ ארגוני | "אדם ומחשבה"</p>
          <p className="text-lg text-text-main font-semibold">
            אם גם אתה נמצא בצומת הזו, אני כאן, זה תפקידי בעולם.
          </p>
        </div>
      </section>

      {/* Contact — ירוק */}
      <section className="py-24 bg-primary" id="contact">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">צרו איתי קשר</h2>
          <p className="text-center text-white/70 mb-10">סקרנים לשמוע עוד?</p>
          <ContactForm />
          <p className="text-center text-white/70 mt-8 text-lg font-medium">נתראה בקרוב!</p>
        </div>
      </section>
    </>
  );
}
