'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import AddAlbumButton from '@/components/AddAlbumButton';

interface Album {
  id: string;
  name: string;
  imageUrl: string;
  publishedDate: string;
  isAddButton?: boolean;
}

interface Artist {
  name: string;
  followers: number;
  monthlyListeners: number;
}

export default function ArtistPage() {
  const { data: session } = useSession();
  const [artist, setArtist] = useState<Artist>({
    name: '{artistName}',
    followers: 0,
    monthlyListeners: 0,
  });

  const [albums, setAlbums] = useState<Album[]>([
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
      isAddButton: true,
    },
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
  ]);

  const handleAddAlbum = async (albumId: string) => {
    try {
      // Implementation for adding album
      console.log('Adding album:', albumId);
      const updatedAlbums = albums.map(album =>
        album.id === albumId ? { ...album, isAddButton: false } : album
      );
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error('Failed to add album:', error);
    }
  };

  const handleRemoveAlbum = async (albumId: string) => {
    try {
      // Implementation for removing album
      console.log('Removing album:', albumId);
      const updatedAlbums = albums.map(album =>
        album.id === albumId ? { ...album, isAddButton: true } : album
      );
      setAlbums(updatedAlbums);
    } catch (error) {
      console.error('Failed to remove album:', error);
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Artist Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden">
            <Image
              src="/placeholder-artist.jpg"
              alt={artist.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-blue-400">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm text-blue-400">Artista certificado</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{artist.name}</h1>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Followers: {artist.followers.toLocaleString()}</p>
              <p>Monthly listeners: {artist.monthlyListeners.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Albums Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Favorite albums by {artist.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <div key={album.id} className="group relative">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-900">
                  <Image
                    src={album.imageUrl}
                    alt={album.name}
                    fill
                    className="object-cover"
                  />
                  {album.isAddButton ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <AddAlbumButton onClick={() => handleAddAlbum(album.id)} />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity">
                      <button
                        onClick={() => handleRemoveAlbum(album.id)}
                        className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-sm font-medium rounded-full bg-red-500 hover:bg-red-600 transition-all"
                      >
                        Remove album
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <h3 className="font-medium">{album.name}</h3>
                  <p className="text-sm text-gray-400">Published: {album.publishedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
