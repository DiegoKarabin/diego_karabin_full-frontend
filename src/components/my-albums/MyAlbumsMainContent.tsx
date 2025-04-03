'use client';

import { useEffect } from 'react';
import Pagination from '@/components/commons/Pagination';
import MyAlbumsTitle from '@/components/my-albums/MyAlbumsTitle';
import MyAlbumsLoading from '@/components/my-albums/MyAlbumsLoading';
import MyAlbumsGrid from '@/components/my-albums/MyAlbumsGrid';
import { useSavedAlbums } from '@/hooks/useSavedAlbums';

interface MyAlbumsMainContentProps {
  initialPage: string;
}

export default function MyAlbumsMainContent({ initialPage }: MyAlbumsMainContentProps) {
  const {
    albums,
    isLoading,
    error,
    pagination,
    handlePageChange,
    fetchAlbums,
  } = useSavedAlbums();

  useEffect(() => {
    const numberPage = initialPage ? Number(initialPage) : 1;

    fetchAlbums(numberPage);
  }, [initialPage, fetchAlbums]);

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mt-7 md:mt-12 lg:mt-16">
      <MyAlbumsTitle />

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isLoading ? (
        <MyAlbumsLoading />
      ) : (
        <>
          <MyAlbumsGrid albums={albums} />

          <Pagination
            paginationData={pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
