function SelectFilter({ 
  label, 
  value, 
  onChange, 
  options 
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-fast-ice focus:outline-none focus:border-fast-cyan transition-colors"
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-[#1B263B] text-fast-ice"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFilter;
