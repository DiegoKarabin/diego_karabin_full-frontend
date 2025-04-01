import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search Artists | Aluxion',
  description: 'Search and find your favorite artists.',
};

export default function Search() {
  return (
    <>
      {/* Main Content */}
      <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mt-8 md:mt-12 lg:mt-16">
        {/* Search Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Busca tus{' '}
            <span className="text-[#CCFF00]">artistas</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Nirvana"
              className="w-full bg-[#252525] text-white rounded-full py-3 px-6 pr-24 outline-none focus:ring-2 focus:ring-[#CCFF00] transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#CCFF00] text-black px-6 py-2 rounded-full font-medium hover:bg-[#BBEE00] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4">Mostrando 4 resultados de (nirvana)</p>

          {/* Grid of Results */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Artist Card 1 */}
            <div className="group relative aspect-square bg-[#252525] rounded-lg overflow-hidden">
              <Image
                src="/artist1.jpg"
                alt="Artist 1"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-medium">{'{ArtistName}'}</h3>
                  <p className="text-sm text-gray-300">Followers: {'{n}'}</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#CCFF00] rounded-full flex items-center justify-center">
                <span className="text-black font-medium">N</span>
              </div>
            </div>

            {/* Repeat similar cards for other artists */}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#252525] transition-colors">
            &lt;
          </button>
          {[10, 11, 12, 13, 14, '...', 20].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#252525] transition-colors ${
                page === 12 ? 'bg-[#252525]' : ''
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#252525] transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
