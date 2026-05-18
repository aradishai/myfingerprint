'use client';
import { useState, useEffect, useCallback } from 'react';

type Testimonial = { quote: string; name: string; role: string; date?: string; ratings?: { enjoy?: number; clarity?: number; tools?: number } };

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

  const goTo = useCallback((index: number, total: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((index + total) % total);
      setVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => goTo(current + 1, all.length), 25000);
    return () => clearInterval(interval);
  }, [current, goTo, all.length]);

  const t = all[current];

  return (
    <div className="w-full">
      {/* Card */}
      <div
        className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-8 md:px-14 py-10 md:py-12 text-center transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Big quote mark */}
        <p className="text-7xl text-primary/20 font-serif leading-none mb-2 select-none">"</p>

        <blockquote className="text-lg md:text-2xl text-text-main leading-relaxed font-bold mb-6 italic">
          {t.quote}
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

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => goTo(current - 1, all.length)}
          className="w-10 h-10 rounded-full border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
          aria-label="הקודם"
        >‹</button>

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
        >›</button>
      </div>
    </div>
  );
}
