'use client';

import { useSpotifySearch } from '@/hooks/useSpotifySearch';
import SearchBar from '@/components/search/SearchBar';
import SearchResultsSection from '@/components/search/SearchResultsSection';
import Pagination from '@/components/commons/Pagination';
import { useEffect } from 'react';
import SearchTitle from '@/components/search/SearchTitle';
import SearchResultsLoading from '@/components/search/SearchResultsLoading';

interface SearchMainContentProps {
  initialQuery: string;
  initialPage: string;
}

export default function SearchMainContent({ initialQuery, initialPage }: SearchMainContentProps) {
  const {
    query,
    results,
    handleSearch,
    isLoading,
    error,
    pagination,
    handlePageChange,
  } = useSpotifySearch();

  useEffect(() => {
    if (initialQuery) {
      const numberPage = initialPage ? Number(initialPage) : 1;
      const page = numberPage < 1 ? 1 : numberPage;
      const offset = (page - 1) * 4;
      const formData = new FormData();
      formData.append('query', initialQuery);
      formData.append('offset', offset.toString());
      formData.append('limit', '4');
      handleSearch(formData);
    }
  }, [initialQuery, initialPage, handleSearch]);

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mt-7 md:mt-12 lg:mt-16">
      <SearchTitle />

      <SearchBar initialQuery={initialQuery} />

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <SearchResultsLoading artistName={query} />
      ) : results.length > 0 && (
        <>
          <SearchResultsSection
            artistName={query}
            results={results}
          />

          <Pagination
            paginationData={pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
