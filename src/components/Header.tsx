'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import NavLink from './NavLink';
import Image from 'next/image';
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
      <Link href="/" className="text-md uppercase font-medium block sm:hidden">
        {process.env.NEXT_PUBLIC_APP_NAME?.split(' ').map((word) => word[0]).join('')}
      </Link>
      <Link href="/" className="text-md uppercase font-medium hidden sm:block">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Link>

      {session && (
        <nav className="flex items-stretch gap-3 md:gap-10 text-sm">
          <NavLink href="/search">Buscar</NavLink>
          <NavLink href="/my-albums">Mis álbumes</NavLink>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="hidden md:block text-white hover:text-gray-400 transition-colors border-l-1 border-white sm:pl-10"
          >
            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </button>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="block md:hidden text-white hover:text-gray-400 transition-colors border-l-1 border-white pl-3 md:px-10"
          >
            <Image
              width={24}
              height={18}
              src="/logout.svg"
              alt="Logout"
              className="object-contain"
              priority
            />
          </button>

          <button
            className="text-center text-white hover:text-gray-400 transition-colors border-l-1 border-white pl-3 md:pl-10 lg:hidden"
          >
            <Image
              width={24}
              height={24}
              src="/sun.svg"
              alt="Light mode"
              className="object-contain"
              priority
            />
          </button>
        </nav>
      )}
    </header>
  );
}
