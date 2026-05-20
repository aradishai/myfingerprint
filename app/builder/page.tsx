import FingerprintBuilder from '@/components/FingerprintBuilder';

export const metadata = {
  title: 'חותם בעולם | ערד ישי',
  description: 'גלה מהי הייחודיות שלך בעולם',
};

export default function BuildPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream">
      <section className="py-6 scroll-fade">
        <div className="max-w-6xl mx-auto px-6">
          <FingerprintBuilder />
        </div>
      </section>
    </div>
  );
}
