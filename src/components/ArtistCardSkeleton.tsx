export default function ArtistCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden p-6 animate-pulse">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#252525]">
        <div className="absolute inset-0 bg-gray-700 animate-pulse" />
      </div>
      <div className="mt-6">
        <div className="h-8 w-3/4 bg-gray-700 rounded-lg animate-pulse" />
        <div className="mt-6">
          <div className="h-4 w-1/2 bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
