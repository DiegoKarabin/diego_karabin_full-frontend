'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  const handleSpotifyLogin = () => {
    signIn('spotify', { callbackUrl: '/search' });
  };

  return (
    <div className="h-[calc(100vh-87px)] flex items-start lg:items-center justify-center p-[43px] sm:p-[88px] lg:p-8">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Logo Column */}
        <div className="flex justify-center sm:justify-start lg:justify-end">
          <div className="relative w-[222px] h-[222px] sm:w-[318px] sm:h-[318px] lg:w-[464px] lg:h-[464.5px]">
            <Image
              src="/arrow-logo.svg"
              alt={`${process.env.NEXT_PUBLIC_APP_NAME} Logo`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="min-h-full flex flex-col items-start space-y-8">
          <div className="space-y-4 text-left">
            <h1 className="text-3xl sm:text-6xl font-bold">
              Disfruta de la
              <br />
              <span className="text-[#D6F379]">mejor música</span>
            </h1>
            <p className="text-sm sm:text-base pt-[36px]">
              Accede a tu cuenta para guardar tus <br />
              álbumes favoritos.
            </p>
          </div>

          <button
            onClick={handleSpotifyLogin}
            className="flex items-center space-x-2 active:bg-[#D6F379] hover:bg-[#D6F379] active:text-black hover:text-black mt-[96px] px-6 py-3 rounded-full font-medium cursor-pointer transition-colors"
            type="button"
          >
            <span>Log in con Spotify</span>
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 5L21 12M21 12L14 19M21 12H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
