export default function FullPageLoader() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#D6F379] rounded-full animate-[spin_1s_linear_infinite]" />
          <div className="absolute inset-[6px] border-4 border-t-transparent border-[#D6F379] rounded-full animate-[spin_0.8s_linear_infinite_reverse]" />
        </div>

        <p className="text-[#D6F379] text-lg font-medium animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
}
