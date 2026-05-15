'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Formspree / email service
    setSent(true);
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-bl from-surface to-bg text-center">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-accent font-semibold text-sm tracking-widest uppercase">צור קשר</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mt-4 mb-6">
            בואו נדבר
          </h1>
          <p className="text-xl text-text-muted">
            פגישת היכרות ראשונה — ללא עלות, ללא התחייבות. רק שיחה אמיתית.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          {sent ? (
            <div className="card text-center py-16">
              <div className="text-5xl mb-6">✓</div>
              <h2 className="text-2xl font-bold text-primary mb-4">ההודעה נשלחה!</h2>
              <p className="text-text-muted">אחזור אליך בהקדם. מחכה לדבר איתך.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">שם מלא *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-accent transition-colors"
                    placeholder="ישראל ישראלי"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">אימייל *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">טלפון</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-accent transition-colors"
                  placeholder="050-0000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">מה מביא אותך?</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="ספר לי קצת על מה שאתה מחפש..."
                />
              </div>

              <button type="submit" className="btn-primary w-full text-base py-4">
                שליחה ←
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
