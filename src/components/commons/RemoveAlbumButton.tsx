
interface RemoveAlbumButtonProps {
  onClick: (e: React.MouseEvent) => Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export default function RemoveAlbumButton({ onClick, isRemoving = false, className = '' }: RemoveAlbumButtonProps) {
  return (
    <button
      className={`
        mt-auto bg-[#E3513D] text-white py-3 px-6 rounded-full font-semibold
        cursor-pointer hover:bg-[#e33d3d] transition-colors disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      disabled={isRemoving}
    >
      {isRemoving ? 'Eliminando...' : '- Eliminar Album'}
    </button>
  );
}
