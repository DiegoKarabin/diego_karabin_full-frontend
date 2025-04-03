import { useState, useCallback } from 'react';
import { getSavedAlbums } from '@/app/lib/actions';
import type { SpotifyAlbum, SpotifyPaging } from '@/types/spotify';
import { DEFAULT_SEARCH_LIMIT } from '@/lib/constants';

interface SavedAlbumsState {
  data?: SpotifyPaging<SpotifyAlbum>;
  error?: string;
}

export function useSavedAlbums() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<SavedAlbumsState>({});

  const fetchAlbums = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * DEFAULT_SEARCH_LIMIT;
      const result = await getSavedAlbums({
        offset,
        limit: DEFAULT_SEARCH_LIMIT,
      });

      if (!result.success) {
        setState({ error: result.error });
        return;
      }

      setState({ data: result.data });
    } catch (error) {
      setState({
        error: error instanceof Error ? error.message : 'Failed to fetch saved albums',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    fetchAlbums(page);
  }, [fetchAlbums]);

  return {
    isLoading,
    error: state.error,
    albums: state.data?.items ?? [],
    pagination: {
      total: state.data?.total ?? 0,
      limit: state.data?.limit ?? DEFAULT_SEARCH_LIMIT,
      currentPage: state.data ? Math.floor(state.data.offset / state.data.limit) + 1 : 1,
      totalPages: state.data ? Math.ceil(state.data.total / state.data.limit) : 1
    },
    handlePageChange,
    fetchAlbums,
  };
}
