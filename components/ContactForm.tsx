'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch('https://formspree.io/f/xnjwekjp', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card text-center py-12">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-xl font-semibold text-primary">ההודעה נשלחה!</p>
        <p className="text-text-muted mt-2">נתראה בקרוב!</p>
      </div>
    );
  }

  return (
    <form className="card space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">שם פרטי</label>
          <input name="שם פרטי" type="text" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">שם משפחה</label>
          <input name="שם משפחה" type="text" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-primary mb-2">אימייל</label>
        <input name="אימייל" type="email" required className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-primary mb-2">משהו שהייתם רוצים להגיד לנו?</label>
        <textarea name="הודעה" rows={5} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-primary mb-3">מועד מועדף לפגישת היכרות</label>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-muted mb-1">תאריך</label>
            <input
              name="תאריך מועדף"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors text-right"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1">שעה</label>
            <select
              name="שעה מועדפת"
              className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors text-right"
            >
              <option value="">בחר שעה</option>
              {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-60">
        {loading ? 'שולח...' : 'שלח'}
      </button>
      <p className="text-center text-text-muted text-sm">יד לבנים 23, תל אביב</p>
    </form>
  );
}
