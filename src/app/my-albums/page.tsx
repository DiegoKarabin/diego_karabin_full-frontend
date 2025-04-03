import { Suspense } from 'react';
import { Metadata } from 'next';
import FullPageLoader from '@/components/FullPageLoader';
import MyAlbumsMainContent from '@/components/my-albums/MyAlbumsMainContent';

export const metadata: Metadata = {
  title: `Mis Álbumes | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Mira tus álbumes guardados.',
};

interface MyAlbumsPageProps {
  searchParams: {
    page: string;
  };
}

export default function MyAlbumsPage({ searchParams: { page } }: MyAlbumsPageProps) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <MyAlbumsMainContent initialPage={page} />
    </Suspense>
  );
}
