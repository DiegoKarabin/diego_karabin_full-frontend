'use client';

import { useCallback, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { searchArtists } from '@/app/lib/actions';
import { useActionState } from 'react';
import type { SpotifyArtist, SpotifyPaging } from '@/types/spotify';

interface SearchState {
  data?: SpotifyPaging<SpotifyArtist>;
  error?: string;
}

const initialState: SearchState = {};

export function useSpotifySearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(searchArtists, initialState);

  const query = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;

  const createQueryString = useCallback(
    (params: Record<string, string | number>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([name, value]) => {
        if (value) {
          newSearchParams.set(name, String(value));
        } else {
          newSearchParams.delete(name);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      startTransition(() => {
        router.push(
          `${pathname}?${createQueryString({
            q: query,
            page: newPage,
          })}`
        );
      });
    },
    [pathname, router, createQueryString, query]
  );

  const handleSearch = useCallback(
    (formData: FormData) => {
      startTransition(() => {
        formAction(formData);
      });
    },
    [formAction]
  );

  return {
    isLoading: isPending,
    error: state.error,
    results: state.data?.items ?? [],
    pagination: state.data ? {
      total: state.data.total,
      currentPage: page,
      totalPages: Math.ceil(state.data.total / state.data.limit),
      limit: state.data.limit,
    } : {
      total: 0,
      currentPage: 1,
      totalPages: 0,
      limit: 4,
    },
    query,
    handlePageChange,
    handleSearch,
  };
}
