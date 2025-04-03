import { Suspense } from 'react';
import { Metadata } from 'next';
import { PageProps } from '@/types/next-dynamic-pages';
import FullPageLoader from '@/components/FullPageLoader';
import MyAlbumsMainContent from '@/components/my-albums/MyAlbumsMainContent';

export const metadata: Metadata = {
  title: `Mis Álbumes | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Mira tus álbumes guardados.',
};

export default async function MyAlbumsPage({ searchParams }: PageProps) {
  const { page } = await searchParams;

  return (
    <Suspense fallback={<FullPageLoader />}>
      <MyAlbumsMainContent initialPage={page as string} />
    </Suspense>
  );
}
