import { useState } from 'react';
import { saveAlbum } from '@/app/lib/actions';
import toast from 'react-hot-toast';

interface SaveAlbumResult {
  success: boolean;
  error?: string;
}

export function useSaveAlbum() {
  const [isSaving, setIsSaving] = useState(false);

  const save = async (albumId: string): Promise<SaveAlbumResult> => {
    const toastId = toast.loading('Guardando álbum...');
    setIsSaving(true);

    try {
      const result = await saveAlbum(albumId);

      if (!result.success) {
        toast.error(result.error || 'Fallo al guardar álbum', { id: toastId });
        return result;
      }

      toast.success('¡Álbum guardado exitosamente!', { id: toastId });
      return result;
    } catch {
      const errorMessage = 'Fallo al guardar álbum';
      toast.error(errorMessage, { id: toastId });
      return { success: false, error: errorMessage };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    save,
    isSaving,
  };
}
