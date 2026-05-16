import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ServicesSection from '@/components/ServicesSection';
import BookCarousel from '@/components/BookCarousel';

export default function Home() {
  return (
    <>
      {/* Hero — ירוק */}
      <section className="min-h-screen flex items-center justify-center pt-16 bg-primary">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Profile image */}
            <div className="flex-shrink-0 hero-fade-1">
              <img
                src="/profile.jpg"
                alt="ערד ישי"
                className="w-48 h-48 md:w-72 md:h-72 rounded-full object-cover object-top shadow-2xl border-4 border-white/20"
              />
            </div>
            {/* Text */}
            <div className="text-center md:text-right">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-cream leading-tight mb-4 tracking-wide hero-fade-2" style={{fontFamily:"'Varela Round', sans-serif"}}>
                מה תרצו להיות כשתהיו גדולים?
              </h1>
              <p className="text-base md:text-xl text-white/90 leading-loose mb-8 mt-6 hero-fade-3">
                אני מאמין שלכל אדם יש ייחודיות משלו, ערכים משלו וסט חוזקות איתם הוא צועד במסלול חייו. לכל אדם יש ייעוד אותו הוא יכול וצריך לממש. לאורך שנים של חקר מעמיק ועבודת שטח, פיתחתי כלים פרקטיים שייסעו לכל אחד ואחת להצליח למצוא את הדרך הייחודיות שלו להפוך את העולם שלנו לטוב יותר.
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-end hero-fade-4">
                <Link href="#contact" className="bg-cream text-primary px-6 py-3 md:px-10 md:py-4 rounded-full font-extrabold text-base md:text-lg hover:opacity-90 transition-all shadow-lg">
                  צרו איתי קשר
                </Link>
                <Link href="/builder">
                  <img src="/logo.svg" alt="לוגו" className="w-12 h-12 md:w-16 md:h-16 brightness-0 invert hover:opacity-80 transition-opacity" />
                </Link>
              </div>
              <p
                style={{ WebkitBoxReflect: 'below 4px linear-gradient(transparent 40%, rgba(255,255,255,0.15))' }}
                className="text-white/70 text-sm md:text-base italic mt-8 hero-fade-4"
              >
                "החלום שלי הוא שכל אדם יגלה מהי טביעת האצבע שלו בבניית העולם שלנו"
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Testimonials — ירוק */}
      <section
        className="py-24 relative"
        style={{
          backgroundImage: 'url(/testimonials-bg.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <TestimonialCarousel />
        </div>
      </section>

      <BookCarousel />

      {/* About — שמנת */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="section-title mb-10">הסיפור שלי</h2>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div>
              <p className="text-text-muted leading-relaxed text-base md:text-lg mb-4 md:mb-6">
                אני מאמין שלכל אחד מאיתנו יש תפקיד ייחודי בתיקון העולם המופלא שלנו. לאחר 4 שנים של שירות קרבי ושנתיים נוספות בתפקידים בכירים בחיל החינוך בהן חקרתי, העמקתי והתנסתי בכלים שפיתחתי, יצאתי לאזרחות להגשים את חלומי בו כל אחד יכול לממש את הפוטנציאל האישי שלו על מנת לשנות את העולם.
              </p>
              <p className="text-text-muted leading-relaxed text-sm md:text-lg mb-1">מאמן אישי</p>
              <p className="text-text-muted leading-relaxed text-sm md:text-lg mb-1">מנחה בחברה לייעוץ ארגוני | "אדם ומחשבה"</p>
              <p className="text-text-muted leading-relaxed text-sm md:text-lg mb-6">מרצה ומנחה בנושאים זהות אחריות ומשמעות</p>
              <p className="text-base md:text-lg text-text-main font-semibold">
                אם גם אתה נמצא בצומת הזו, אני כאן, זה תפקידי בעולם.
              </p>
            </div>
            <div className="flex flex-col items-center gap-0 flex-shrink-0">
              <img
                src="/profile.jpg"
                alt="ערד ישי"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover object-top shadow-lg"
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
