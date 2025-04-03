import AlbumsGrid from '@/components/commons/AlbumsGrid';
import { SpotifyAlbum } from '@/types/spotify';
interface MyAlbumsGridProps {
  albums: SpotifyAlbum[];
}

export default function MyAlbumsGrid({ albums }: MyAlbumsGridProps) {
  const savedStatuses = albums.reduce((acc, album) => {
    acc[album.id] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const onDeleteAlbum = () => {
    window.location.reload();
  };

  return (
    <div className="mt-8">
      <AlbumsGrid
        albums={albums}
        savedStatuses={savedStatuses}
        onDeleteAlbum={onDeleteAlbum}
      />
    </div>
  )
}
