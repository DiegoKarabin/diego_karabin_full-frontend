import { SpotifyAlbum, SpotifyPaging } from '@/types/spotify';
import {
  SPOTIFY_API_BASE_URL,
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_MY_ALBUMS_LIMIT,
} from '@/lib/constants';

interface SpotifyApiImage {
  url: string;
  height?: number;
  width?: number;
}

interface SpotifyApiAlbum {
  id: string;
  name: string;
  images: SpotifyApiImage[];
  release_date: string;
  artists: Array<{
    name: string;
  }>;
}

interface SpotifySearchResponse {
  albums?: {
    items: SpotifyApiAlbum[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
  };
}

interface SpotifyUserSavedAlbumsResponse {
  items: Array<{
    added_at: string;
    album: SpotifyApiAlbum;
  }>;
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export class SpotifyService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${SPOTIFY_API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(
        () => ({ error: { message: 'Unknown error occurred' } })
      );

      throw new Error(error.error?.message || 'Failed to fetch from Spotify API');
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }


    try {
      return await response.json();
    } catch {
      if (response.ok) {
        return {} as T;
      }

      throw new Error('Invalid JSON response from API');
    }
  }

  private convertToSpotifyAlbum(album: SpotifyApiAlbum): SpotifyAlbum {
    return {
      id: album.id,
      name: album.name,
      images: album.images.map((img) => ({
        url: img.url,
        height: img.height ?? null,
        width: img.width ?? null,
      })),
      releaseDate: album.release_date,
      artists: album.artists.map((artist) => artist.name),
    };
  }

  async searchAlbums(query: string, options: { limit?: number; offset?: number } = {}): Promise<SpotifyPaging<SpotifyAlbum>> {
    const { limit = DEFAULT_SEARCH_LIMIT, offset = 0 } = options;
    const searchParams = new URLSearchParams({
      q: query,
      type: 'album',
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await this.fetch<SpotifySearchResponse>(`/search?${searchParams}`);

    if (!response.albums) {
      throw new Error('No albums found');
    }

    return {
      items: response.albums.items.map(this.convertToSpotifyAlbum),
      total: response.albums.total,
      limit: response.albums.limit,
      offset: response.albums.offset,
      next: response.albums.next,
      previous: response.albums.previous,
    };
  }

  async saveAlbum(albumId: string): Promise<void> {
    await this.fetch<void>('/me/albums', {
      method: 'PUT',
      body: JSON.stringify({ ids: [albumId] }),
    });
  }

  async removeAlbum(albumId: string): Promise<void> {
    await this.fetch<void>('/me/albums', {
      method: 'DELETE',
      body: JSON.stringify({ ids: [albumId] }),
    });
  }

  async checkSavedAlbums(albumIds: string[]): Promise<boolean[]> {
    const ids = albumIds.join(',');
    const response = await this.fetch<boolean[]>(`/me/albums/contains?ids=${ids}`, {
      method: 'GET',
    });

    return response;
  }

  async getSavedAlbums(options: { limit?: number; offset?: number } = {}): Promise<SpotifyPaging<SpotifyAlbum>> {
    const { limit = DEFAULT_MY_ALBUMS_LIMIT, offset = 0 } = options;
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await this.fetch<SpotifyUserSavedAlbumsResponse>(
      `/me/albums?${searchParams}`
    );

    return {
      items: response.items
        .map(item => this.convertToSpotifyAlbum(item.album)),
      total: response.total,
      limit: response.limit,
      offset: response.offset,
      next: response.next,
      previous: response.previous,
    };
  }
}
