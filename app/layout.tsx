import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import './extra.css';

const display = Cormorant_Garamond({subsets:['latin'], variable:'--font-display', weight:['500','600','700']});
const sans = Manrope({subsets:['latin'], variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'EcoTarot — Numerología, astrología y tarot',
  description: 'Una lectura integrada de numerología, astrología solar y tarot para hoy, la semana y el mes.',
  applicationName: 'EcoTarot',
  appleWebApp: { capable: true, title: 'EcoTarot', statusBarStyle: 'black-translucent' },
  manifest: '/manifest.webmanifest',
};
export const viewport: Viewport = { themeColor: '#090817', colorScheme: 'dark', width:'device-width', initialScale:1 };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="es"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
