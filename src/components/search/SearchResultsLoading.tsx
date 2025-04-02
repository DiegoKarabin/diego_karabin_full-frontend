import ArtistCardSkeleton from '@/components/ArtistCardSkeleton';

export default function SearchResultsLoading({ artistName }: { artistName: string }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Buscando resultados para &ldquo;{artistName}&rdquo;
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <ArtistCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
