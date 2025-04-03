import { Metadata } from 'next';
import { Suspense } from 'react';
import FullPageLoader from '@/components/FullPageLoader';
import SearchMainContent from '@/components/search/SearchMainContent';

export const metadata: Metadata = {
  title: `Search Artists | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: 'Search and find your favorite artists.',
};

interface SearchPageProps {
  searchParams: {
    q: string;
    page: string;
  };
}

export default function SearchPage(
  {
    searchParams: {
      q: initialQuery,
      page: initialPage,
    },
  }: SearchPageProps
) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <SearchMainContent
        initialQuery={initialQuery}
        initialPage={initialPage}
      />
    </Suspense>
  );
}
