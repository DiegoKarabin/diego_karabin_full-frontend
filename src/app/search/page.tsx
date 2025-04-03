import { Metadata } from 'next';
import { Suspense } from 'react';
import { PageProps } from '@/types/next-dynamic-pages';
import FullPageLoader from '@/components/FullPageLoader';
import SearchMainContent from '@/components/search/SearchMainContent';

export const metadata: Metadata = {
  title: `Buscar Álbumes | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Busca los álbumes de tus artistas favoritos.',
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page } = await searchParams;

  return (
    <Suspense fallback={<FullPageLoader />}>
      <SearchMainContent
        initialQuery={q as string}
        initialPage={page as string}
      />
    </Suspense>
  );
}
