import { useState, useCallback } from 'react';
import { checkSavedAlbums } from '@/app/lib/actions';

export function useCheckSavedAlbums() {
  const [isChecking, setIsChecking] = useState(false);
  const [savedStatuses, setSavedStatuses] = useState<Record<string, boolean>>({});

  const check = useCallback(async (albumIds: string[]) => {
    setIsChecking(true);
    try {
      const result = await checkSavedAlbums(albumIds);

      if (result.success && result.data) {
        const newStatuses = albumIds.reduce((acc, id, index) => {
          acc[id] = result.data[index];
          return acc;
        }, {} as Record<string, boolean>);

        setSavedStatuses(newStatuses);
        return newStatuses;
      }
      return null;
    } catch (error) {
      console.error('Error checking saved albums:', error);
      return null;
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    check,
    isChecking,
    savedStatuses,
  };
}
