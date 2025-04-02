'use server'

import { SpotifyApi } from '@/lib/spotify';
import type { SpotifyArtist, SpotifyPaging } from '@/types/spotify';

interface SearchState {
  data?: SpotifyPaging<SpotifyArtist>;
  error?: string;
}

interface SpotifyApiImage {
  url: string;
  height?: number;
  width?: number;
}

interface SpotifyApiArtist {
  id: string;
  name: string;
  images: SpotifyApiImage[];
  followers: {
    total: number;
  };
}

function convertToSpotifyArtist(artist: SpotifyApiArtist): SpotifyArtist {
  return {
    id: artist.id,
    name: artist.name,
    images: artist.images.map((img) => ({
      url: img.url,
      height: img.height ?? null,
      width: img.width ?? null,
    })),
    followers: {
      total: artist.followers.total,
    },
  };
}

export async function searchArtists(prevState: SearchState, formData: FormData) {
  try {
    const query = formData.get('query') as string;
    const offset = Number(formData.get('offset')) || 0;
    const limit = Number(formData.get('limit')) || 4;

    if (!query) {
      return { error: 'Query is required' };
    }

    const spotifyApi = await SpotifyApi.getInstance();
    const response = await spotifyApi.searchArtists(query, {
      limit,
      offset,
    });

    if (!response.body.artists) {
      return { error: 'No artists found' };
    }

    const artists = response.body.artists.items.map(convertToSpotifyArtist);
    const paging: SpotifyPaging<SpotifyArtist> = {
      items: artists,
      total: response.body.artists.total,
      limit: response.body.artists.limit,
      offset: response.body.artists.offset,
      next: response.body.artists.next,
      previous: response.body.artists.previous,
    };

    return { data: paging };
  } catch (error) {
    console.error('Error searching artists:', error);
    return { error: 'Failed to search artists' };
  }
}
