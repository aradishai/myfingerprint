'use client';
import { useState } from 'react';
import FingerprintBuilder from '@/components/FingerprintBuilder';
import VerbDiscovery from '@/components/VerbDiscovery';

const tabs = [
  { id: 'fingerprint', label: 'טביעת האצבע' },
  { id: 'verbs', label: 'שמות הפועל שלי' },
];

export default function BuildPage() {
  const [activeTab, setActiveTab] = useState<'fingerprint' | 'verbs'>('fingerprint');

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <section className="py-6">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-200 ${
                  activeTab === t.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white border border-primary text-primary hover:bg-primary/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'fingerprint' && <FingerprintBuilder />}
          {activeTab === 'verbs' && (
            <div className="bg-cream rounded-3xl p-4 md:p-8">
              <VerbDiscovery />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
