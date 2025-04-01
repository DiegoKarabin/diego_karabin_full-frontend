'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

interface Album {
  id: string;
  name: string;
  imageUrl: string;
  publishedDate: string;
  isAddButton?: boolean;
}

interface ArtistAlbums {
  artistName: string;
  albums: Album[];
}

export default function MyAlbumsPage() {
  const { data: session } = useSession();
  const [artistAlbums, setArtistAlbums] = useState<ArtistAlbums[]>([
    {
      artistName: 'Nirvana',
      albums: [
        {
          id: '1',
          name: '{albumName}',
          imageUrl: '/placeholder.jpg',
          publishedDate: '{publishedDate}',
        },
        {
          id: '2',
          name: '{albumName}',
          imageUrl: '/placeholder.jpg',
          publishedDate: '{publishedDate}',
        },
      ],
    },
    {
      artistName: 'Metallica',
      albums: [
        {
          id: '3',
          name: '{albumName}',
          imageUrl: '/placeholder.jpg',
          publishedDate: '{publishedDate}',
        },
        {
          id: '4',
          name: '{albumName}',
          imageUrl: '/placeholder.jpg',
          publishedDate: '{publishedDate}',
        },
      ],
    },
  ]);

  const handleRemoveAlbum = async (artistName: string, albumId: string) => {
    try {
      // Implementation for removing album
      console.log('Removing album:', albumId, 'from artist:', artistName);
      const updatedArtistAlbums = artistAlbums.map(artistAlbumGroup => ({
        ...artistAlbumGroup,
        albums: artistAlbumGroup.albums.filter(album => album.id !== albumId)
      }));
      setArtistAlbums(updatedArtistAlbums);
    } catch (error) {
      console.error('Failed to remove album:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Mis albumes
          <span className="text-[#98FF98]"> guardados</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Disfruta de tu música a un solo click y descubre qué discos has guardado dentro de &quot;mis álbumes&quot;
        </p>
      </div>

      {/* Albums by Artist */}
      <div className="space-y-8">
        {artistAlbums.map((artistAlbumGroup) => (
          <div key={artistAlbumGroup.artistName}>
            <h2 className="text-xl font-semibold mb-4">{artistAlbumGroup.artistName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {artistAlbumGroup.albums.map((album) => (
                <div key={album.id} className="group relative">
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-900">
                    <Image
                      src={album.imageUrl}
                      alt={album.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity">
                      <button
                        onClick={() => handleRemoveAlbum(artistAlbumGroup.artistName, album.id)}
                        className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-sm font-medium rounded-full bg-red-500 hover:bg-red-600 transition-all"
                      >
                        Remove album
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium">{album.name}</h3>
                    <p className="text-sm text-gray-400">Published: {album.publishedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
