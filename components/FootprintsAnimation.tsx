'use client';
import { useEffect, useState } from 'react';

type Foot = { id: number; x: number; y: number; rot: number; side: 'l' | 'r'; delay: number };

function FootSVG({ side }: { side: 'l' | 'r' }) {
  return (
    <svg
      width="20" height="28"
      viewBox="0 0 22 30"
      style={{ transform: side === 'l' ? 'scaleX(-1)' : 'none' }}
      fill="white"
    >
      <ellipse cx="11" cy="22" rx="9"   ry="8"   />
      <ellipse cx="3"  cy="10" rx="2.5" ry="3.5" />
      <ellipse cx="7"  cy="6"  rx="2.5" ry="3.5" />
      <ellipse cx="11" cy="4"  rx="2.5" ry="3.5" />
      <ellipse cx="15" cy="6"  rx="2"   ry="3"   />
      <ellipse cx="19" cy="9"  rx="1.5" ry="2.5" />
    </svg>
  );
}

let uid = 0;

export default function FootprintsAnimation() {
  const [feet, setFeet] = useState<Foot[]>([]);

  useEffect(() => {
    function spawnTrail() {
      const steps   = 5 + Math.floor(Math.random() * 5);
      const startX  = 5  + Math.random() * 80;
      const startY  = 10 + Math.random() * 75;
      const angle   = -40 + Math.random() * 80;
      const rad     = (angle * Math.PI) / 180;
      const strideX = Math.sin(rad) * 5;
      const strideY = -Math.cos(rad) * 6;

      const trail: Foot[] = Array.from({ length: steps }, (_, i) => {
        const side: 'l' | 'r' = i % 2 === 0 ? 'r' : 'l';
        const lateral = (side === 'r' ? 2 : -2);
        return {
          id:    uid++,
          x:     startX + i * strideX + lateral * Math.cos(rad),
          y:     startY + i * strideY + lateral * Math.sin(rad),
          rot:   angle + (side === 'l' ? -12 : 12),
          side,
          delay: i * 0.28,
        };
      });

      setFeet(prev => [...prev, ...trail]);

      const lifespan = steps * 280 + 3200;
      setTimeout(() => {
        const ids = new Set(trail.map(f => f.id));
        setFeet(prev => prev.filter(f => !ids.has(f.id)));
      }, lifespan);
    }

    spawnTrail();
    const interval = setInterval(spawnTrail, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {feet.map(f => (
        <div
          key={f.id}
          className="absolute footprint-step"
          style={{
            left:              `${f.x}%`,
            top:               `${f.y}%`,
            transform:         `rotate(${f.rot}deg)`,
            animationDelay:    `${f.delay}s`,
            opacity:           0,
          }}
        >
          <FootSVG side={f.side} />
        </div>
      ))}
    </div>
  );
}
