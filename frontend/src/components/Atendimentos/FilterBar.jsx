function FilterBar({ 
  searchTerm, 
  onSearchChange,
  filterSentimento,
  onSentimentoChange,
  filterStatus,
  onStatusChange,
  totalResults,
  displayedResults,
  onClearFilters,
  hasActiveFilters
}) {
  const sentimentoOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'positivo', label: 'Positivo' },
    { value: 'neutro', label: 'Neutro' },
    { value: 'negativo', label: 'Negativo' }
  ];

  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'resolvido', label: 'Resolvido' },
    { value: 'pendente', label: 'Pendente' },
    { value: 'encaminhado', label: 'Encaminhado' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Busca */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Buscar
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nome do cliente ou telefone..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-fast-ice placeholder-gray-500 focus:outline-none focus:border-fast-cyan transition-colors"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filtro Sentimento */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Sentimento
          </label>
          <select
            value={filterSentimento}
            onChange={(e) => onSentimentoChange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-fast-ice focus:outline-none focus:border-fast-cyan transition-colors"
          >
            {sentimentoOptions.map(opt => (
              <option 
                key={opt.value} 
                value={opt.value}
                className="bg-[#1B263B] text-fast-ice"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro Status */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-fast-ice focus:outline-none focus:border-fast-cyan transition-colors"
          >
            {statusOptions.map(opt => (
              <option 
                key={opt.value} 
                value={opt.value}
                className="bg-[#1B263B] text-fast-ice"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Mostrando <span className="text-fast-cyan font-semibold">{displayedResults}</span> de{' '}
          <span className="text-fast-cyan font-semibold">{totalResults}</span> atendimentos
        </p>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-fast-cyan hover:text-fast-cyan/80 transition-colors"
          >
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
