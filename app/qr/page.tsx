'use client';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

const SITE_URL = 'https://myfingerprint-production.up.railway.app';

export default function QRPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, SITE_URL, {
      width: 800,
      margin: 3,
      color: { dark: '#52C47A', light: '#FFFEF5' },
    }, () => setReady(true));
  }, []);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'חותם-בעולם-QR.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center pt-24 pb-16 px-6">
      <h1 className="text-3xl font-extrabold text-primary mb-2 text-center">QR לאתר</h1>
      <p className="text-text-muted mb-8 text-center">הורד ברזולוציה גבוהה להדפסה על חולצה</p>

      <div className="bg-cream rounded-3xl p-6 shadow-lg border border-border mb-8">
        <canvas ref={canvasRef} className="rounded-xl" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <button
        onClick={handleDownload}
        disabled={!ready}
        className="bg-primary text-white px-10 py-3 rounded-full font-bold text-base hover:opacity-90 transition-all disabled:opacity-40 shadow-md"
      >
        הורד לחולצה ⬇
      </button>
      <p className="text-text-muted text-xs mt-4">{SITE_URL}</p>
    </div>
  );
}
