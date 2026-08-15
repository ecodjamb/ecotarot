import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import './extra.css';

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500','600','700'], display: 'swap' });
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ecotarot.vercel.app'),
  title: { default: 'EcoTarot — Numerología, astrología y tarot', template: '%s · EcoTarot' },
  description: 'Una lectura integrada de numerología, astrología solar y tarot para hoy, la semana y el mes.',
  applicationName: 'EcoTarot',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  appleWebApp: { capable: true, title: 'EcoTarot', statusBarStyle: 'black-translucent' },
  openGraph: {
    title: 'EcoTarot — Tu mapa, tu momento',
    description: 'Numerología, astrología y tarot integrados en una sola lectura personal.',
    type: 'website',
    locale: 'es_CL',
    siteName: 'EcoTarot',
  },
  twitter: { card: 'summary', title: 'EcoTarot', description: 'Tu mapa. Tu momento. Una lectura, tres señales.' },
};

export const viewport: Viewport = {
  themeColor: '#090817',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
