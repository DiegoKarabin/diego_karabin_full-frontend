import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} Music`,
  description: 'Find and save your favorite music',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased font-montserrat ${montserrat.className}`}>
        <Providers>
          <main className="min-h-screen bg-[#171717] text-white">
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
