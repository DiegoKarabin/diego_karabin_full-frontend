import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { removeAlbum } from '@/app/lib/actions';

type RemoveAlbumResult = { success: boolean; error?: string };

export function useRemoveAlbum() {
  const [isRemoving, setIsRemoving] = useState(false);

  const remove = async (albumId: string): Promise<RemoveAlbumResult> => {
    const toastId = toast.loading('Eliminando álbum...');
    setIsRemoving(true);

    try {
      const result = await removeAlbum(albumId);

      if (!result.success) {
        toast.error(result.error || 'Fallo al eliminar álbum', { id: toastId });
        return result;
      }

      toast.success('¡Álbum eliminado exitosamente!', { id: toastId });
      return result;
    } catch {
      const errorMessage = 'Fallo al eliminar álbum';
      toast.error(errorMessage, { id: toastId });
      return { success: false, error: errorMessage };
    } finally {
      setIsRemoving(false);
    }
  };

  return {
    remove,
    isRemoving,
  };
}
