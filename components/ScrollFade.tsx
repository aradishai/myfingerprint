'use client';
import { useEffect } from 'react';

export default function ScrollFade() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
