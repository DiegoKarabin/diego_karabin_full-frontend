'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="flex items-center justify-between p-[31.5px]">
      <Link href="/" className="text-md uppercase font-medium">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Link>

      {session && (
        <nav className="flex items-center gap-4 md:gap-6 lg:gap-8 text-sm">
          <Link
            href="/search"
            className="text-[#CCFF00]"
          >
            Buscar
          </Link>
          <Link
            href="/my-albums"
            className="text-gray-400 hover:text-white transition-colors"
          >
            My albums
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isLoggingOut ? 'Logging out...' : 'Cerrar sesión'}
          </button>
        </nav>
      )}
    </header>
  );
}
