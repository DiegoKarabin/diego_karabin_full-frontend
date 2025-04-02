'use client';

import { SpotifyArtist } from '@/types/spotify';
import SearchResultsGrid from '@/components/search/SearchResultsGrid';

interface SearchResultsSectionProps {
  artistName: string;
  results: SpotifyArtist[];
}

export default function SearchResultsSection({
  artistName,
  results,
}: SearchResultsSectionProps) {
  if (!artistName) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Guarda tus álbumes favoritos de {artistName}
      </h2>
      <SearchResultsGrid results={results} />
    </div>
  );
}
