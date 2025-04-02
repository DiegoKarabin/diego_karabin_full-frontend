'use client';

import Image from 'next/image';
import ImagePlaceholder from '@/components/icons/ImagePlaceholder';
import { useRouter } from 'next/navigation';

interface ArtistCardProps {
  name: string;
  followers: number;
  imageUrl: string;
  ranking?: number;
  id: string;
}

export default function ArtistCard({ name, followers, imageUrl, id }: ArtistCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/artists/${id}`);
  };

  return (
    <div
      className="rounded-3xl overflow-hidden p-6 hover:bg-[#D6F379] hover:text-black transition-colors cursor-pointer"
      onClick={handleClick}
    >
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
      <div className="mt-6">
        <h3 className="text-3xl font-semibold">{name}</h3>
        <div className="mt-6">
          <p>Followers: {followers}</p>
        </div>
      </div>
    </div>
  );
}
