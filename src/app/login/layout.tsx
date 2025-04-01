import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Login | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Sign in to save your favorite albums.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
