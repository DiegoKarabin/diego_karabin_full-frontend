'use client';

import ArtistCard from '@/components/ArtistCard';
import type { SpotifyArtist } from '@/types/spotify';

interface SearchResultsGridProps {
  results: SpotifyArtist[];
}

export default function SearchResultsGrid({ results }: SearchResultsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {results.map((result) => {
        console.log(result);

        return (
        <ArtistCard
          key={result.id}
          id={result.id}
          name={result.name}
          followers={result.followers.total}
          imageUrl={result.images?.[0]?.url}
        />
      );})}
    </div>
  );
}
