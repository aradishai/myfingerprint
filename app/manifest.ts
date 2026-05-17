import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'חותם בעולם | ערד ישי',
    short_name: 'חותם בעולם',
    description: 'סדנאות | הרצאות | ליווי אישי',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#52C47A',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo-small.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-small.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
