import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'חותם בעולם | ערד ישי';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const fontCss = await fetch(
    'https://fonts.googleapis.com/css2?family=Varela+Round&subset=hebrew',
    { headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' } }
  ).then((r) => r.text());

  const fontUrl = fontCss.match(/url\(([^)]+\.woff2[^)]*)\)/)?.[1];
  const fontData = fontUrl ? await fetch(fontUrl).then((r) => r.arrayBuffer()) : null;

  const logoUrl = 'https://myfingerprint-production.up.railway.app/logo.svg';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#52C47A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 64,
          direction: 'rtl',
          padding: '0 80px',
        }}
      >
        <img
          src={logoUrl}
          width={200}
          height={200}
          style={{ filter: 'brightness(0) invert(1)', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: '#FFFEF5',
              fontFamily: fontData ? 'VarelaRound' : 'sans-serif',
              lineHeight: 1.2,
            }}
          >
            חותם בעולם
          </div>
          <div
            style={{
              fontSize: 52,
              color: 'rgba(255,254,245,0.8)',
              fontFamily: fontData ? 'VarelaRound' : 'sans-serif',
              marginTop: 8,
            }}
          >
            ערד ישי
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: 'VarelaRound', data: fontData, style: 'normal' }] }
        : {}),
    }
  );
}
