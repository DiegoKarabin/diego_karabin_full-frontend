import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?q=${e.currentTarget.query.value}`);
  }, [router]);

  return (
    <div className="max-w-2xl mx-6 sm:max-w-full md:mx-25 lg:max-w-2xl lg:mx-auto mb-12">
      <div className="relative">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            defaultValue={initialQuery}
            placeholder="Artista"
            className="w-full h-[62px] bg-white text-black font-semibold rounded-[24px] py-3 px-6 pr-24 outline-none focus:ring-2 focus:ring-[#D6F379] transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D6F379] text-black px-6 py-4 rounded-full font-semibold hover:bg-[#BBEE00] transition-colors">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
