import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  return (
    <>
      {/* Hero — ירוק */}
      <section className="min-h-screen flex items-center justify-center pt-16 bg-primary">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-cream leading-tight mb-4 tracking-wide" style={{fontFamily:"'Secular One', sans-serif"}}>
            מה <span style={{color:'#67E8F9', textShadow:'0 0 20px rgba(103,232,249,0.8)'}}>תרצו</span> להיות כשתהיו גדולים?
          </h1>
          <p className="text-xl text-white/90 leading-loose mb-10 letter-font">
            אני מאמין שלכל אדם יש ייחודיות משלו, ערכים משלו וסט חוזקות איתם הוא צועד במסלול חייו. לכל אדם יש ייעוד אותו הוא יכול וצריך לממש. לאורך שנים של חקר מעמיק ועבודת שטח, פיתחתי כלים פרקטיים שייסעו לכל אחד ואחת להצליח למצוא את הדרך הייחודיות שלו להפוך את העולם שלנו לטוב יותר.
          </p>
          <div className="flex justify-center mb-10">
            <img src="/logo.svg" alt="לוגו" className="w-24 h-24 brightness-0 invert" />
          </div>
          <Link href="#contact" className="bg-cream text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-cream transition-all shadow-lg">
            צרו איתי קשר
          </Link>
        </div>
      </section>

      <ServicesSection />

      {/* Testimonials — ירוק */}
      <section className="py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-6">
          <TestimonialCarousel />
        </div>
      </section>

      {/* About — שמנת */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-10">קצת עליי</h2>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div>
              <p className="text-text-muted leading-relaxed text-lg mb-6">
                אני מאמין שלכל אחד מאיתנו יש תפקיד ייחודי בתיקון העולם המופלא שלנו. לאחר 4 שנים של שירות קרבי ושנתיים נוספות בתפקידים בכירים בחיל החינוך בהן חקרתי, העמקתי והתנסתי בכלים שפיתחתי, יצאתי לאזרחות להגשים את חלומי בו כל אחד יכול לממש את הפוטנציאל האישי שלו על מנת לשנות את העולם.
              </p>
              <p className="text-text-muted leading-relaxed text-lg mb-2">מאמן מנטלי</p>
              <p className="text-text-muted leading-relaxed text-lg mb-8">מנחה בחברה לייעוץ ארגוני | "אדם ומחשבה"</p>
              <p className="text-lg text-text-main font-semibold">
                אם גם אתה נמצא בצומת הזו, אני כאן, זה תפקידי בעולם.
              </p>
            </div>
            <div className="flex flex-col items-center gap-0 flex-shrink-0">
              <img
                src="/profile.jpg"
                alt="ערד ישי"
                className="w-56 h-56 rounded-full object-cover object-top shadow-lg"
              />
              <img
                src="/logo-small.png"
                alt="לוגו"
                className="h-40 object-contain"
              />
            </div>
          </div>
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
