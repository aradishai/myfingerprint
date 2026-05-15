import Link from 'next/link';

export const metadata = {
  title: 'בלוג | ערד ישי',
  description: 'מאמרים על פיתוח אישי, זהות וסיפור אישי',
};

const posts = [
  {
    slug: 'what-is-your-fingerprint',
    title: 'מה החותם שלך בעולם?',
    excerpt: 'כולנו משאירים חותם — גם אם לא מכוון. השאלה היא האם החותם שלך מייצג את מי שאתה באמת.',
    date: '12 מאי 2026',
    tag: 'זהות',
    readTime: '4 דק׳',
  },
  {
    slug: 'the-power-of-personal-story',
    title: 'הכוח של הסיפור האישי',
    excerpt: 'למה הסיפור שלך הוא הנכס הכי חזק שיש לך — וכיצד לספר אותו בצורה שאנשים זוכרים.',
    date: '5 מאי 2026',
    tag: 'סיפור',
    readTime: '6 דק׳',
  },
  {
    slug: 'from-army-to-coaching',
    title: 'מהצבא לאימון — מה למדתי על אנשים',
    excerpt: '4 שנות לחימה לימדו אותי יותר על טבע האדם מכל ספר. הנה מה שלקחתי איתי.',
    date: '28 אפריל 2026',
    tag: 'סיפור אישי',
    readTime: '7 דק׳',
  },
  {
    slug: 'how-to-find-your-uniqueness',
    title: 'איך למצוא את הייחוד שלך',
    excerpt: 'שלושה שאלות שאם תענה עליהן בכנות — תגלה משהו על עצמך שלא ידעת שידעת.',
    date: '20 אפריל 2026',
    tag: 'כלים',
    readTime: '5 דק׳',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-bl from-surface to-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">בלוג</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mt-4 mb-6">מחשבות וכלים</h1>
          <p className="text-xl text-text-muted">
            מאמרים על זהות, סיפור אישי וחיים אמיתיים.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card group hover:shadow-md transition-shadow block">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-xs text-text-muted">{post.readTime} קריאה</span>
                </div>
                <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">{post.date}</span>
                  <span className="text-accent text-sm font-semibold group-hover:underline">קרא עוד ←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
