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
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">הסיפור שלי</h1>
        </div>
      </section>
    </div>
  );
}
