'use client';

interface AddAlbumButtonProps {
  onClick: () => void;
  className?: string;
}

export default function AddAlbumButton({ onClick, className = '' }: AddAlbumButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-full bg-green-500 hover:bg-green-600 transition-colors ${className}`}
    >
      + Add album
    </button>
  );
}
