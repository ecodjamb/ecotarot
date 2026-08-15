import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({subsets:['latin'], variable:'--font-display', weight:['500','600','700']});
const sans = Manrope({subsets:['latin'], variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'EcoTarot — Tu mapa interior',
  description: 'Tarot, astrología y numerología integrados en una guía personal diaria, semanal y mensual.',
  applicationName: 'EcoTarot',
};
export const viewport: Viewport = { themeColor: '#090817', colorScheme: 'dark' };

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="es"><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
