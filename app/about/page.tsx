import FingerprintDiagram from '@/components/FingerprintDiagram';

export const metadata = {
  title: 'אודות | ערד ישי',
  description: 'הסיפור שלי — ערד ישי, מאמן אישי ויועץ ארגוני',
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-10">הסיפור שלי</h1>
          <p className="text-text-muted leading-relaxed text-lg mb-6">
            אני מאמין שלכל אחד מאיתנו יש תפקיד ייחודי בתיקון העולם המופלא שלנו. לאחר 4 שנים של שירות קרבי ושנתיים נוספות בתפקידים בכירים בחיל החינוך בהן חקרתי, העמקתי והתנסתי בכלים שפיתחתי, יצאתי לאזרחות להגשים את חלומי בו כל אחד יכול לממש את הפוטנציאל האישי שלו על מנת לשנות את העולם.
          </p>
          <p className="text-text-muted leading-relaxed text-lg mb-2">מאמן אישי</p>
          <p className="text-text-muted leading-relaxed text-lg mb-2">מנחה בחברה לייעוץ ארגוני | "אדם ומחשבה"</p>
          <p className="text-text-muted leading-relaxed text-lg mb-8">מרצה ומנחה בנושאים זהות אחריות ומשמעות</p>
          <p className="text-lg text-text-main font-semibold mb-20">
            אם גם אתה נמצא בצומת הזו, אני כאן, זה תפקידי בעולם.
          </p>

          <h2 className="text-3xl font-bold text-primary mb-10">טביעת האצבע שלי</h2>
          <FingerprintDiagram />
        </div>
      </section>
    </div>
  );
}
