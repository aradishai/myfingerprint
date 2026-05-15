'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

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
    <form className="card space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">שם פרטי</label>
          <input type="text" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">שם משפחה</label>
          <input type="text" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-primary mb-2">אימייל</label>
        <input type="email" className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-primary mb-2">משהו שהייתם רוצים להגיד לנו?</label>
        <textarea rows={5} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
      </div>
      <button type="submit" className="btn-primary w-full py-4 text-base">שלח</button>
    </form>
  );
}
