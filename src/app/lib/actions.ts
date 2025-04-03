'use server'

import type { SpotifyAlbum, SpotifyPaging } from '@/types/spotify';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/config';
import { SpotifyService } from '@/lib/spotify-service';
import { DEFAULT_SEARCH_LIMIT } from '@/lib/constants';

interface SearchState {
  data?: SpotifyPaging<SpotifyAlbum>;
  error?: string;
}

export async function searchAlbum(prevState: SearchState, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { error: 'Not authenticated' };
    }

    const query = formData.get('query') as string;
    const offset = Number(formData.get('offset')) || 0;
    const limit = Number(formData.get('limit')) || DEFAULT_SEARCH_LIMIT;

    if (!query) {
      return { error: 'Query is required' };
    }

    const spotifyService = new SpotifyService(session.accessToken);
    const data = await spotifyService.searchAlbums(query, { limit, offset });

    return { data };
  } catch (error) {
    console.error('Error searching albums:', error);
    return { error: error instanceof Error ? error.message : 'Failed to search albums' };
  }
}

export async function saveAlbum(albumId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { success: false, error: 'Not authenticated' };
    }

    const spotifyService = new SpotifyService(session.accessToken);
    await spotifyService.saveAlbum(albumId);

    return { success: true };
  } catch (error) {
    console.error('Error saving album:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save album'
    };
  }
}

export async function removeAlbum(albumId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { success: false, error: 'Not authenticated' };
    }

    const spotifyService = new SpotifyService(session.accessToken);
    await spotifyService.removeAlbum(albumId);

    return { success: true };
  } catch (error) {
    console.error('Error removing album:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove album'
    };
  }
}

export async function checkSavedAlbums(albumIds: string[]) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { success: false, error: 'Not authenticated' };
    }

    const spotifyService = new SpotifyService(session.accessToken);
    const savedStatuses = await spotifyService.checkSavedAlbums(albumIds);

    return { success: true, data: savedStatuses };
  } catch (error) {
    console.error('Error checking saved albums:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to check saved albums'
    };
  }
}

export async function getSavedAlbums(options: { limit?: number; offset?: number } = {}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { success: false, error: 'Not authenticated' };
    }

    const spotifyService = new SpotifyService(session.accessToken);
    const data = await spotifyService.getSavedAlbums(options);

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching saved albums:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch saved albums'
    };
  }
}
