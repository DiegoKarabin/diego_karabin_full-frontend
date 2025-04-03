'use client';

import Image from 'next/image';
import { useState } from 'react';
import ImagePlaceholder from '@/components/icons/ImagePlaceholder';
import { useSaveAlbum } from '@/hooks/useSaveAlbum';
import { useRemoveAlbum } from '@/hooks/useRemoveAlbum';
import AddAlbumButton from '@/components/commons/AddAlbumButton';
import RemoveAlbumButton from '@/components/commons/RemoveAlbumButton';

interface AlbumCardProps {
  name: string;
  releaseDate: string;
  imageUrl: string;
  id: string;
  isSaved?: boolean;
  onDeleteAlbum?: () => void;
}

export default function AlbumCard({
  name,
  releaseDate,
  imageUrl,
  id,
  isSaved = false,
  onDeleteAlbum,
}: AlbumCardProps) {
  const { save, isSaving } = useSaveAlbum();
  const { remove, isRemoving } = useRemoveAlbum();
  const [savedStatus, setSavedStatus] = useState(isSaved);

  const handleSaveAlbum = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await save(id);

    if (result.success) {
      setSavedStatus(true);
    }
  };

  const handleRemoveAlbum = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await remove(id);

    if (result.success) {
      setSavedStatus(false);
      onDeleteAlbum?.();
    }
  };

  return (
    <div className="rounded-3xl overflow-hidden p-6 transition-colors h-full flex flex-col">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#252525]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImagePlaceholder />
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col flex-grow items-start">
        <h3 className="text-3xl font-semibold">{name}</h3>
        <div className="mt-6 mb-6">
          <p>Publicado: {releaseDate}</p>
        </div>
        {!savedStatus ? (
          <AddAlbumButton
            onClick={handleSaveAlbum}
            isSaving={isSaving}
          />
        ) : (
          <RemoveAlbumButton
            onClick={handleRemoveAlbum}
            isRemoving={isRemoving}
          />
        )}
      </div>
    </div>
  );
}
