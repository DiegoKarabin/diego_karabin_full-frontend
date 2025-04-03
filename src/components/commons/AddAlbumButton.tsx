'use client';

interface AddAlbumButtonProps {
  onClick: (e: React.MouseEvent) => Promise<void>;
  isSaving?: boolean;
  className?: string;
}

export default function AddAlbumButton({
  onClick,
  isSaving = false,
  className = ''
}: AddAlbumButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        mt-auto py-3 px-6 font-medium rounded-full text-black
        bg-[#D6F379] hover:bg-[#BBEE00] transition-colors
        cursor-pointer ${className}
      `}
      disabled={isSaving}
    >
      {isSaving ? 'Guardando...' : '+ Guardar Album'}
    </button>
  );
}
