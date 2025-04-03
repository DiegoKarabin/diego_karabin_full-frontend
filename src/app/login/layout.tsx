import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Login | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Accede a tu cuenta para guardar tus álbumes favoritos.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
