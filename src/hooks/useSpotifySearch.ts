'use client';

import { useCallback, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { searchAlbum } from '@/app/lib/actions';
import { useActionState } from 'react';
import type { SpotifyAlbum, SpotifyPaging } from '@/types/spotify';
import { DEFAULT_SEARCH_LIMIT } from '@/lib/constants';

interface SearchState {
  data?: SpotifyPaging<SpotifyAlbum>;
  error?: string;
}

const initialState: SearchState = {};

export function useSpotifySearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(searchAlbum, initialState);

  const query = searchParams.get('q') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  const handleSearch = useCallback((formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  }, [formAction]);

  const handlePageChange = useCallback((newPage: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(newPage));
      router.push(`/search?${params.toString()}`);
    });
  }, [router, searchParams]);

  return {
    query,
    albums: state.data?.items ?? [],
    pagination: state.data ? {
      total: state.data.total,
      currentPage: page,
      totalPages: Math.ceil(state.data.total / DEFAULT_SEARCH_LIMIT),
      limit: state.data.limit,
    } : {
      total: 0,
      currentPage: 1,
      totalPages: 1,
      limit: DEFAULT_SEARCH_LIMIT,
    },
    isLoading: isPending,
    error: state.error,
    handleSearch,
    handlePageChange,
  };
}
