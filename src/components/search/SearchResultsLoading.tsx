import AlbumsGridSkeleton from '@/components/commons/AlbumsGridSkeleton';
import { DEFAULT_SEARCH_LIMIT } from '@/lib/constants';

export default function SearchResultsLoading({ artistName }: { artistName: string }) {
  return (
    <div className="mt-8">
      <p className="mb-6">
        Buscando resultados para &ldquo;{artistName}&rdquo;
      </p>
      <AlbumsGridSkeleton albumsCount={DEFAULT_SEARCH_LIMIT} />
    </div>
  );
}
