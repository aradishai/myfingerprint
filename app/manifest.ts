import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'חותם בעולם',
    short_name: 'חותם בעולם',
    description: 'סדנאות | הרצאות | ליווי אישי',
    start_url: '/',
    display: 'standalone',
    background_color: '#52C47A',
    theme_color: '#52C47A',
    orientation: 'portrait',
    icons: [
      {
        src: '/pwa-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  };
}
