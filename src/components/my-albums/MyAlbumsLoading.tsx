import AlbumsGridSkeleton from '@/components/commons/AlbumsGridSkeleton';
import { DEFAULT_MY_ALBUMS_LIMIT } from '@/lib/constants';

export default function MyAlbumsLoading() {
  return (
    <div className="mt-8">
      <AlbumsGridSkeleton albumsCount={DEFAULT_MY_ALBUMS_LIMIT} />
    </div>
  );
}
