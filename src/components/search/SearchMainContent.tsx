'use client';

import { useSpotifySearch } from '@/hooks/useSpotifySearch';
import SearchBar from '@/components/search/SearchBar';
import SearchResultsSection from '@/components/search/SearchResultsSection';
import Pagination from '@/components/commons/Pagination';
import SearchTitle from '@/components/search/SearchTitle';
import SearchResultsLoading from '@/components/search/SearchResultsLoading';
import { useEffect } from 'react';
import { DEFAULT_SEARCH_LIMIT } from '@/lib/constants';
import { useCheckSavedAlbums } from '@/hooks/useCheckSavedAlbums';
interface SearchMainContentProps {
  initialQuery: string;
  initialPage: string;
}

export default function SearchMainContent({ initialQuery, initialPage }: SearchMainContentProps) {
  const {
    query,
    albums,
    isLoading,
    error,
    pagination,
    handlePageChange,
    handleSearch,
  } = useSpotifySearch();

  const { check, savedStatuses, isChecking } = useCheckSavedAlbums();

  useEffect(() => {
    if (initialQuery) {
      const formData = new FormData();
      const numberPage = Number(initialPage) || 1;
      const limit = DEFAULT_SEARCH_LIMIT;
      const offset = (numberPage - 1) * limit;

      formData.set('query', initialQuery);
      formData.set('limit', limit.toString());
      formData.set('offset', offset.toString());

      handleSearch(formData);
    }
  }, [initialQuery, initialPage, handleSearch]);

  useEffect(() => {
    if (albums.length) {
      check(albums.map(album => album.id));
    }
  }, [albums, check]);

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mt-7 md:mt-12 lg:mt-16">
      <SearchTitle />

      <SearchBar initialQuery={initialQuery} />

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isLoading || isChecking ? (
        <SearchResultsLoading artistName={query} />
      ) : albums.length > 0 && (
        <>
          <SearchResultsSection
            artistName={query}
            results={albums}
            savedStatuses={savedStatuses}
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
