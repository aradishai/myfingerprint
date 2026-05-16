import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  verification: { google: 'AWW5Ta_W2Mwpy7_q8V_63MgHO0l8HPSv52yuxrRXfo4' },
  title: 'חותם בעולם | ערד ישי',
  description: 'ערד ישי — מאמן אישי, מרצה ומנחה סדנאות בנושאי זהות, אחריות ומשמעות. תהליכים אישיים וסדנאות קבוצתיות לגילוי הייחודיות שלך.',
  keywords: 'ערד ישי, אימון אישי, סדנאות, הרצאות, חותם בעולם, זהות, משמעות, פיתוח אישי, מאמן אישי',
  openGraph: {
    title: 'חותם בעולם | ערד ישי',
    description: 'סדנאות | הרצאות | ליווי אישי',
    url: 'https://myfingerprint-production.up.railway.app',
    siteName: 'חותם בעולם',
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
