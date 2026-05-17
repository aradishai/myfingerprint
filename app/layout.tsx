import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollFade from '@/components/ScrollFade';

export const metadata: Metadata = {
  verification: { google: 'AWW5Ta_W2Mwpy7_q8V_63MgHO0l8HPSv52yuxrRXfo4' },
  title: 'חותם בעולם | ערד ישי',
  description: 'סדנאות | הרצאות | ליווי אישי. אני מאמין שלכל אדם יש ייחודיות, ערכים וייעוד שהוא יכול וצריך לממש — בואו נגלה יחד את טביעת האצבע שלכם.',
  keywords: 'ערד ישי, אימון אישי, סדנאות, הרצאות, חותם בעולם, זהות, משמעות, פיתוח אישי, מאמן אישי',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: 'חותם בעולם | ערד ישי',
    description: 'סדנאות | הרצאות | ליווי אישי',
    url: 'https://myfingerprint-production.up.railway.app',
    siteName: 'חותם בעולם | ערד ישי',
    locale: 'he_IL',
    type: 'website',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'ערד ישי',
  url: 'https://myfingerprint-production.up.railway.app',
  image: 'https://myfingerprint-production.up.railway.app/profile.jpg',
  jobTitle: 'מאמן אישי, מרצה ומנחה סדנאות',
  description: 'סדנאות | הרצאות | ליווי אישי',
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-bg text-text-main">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollFade />
      </body>
    </html>
  );
}
