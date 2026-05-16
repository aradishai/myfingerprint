import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'חותם בעולם | ערד ישי',
  description: 'מאמן מנטלי ומנחה — תהליכים אישיים וסדנאות קבוצתיות לגילוי הייחודיות שלך והחותם שלך בעולם.',
  keywords: 'אימון אישי, סדנאות, חותם בעולם, ערד ישי, פיתוח אישי',
  openGraph: {
    title: 'ערד ישי | My True Story',
    description: 'גלה את הסיפור האמיתי שלך',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-text-main">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
