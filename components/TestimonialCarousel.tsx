'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

type Testimonial = { quote: string; name: string; role: string; date?: string; ratings?: { enjoy?: number; clarity?: number; tools?: number } };

const staticTestimonials: Testimonial[] = [
  { quote: 'היה ממש ממש טוב. המדריך היה תיאטרלי וגרם לאנשים להקשיב. במיוחד שזה היה אחרי יום שלם. קיבל פידבקים ממש חיוביים מהחיילים.', name: 'עידן', role: 'מ"פ צמ"ה איו"ש — הכנת סגל מפקדים' },
  { quote: 'בדיוק יוצאת משיחות עם מפקדים שהחמיאו בטירוף על הכל, אמרו שלמדו ממך אפילו משפת הגוף שלך... אז להגיד המון תודה היה לנו משמעותי ממש ואיזה כיף שיש אנשים כמוך ❤️', name: 'פורום מפקדי מחלקות, תותחנים', role: '' },
  { quote: 'למדתי ממך להסתכל לבן אדם בעיניים ולפנות אליו ישירות, מה זה לקרוא בין השורות ולהבין דברים גם בלי מילים. גם שאני ממש לא בעניין שלה"מה" — אני עדיין תמיד יכולה להשפיע על ה"איך". כמה משמעות והשפעה יכולים להיות למילים או לשתיקה שלי.', name: 'מכינת חמש אצבעות', role: '' },
  { quote: 'כותבת לך מה אשת הקשר אמרה לי על הסדנה בגולני: ערד היה מדהים מדהים והוא הצליח להניע אותם בצורה מדהימה!', name: 'בא"ח גולני', role: '' },
  { quote: 'היה ממש טוב, התרשמות מהסדנה גבוהה באופן טוב, היו פידבקים ממש טובים — הכל חמש. העברת המסר ממש גבוה! הדבר היחידי שאמרו זה שהשעה לא מספיקה. אשת הקשר אמרה שזה טוב כי המטרה היא לפתוח להם את הערב!', name: 'טרייד מוביל', role: '' },
  { quote: 'שמע זה מטורף אחי, שבכל כך קצת זמן אני אישית עברתי שינוי משמעותי מאוד שרק עכשיו אני מתחיל להבין אותו לגבי המשך החיים ובכללי לצבא. באמת אחי עשית משהו מטורף שתדע. חייב להגיד לך שגם היום שינית לי את החשיבה בטירוף ואת כל הגישה הפיקודית שלי.', name: 'בה"ד 1, קורס קצינים', role: '' },
  { quote: 'הייתה סדנה מעולה, אנשי הקבע ממש עפו על הסדנה — גם על איך שהעבירו וגם על התכנים. הכל היה מעולה, לא הפסיקו לדבר על הסדנה.', name: 'לינוי מבסיס רמון, קורס כניסה נגדים', role: '' },
];

export default function TestimonialCarousel() {
  const [all, setAll]         = useState<Testimonial[]>(staticTestimonials);
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [dir, setDir]         = useState<'next' | 'prev'>('next');
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/feedback')
      .then(r => r.json())
      .then((data: { open_text?: string; name?: string; org?: string; rating_enjoy?: number; rating_clarity?: number; rating_tools?: number; timestamp?: string }[]) => {
        const dynamic: Testimonial[] = data
          .filter(d => d.open_text?.trim())
          .map(d => ({
            quote:   d.open_text!.trim(),
            name:    d.name?.trim() || '',
            role:    d.org?.trim()  || '',
            date:    d.timestamp ? new Date(d.timestamp).toLocaleDateString('en-GB') : undefined,
            ratings: { enjoy: d.rating_enjoy, clarity: d.rating_clarity, tools: d.rating_tools },
          }));
        if (dynamic.length > 0) setAll([...staticTestimonials, ...dynamic]);
      })
      .catch(() => {});
  }, []);

  const goTo = useCallback((index: number, total: number, direction: 'next' | 'prev') => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDir(direction);
    setCurrent((index + total) % total);
    setAnimKey(k => k + 1);
    intervalRef.current = setInterval(() => {
      setDir('next');
      setCurrent(c => (c + 1) % total);
      setAnimKey(k => k + 1);
    }, 25000);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDir('next');
      setCurrent(c => (c + 1) % all.length);
      setAnimKey(k => k + 1);
    }, 25000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [all.length]);

  const t = all[current];
  const slideClass = dir === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  return (
    <div className="w-full">
      {/* Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">

        {/* Arrow buttons — sides */}
        <button
          onClick={() => goTo(current - 1, all.length, 'prev')}
          className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/5 transition-all text-3xl z-10"
          aria-label="הקודם"
        >‹</button>
        <button
          onClick={() => goTo(current + 1, all.length, 'next')}
          className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center text-primary/40 hover:text-primary hover:bg-primary/5 transition-all text-3xl z-10"
          aria-label="הבא"
        >›</button>

        {/* Content */}
        <div key={animKey} className={`px-14 md:px-20 py-10 md:py-12 text-center ${slideClass}`}>
          <blockquote className="text-lg md:text-2xl text-text-main leading-relaxed font-bold mb-6 italic">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {(t.name || t.role) && (
            <div className="mb-4">
              {t.name && <p className="text-primary font-bold text-base">{t.name}</p>}
              {t.role && <p className="text-text-muted text-sm mt-0.5">{t.role}</p>}
            </div>
          )}

          {t.ratings && (t.ratings.enjoy || t.ratings.clarity || t.ratings.tools) && (
            <div className="flex flex-col items-center gap-1 mt-3 text-text-muted text-sm border-t border-border pt-4">
              {t.ratings.enjoy   && <span>נהניתי מהסדנה: <strong className="text-primary">{t.ratings.enjoy}/5</strong></span>}
              {t.ratings.clarity && <span>הסדנה עזרה לי לדייק את עצמי: <strong className="text-primary">{t.ratings.clarity}/5</strong></span>}
              {t.ratings.tools   && <span>קיבלתי כלים להמשך: <strong className="text-primary">{t.ratings.tools}/5</strong></span>}
            </div>
          )}

          {t.date && <p className="text-text-muted/60 text-xs mt-3">{t.date}</p>}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {all.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, all.length, i > current ? 'next' : 'prev')}
            className={`rounded-full transition-all duration-300 ${i === current ? 'bg-white w-4 h-2' : 'bg-white/40 w-2 h-2'}`}
          />
        ))}
      </div>
    </div>
  );
}
