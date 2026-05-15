'use client';
import { useRef } from 'react';

const books = [
  '11 אליפויות.jpg',
  '21 מחשבות על המאה ה21.png',
  '4000 שבועות.jpg',
  'אותנטיות קיומית בתיאוריה ובמעשה.jpg',
  'אחריות וניצחון.jpg',
  'אין מקום רחוק מידי.jpg',
  'איקיגאי.webp',
  'בלתי שביר.webp',
  'גריט.png',
  'האדם מחפש.webp',
  'האושר שבמנהיגות.png',
  'האלכימאי.webp',
  'האסטרטגייה שניצחה את הארנב.jpg',
  'הבחורים בסירה.jpg',
  'ההרצאה האחרונה.jpg',
  'היום השמיני.jpg',
  'המשמעות מחפשת אדם.jpg',
  'הצופן הקבוצתי.jpg',
  'הקשת.jpg',
  'הרגלים אטומים.jpg',
  'השאיפה למשמעות.jpg',
  'חזרה בלי תשובה.jpg',
  'חכמים יותר מהירים יותר טובים יותר.jpg',
  'טד. עמידה מול קהל.jpg',
  'ימי שלישי עם מורי.jpg',
  'יש ממי ללמוד.webp',
  'כוח רצון.avif',
  'כוחה של זהות.jpg',
  'כוחה של שיחה.jpg',
  'כוחו של הרגל.webp',
  'כן לחיים למרות הכל.jpg',
  'כן.jpg',
  'כשהחרדים יהיו הרוב.webp',
  'להתחיל עם הלמה.jpg',
  'ליצור את סיפור חייך.jpg',
  'למה שהעם יבחר את השופטים.jpg',
  'לצאת מהמבוך.jpg',
  'לקפוץ למים.jpg',
  'לרפא עולם שבור.webp',
  'מה אנחנו רוצים באמת.jpg',
  'מה זה משנה.jpg',
  'מהפכת הקשב.webp',
  'מוטיבציה.jpg',
  'מיוחדים.jpg',
  'מישהו ראה כאן גורילה.png',
  'מעשה מנהיגות.png',
  'מצויינים.jpg',
  'מרחבים בניהול עצמי.jpg',
  'משמעות החיים סוקרטס ישו ניטשה.webp',
  'נעליים גדולות.webp',
  'נקודת מפנה.webp',
  'סדר את המיטה שלך.jpg',
  'סטיב ג\'ובס.jpg',
  'עיצוב התודעה.jpg',
  'עכשיו גלה את חוזקותייך.jpg',
  'פורחים מאוחר.jpg',
  'פשוט להאמין.jpg',
  'תחשבו שוב.jpg',
  'תלמידים מחפשים משמעות.jpg',
  'תן וקח.jpg',
];

export default function BookCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'right' | 'left') => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="section-title text-center mb-10">ספרים שהשפיעו עליי</h2>

        <div className="relative">
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:opacity-90 transition-all"
          >
            ›
          </button>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:opacity-90 transition-all"
          >
            ‹
          </button>

          <div
            ref={ref}
            className="flex gap-4 overflow-x-auto scroll-smooth px-10 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {books.map((book) => (
              <div key={book} className="flex-shrink-0">
                <img
                  src={`/books/${encodeURIComponent(book)}`}
                  alt={book.replace(/\.[^.]+$/, '')}
                  className="h-48 w-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
