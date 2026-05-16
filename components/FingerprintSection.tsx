'use client';
import { useState } from 'react';
import FingerprintInteractive, { regions } from './FingerprintInteractive';

export default function FingerprintSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = regions.find(r => r.id === hovered);

  return (
    <div className="flex flex-col items-center">
      <FingerprintInteractive hovered={hovered} onHover={setHovered} />
      <div className="h-20 flex flex-col items-center justify-center text-center mt-4">
        {active ? (
          <>
            <p className="text-primary font-bold text-lg mb-1">{active.label}</p>
            <p className="text-text-main font-semibold text-2xl leading-snug">{active.question}</p>
          </>
        ) : (
          <p className="text-text-muted text-sm">העבר את העכבר על הטביעה לגילוי</p>
        )}
      </div>
    </div>
  );
}
