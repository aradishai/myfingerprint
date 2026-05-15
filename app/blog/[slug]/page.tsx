import Link from 'next/link';

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-24">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/blog" className="text-accent text-sm font-semibold hover:underline mb-8 inline-block">
          ← חזרה לבלוג
        </Link>
        <div className="bg-accent/10 text-accent text-sm font-semibold px-4 py-1 rounded-full inline-block mb-6">
          בלוג
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
          המאמר בקרוב...
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-10">
          אני עובד על תוכן עשיר לבלוג. בינתיים — רוצה לדבר ישירות?
        </p>
        <Link href="/contact" className="btn-primary">
          צור קשר ←
        </Link>
      </div>
    </div>
  );
}
