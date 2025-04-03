'use client';

import { SpotifyAlbum } from '@/types/spotify';
import AlbumsGrid from '@/components/commons/AlbumsGrid';

interface SearchResultsSectionProps {
  artistName: string;
  results: SpotifyAlbum[];
  savedStatuses: Record<string, boolean>;
}

export default function SearchResultsSection({
  artistName,
  results,
  savedStatuses,
}: SearchResultsSectionProps) {
  if (!artistName) return null;

  return (
    <div className="mt-8">
      <p className="mb-6">
        Guarda tus álbumes favoritos de {artistName}
      </p>
      <AlbumsGrid albums={results} savedStatuses={savedStatuses}/>
    </div>
  );
}
