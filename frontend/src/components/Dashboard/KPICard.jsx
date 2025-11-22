function KPICard({ title, value, subtitle, icon, color = "cyan" }) {
  const colorClasses = {
    cyan: {
      bg: 'bg-fast-cyan/20',
      text: 'text-fast-cyan',
      border: 'border-fast-cyan/30'
    },
    purple: {
      bg: 'bg-fast-purple/20',
      text: 'text-fast-purple',
      border: 'border-fast-purple/30'
    },
    green: {
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      border: 'border-green-500/30'
    }
  };

  const colors = colorClasses[color] || colorClasses.cyan;

  return (
    <div className={`bg-white/5 backdrop-blur-xl border ${colors.border} rounded-2xl p-6 hover:border-opacity-50 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-fast-ice">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export default KPICard;
