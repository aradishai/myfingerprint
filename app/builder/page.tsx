import FingerprintBuilder from '@/components/FingerprintBuilder';

export const metadata = {
  title: 'בנה את טביעת האצבע שלך | חותם בעולם',
  description: 'גלה מהי הייחודיות שלך בעולם',
};

export default function BuildPage() {
  return (
    <div className="pt-24 min-h-screen bg-cream">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">בנה את טביעת האצבע שלך</h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              ענה על השאלות בסדר שבא לך — גם חלקית. הטביעה שלך תיבנה בזמן אמת.
            </p>
          </div>
          <FingerprintBuilder />
        </div>
      </section>
    </div>
  );
}
