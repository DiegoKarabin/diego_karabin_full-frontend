import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: ISODateString;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt: number;
    error?: string;
  }
}
