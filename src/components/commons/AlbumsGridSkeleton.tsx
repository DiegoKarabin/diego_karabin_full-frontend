import AlbumCardSkeleton from '@/components/commons/AlbumCardSkeleton';

interface AlbumsGridSkeletonProps {
  albumsCount: number;
}

export default function AlbumsGridSkeleton({ albumsCount }: AlbumsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: albumsCount }).map((_, index) => (
        <AlbumCardSkeleton key={index} />
      ))}
    </div>
  );
}
