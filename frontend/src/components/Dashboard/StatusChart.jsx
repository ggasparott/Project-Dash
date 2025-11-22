function StatusChart({ status, totalAtendimentos }) {
  const calculatePercentage = (value) => {
    return totalAtendimentos > 0 ? (value / totalAtendimentos) * 100 : 0;
  };

  const statusData = [
    {
      label: 'Resolvidos',
      value: status?.resolvidos || 0,
      color: 'from-green-500 to-green-400',
      bgColor: 'bg-green-500',
      percentage: calculatePercentage(status?.resolvidos || 0)
    },
    {
      label: 'Pendentes',
      value: status?.pendentes || 0,
      color: 'from-yellow-500 to-yellow-400',
      bgColor: 'bg-yellow-500',
      percentage: calculatePercentage(status?.pendentes || 0)
    },
    {
      label: 'Encaminhados',
      value: status?.encaminhados || 0,
      color: 'from-blue-500 to-blue-400',
      bgColor: 'bg-blue-500',
      percentage: calculatePercentage(status?.encaminhados || 0)
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-fast-ice mb-6 flex items-center">
        <span className="w-2 h-8 bg-fast-cyan rounded-full mr-3"></span>
        Status dos Atendimentos
      </h3>
      
      <div className="space-y-4">
        {statusData.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400 flex items-center">
                <span className={`w-3 h-3 ${item.bgColor} rounded-full mr-2`}></span>
                {item.label}
              </span>
              <span className="text-sm font-bold text-fast-ice">
                {item.value} ({item.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusChart;
