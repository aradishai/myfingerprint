'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

type Testimonial = { quote: string; name: string; role: string; ratings?: { enjoy?: number; clarity?: number; tools?: number } };

const staticTestimonials: Testimonial[] = [
  {
    quote: 'היה ממש ממש טוב. המדריך היה תיאטרלי וגרם לאנשים להקשיב. במיוחד שזה היה אחרי יום שלם. קיבל פידבקים ממש חיוביים מהחיילים.',
    name: 'עידן',
    role: 'מ"פ צמ"ה איו"ש — הכנת סגל מפקדים',
  },
  {
    quote: 'בדיוק יוצאת משיחות עם מפקדים שהחמיאו בטירוף על הכל, אמרו שלמדו ממך אפילו משפת הגוף שלך... אז להגיד המון תודה היה לנו משמעותי ממש ואיזה כיף שיש אנשים כמוך ❤️',
    name: 'פורום מפקדי מחלקות, תותחנים',
    role: '',
  },
  {
    quote: 'למדתי ממך להסתכל לבן אדם בעיניים ולפנות אליו ישירות, מה זה לקרוא בין השורות ולהבין דברים גם בלי מילים. גם שאני ממש לא בעניין שלה"מה" — אני עדיין תמיד יכולה להשפיע על ה"איך". כמה משמעות והשפעה יכולים להיות למילים או לשתיקה שלי.',
    name: 'מכינת חמש אצבעות',
    role: '',
  },
  {
    quote: 'כותבת לך מה אשת הקשר אמרה לי על הסדנה בגולני: ערד היה מדהים מדהים והוא הצליח להניע אותם בצורה מדהימה!',
    name: 'בא"ח גולני',
    role: '',
  },
  {
    quote: 'היה ממש טוב, התרשמות מהסדנה גבוהה באופן טוב, היו פידבקים ממש טובים — הכל חמש. העברת המסר ממש גבוה! הדבר היחידי שאמרו זה שהשעה לא מספיקה. אשת הקשר אמרה שזה טוב כי המטרה היא לפתוח להם את הערב!',
    name: 'טרייד מוביל',
    role: '',
  },
  {
    quote: 'שמע זה מטורף אחי, שבכל כך קצת זמן אני אישית עברתי שינוי משמעותי מאוד שרק עכשיו אני מתחיל להבין אותו לגבי המשך החיים ובכללי לצבא. באמת אחי עשית משהו מטורף שתדע. חייב להגיד לך שגם היום שינית לי את החשיבה בטירוף ואת כל הגישה הפיקודית שלי.',
    name: 'בה"ד 1, קורס קצינים',
    role: '',
  },
  {
    quote: 'הייתה סדנה מעולה, אנשי הקבע ממש עפו על הסדנה — גם על איך שהעבירו וגם על התכנים. הכל היה מעולה, לא הפסיקו לדבר על הסדנה.',
    name: 'לינוי מבסיס רמון, קורס כניסה נגדים',
    role: '',
  },
];

export default function TestimonialCarousel() {
  const [all, setAll]         = useState<Testimonial[]>(staticTestimonials);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetch('/api/feedback')
      .then(r => r.json())
      .then((data: { open_text?: string; name?: string; org?: string; rating_enjoy?: number; rating_clarity?: number; rating_tools?: number }[]) => {
        const dynamic: Testimonial[] = data
          .filter(d => d.open_text?.trim())
          .map(d => ({
            quote:   d.open_text!.trim(),
            name:    d.name?.trim() || '',
            role:    d.org?.trim()  || '',
            ratings: { enjoy: d.rating_enjoy, clarity: d.rating_clarity, tools: d.rating_tools },
          }));
        if (dynamic.length > 0) setAll([...staticTestimonials, ...dynamic]);
      })
      .catch(() => {/* keep static */});
  }, []);

  const goTo = useCallback((index: number, total: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((index + total) % total);
      setVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo(current + 1, all.length);
    }, 25000);
    return () => clearInterval(interval);
  }, [current, goTo, all.length]);

  const t = all[current];
  const innerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0.6);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0) setRatio(height / width);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const blob =
    ratio < 0.45 ? '45% 55% 50% 50% / 40% 50% 50% 45%' :
    ratio < 0.65 ? '38% 62% 44% 56% / 42% 38% 58% 50%' :
    ratio < 0.85 ? '30% 70% 38% 62% / 38% 30% 65% 55%' :
                   '25% 75% 32% 68% / 35% 25% 60% 55%';

  return (
    <div
      ref={innerRef}
      className="text-center bg-primary/65 backdrop-blur-sm px-5 md:px-14 pt-10 md:pt-24 pb-8 md:pb-12"
      style={{ borderRadius: blob, transition: 'border-radius 0.8s ease' }}
    >
      {/* Quote */}
      <div className="transition-opacity duration-400" style={{ opacity: visible ? 1 : 0, minHeight: '120px' }}>
        <blockquote className="text-base md:text-xl text-white leading-relaxed font-medium mb-6 italic">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        {t.name && <p className="text-white/90 font-bold text-lg">{t.name}</p>}
        {t.role && <p className="text-white/60 text-sm mt-1">{t.role}</p>}
        {t.ratings && (t.ratings.enjoy || t.ratings.clarity || t.ratings.tools) && (
          <div className="flex justify-center gap-4 mt-3 text-white/70 text-xs">
            {t.ratings.enjoy    && <span>הנאה {t.ratings.enjoy}/5</span>}
            {t.ratings.clarity  && <span>דיוק {t.ratings.clarity}/5</span>}
            {t.ratings.tools    && <span>כלים {t.ratings.tools}/5</span>}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => goTo(current - 1, all.length)}
          className="w-10 h-10 rounded-full border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
          aria-label="הקודם"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {all.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, all.length)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1, all.length)}
          className="w-10 h-10 rounded-full border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
          aria-label="הבא"
        >
          ›
        </button>
      </div>
    </div>
  );
}
