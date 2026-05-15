import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo.svg" alt="לוגו" className="h-8 w-8 brightness-0 invert opacity-80" />
            <h3 className="text-xl font-bold">חותם בעולם</h3>
          </div>
          <p className="text-white/50 text-sm mb-3">ערד ישי</p>
          <p className="text-white/60 text-sm leading-relaxed">
            "החלום שלי הוא שכל אדם יידע מה היא טביעת האצבע שלו בבניית העולם שלנו"
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">ניווט</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {[['/', 'בית'], ['/about', 'אודות'], ['/services', 'שירותים'], ['/blog', 'בלוג'], ['/contact', 'צור קשר']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-accent-light transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">יצירת קשר</h4>
          <div className="space-y-2 text-sm text-white/70">
            <p>ערד ישי</p>
            <p>מאמן אישי ויועץ ארגוני</p>
            <Link href="/contact" className="inline-block mt-3 text-accent-light hover:underline font-medium">
              השאר פרטים ←
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} ערד ישי — חותם בעולם. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
