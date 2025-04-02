import { Metadata } from 'next';
import { Suspense } from 'react';
import FullPageLoader from '@/components/FullPageLoader';
import SearchMainContent from '@/components/search/SearchMainContent';

export const metadata: Metadata = {
  title: 'Search Artists | Aluxion',
  description: 'Search and find your favorite artists.',
};

export default function SearchPage({ searchParams }: { searchParams: { q: string, page: string } }) {
  const initialQuery = searchParams.q;
  const initialPage = searchParams.page;

  return (
    <Suspense fallback={<FullPageLoader />}>
      <SearchMainContent initialQuery={initialQuery} initialPage={initialPage} />
    </Suspense>
  );
}
