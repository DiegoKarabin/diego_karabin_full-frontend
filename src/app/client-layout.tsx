'use client';

import { Toaster } from 'react-hot-toast';
import { Providers } from '@/app/providers';
import Header from '@/components/Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <main className="min-h-screen bg-[#171717] text-white">
          <Header />
          {children}
        </main>
      </Providers>
      <Toaster position="bottom-right" />
    </>
  );
}
