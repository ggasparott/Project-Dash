function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="px-6 py-4 bg-white/5 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Página {currentPage} de {totalPages}
        </div>
        
        <div className="flex space-x-2">
          {/* Botão Anterior */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 text-fast-ice hover:bg-white/20'
            }`}
          >
            Anterior
          </button>

          {/* Números das páginas */}
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              
              // Mostrar apenas páginas próximas
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-fast-cyan text-white'
                        : 'bg-white/10 text-fast-ice hover:bg-white/20'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="px-2 text-gray-600">...</span>;
              }
              return null;
            })}
          </div>

          {/* Botão Próximo */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                : 'bg-white/10 text-fast-ice hover:bg-white/20'
            }`}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
