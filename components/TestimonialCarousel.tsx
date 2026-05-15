'use client';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
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
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((index + testimonials.length) % testimonials.length);
      setVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo(current + 1);
    }, 25000);
    return () => clearInterval(interval);
  }, [current, goTo]);

  const t = testimonials[current];

  return (
    <div className="text-center bg-primary/65 backdrop-blur-sm px-10 py-10" style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%' }}>
      {/* Quote */}
      <div className="transition-opacity duration-400" style={{ opacity: visible ? 1 : 0, minHeight: '200px' }}>
        <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-medium mb-6 italic">
          "{t.quote}"
        </blockquote>
        <p className="text-white/90 font-bold text-lg">{t.name}</p>
        {t.role && <p className="text-white/60 text-sm mt-1">{t.role}</p>}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={() => goTo(current - 1)}
          className="w-10 h-10 rounded-full border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
          aria-label="הקודם"
        >
          ‹
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          className="w-10 h-10 rounded-full border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
          aria-label="הבא"
        >
          ›
        </button>
      </div>
    </div>
  );
}
