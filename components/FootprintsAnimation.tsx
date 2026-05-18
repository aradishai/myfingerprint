'use client';
import { useEffect, useState } from 'react';

type Print = { id: number; x: number; y: number; size: number; rotation: number; delay: number };

function FingerprintSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="8"  stroke="white" strokeWidth="3" fill="none" opacity="0.9"/>
      <path d="M 50 34 A 16 16 0 0 1 66 50 A 16 16 0 0 1 50 66 A 16 16 0 0 1 34 50 A 16 16 0 0 1 50 34" stroke="white" strokeWidth="3" fill="none" opacity="0.9"/>
      <path d="M 50 22 A 28 28 0 0 1 78 50 A 28 28 0 0 1 50 78 A 28 28 0 0 1 22 50 A 28 28 0 0 1 50 22" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="60 28" opacity="0.8"/>
      <path d="M 50 10 A 40 40 0 0 1 90 50 A 40 40 0 0 1 50 90 A 40 40 0 0 1 10 50 A 40 40 0 0 1 50 10" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="80 46" opacity="0.7"/>
      <path d="M 50 2 A 48 48 0 0 1 98 50 A 48 48 0 0 1 50 98 A 48 48 0 0 1 2 50 A 48 48 0 0 1 50 2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="90 62" opacity="0.5"/>
    </svg>
  );
}

let uid = 0;

export default function FootprintsAnimation() {
  const [prints, setPrints] = useState<Print[]>([]);

  useEffect(() => {
    function spawn() {
      const print: Print = {
        id:       uid++,
        x:        5 + Math.random() * 88,
        y:        5 + Math.random() * 88,
        size:     32 + Math.floor(Math.random() * 40),
        rotation: Math.random() * 360,
        delay:    0,
      };
      setPrints(prev => [...prev, print]);
      setTimeout(() => {
        setPrints(prev => prev.filter(p => p.id !== print.id));
      }, 4000);
    }

    spawn();
    const interval = setInterval(spawn, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {prints.map(p => (
        <div
          key={p.id}
          className="absolute footprint-step"
          style={{
            left:      `${p.x}%`,
            top:       `${p.y}%`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            opacity:   0,
          }}
        >
          <FingerprintSVG size={p.size} />
        </div>
      ))}
    </div>
  );
}
