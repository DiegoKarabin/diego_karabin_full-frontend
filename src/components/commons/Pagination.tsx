interface PaginationProps {
  paginationData: {
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  onPageChange: (page: number) => void;
};

export default function Pagination({ paginationData, onPageChange }: PaginationProps) {
  const { currentPage, totalPages } = paginationData;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfMaxPages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-start gap-2 text-sm md:px-25 lg:px-29">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#252525] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#252525] transition-colors ${
            page === currentPage ? 'text-[#D6F379]' : ''
          } ${page === '...' ? 'cursor-default' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#252525] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
}
