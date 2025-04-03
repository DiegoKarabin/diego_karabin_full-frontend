'use client';

import AlbumCard from '@/components/commons/AlbumCard';
import type { SpotifyAlbum } from '@/types/spotify';

interface AlbumsGridProps {
  albums: SpotifyAlbum[];
  savedStatuses: Record<string, boolean>;
  onDeleteAlbum?: () => void;
}

export default function AlbumsGrid({ albums, savedStatuses, onDeleteAlbum }: AlbumsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          name={album.name}
          releaseDate={album.releaseDate}
          imageUrl={album.images?.[0]?.url}
          isSaved={savedStatuses[album.id] ?? false}
          onDeleteAlbum={onDeleteAlbum}
        />
      ))}
    </div>
  );
}
