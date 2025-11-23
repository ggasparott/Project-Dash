function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Buscar..." 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Buscar
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-fast-ice placeholder-gray-500 focus:outline-none focus:border-fast-cyan transition-colors"
        />
        <svg 
          className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchInput;
