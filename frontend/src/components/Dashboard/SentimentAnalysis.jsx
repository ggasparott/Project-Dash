function SentimentAnalysis({ sentimentos, totalAtendimentos }) {
  const calculatePercentage = (value) => {
    return totalAtendimentos > 0 ? (value / totalAtendimentos) * 100 : 0;
  };

  const sentimentData = [
    {
      label: 'Positivos',
      value: sentimentos?.positivos || 0,
      color: 'from-green-500 to-green-400',
      bgColor: 'bg-green-500',
      percentage: calculatePercentage(sentimentos?.positivos || 0)
    },
    {
      label: 'Neutros',
      value: sentimentos?.neutros || 0,
      color: 'from-yellow-500 to-yellow-400',
      bgColor: 'bg-yellow-500',
      percentage: calculatePercentage(sentimentos?.neutros || 0)
    },
    {
      label: 'Negativos',
      value: sentimentos?.negativos || 0,
      color: 'from-red-500 to-red-400',
      bgColor: 'bg-red-500',
      percentage: calculatePercentage(sentimentos?.negativos || 0)
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-fast-ice mb-6 flex items-center">
        <span className="w-2 h-8 bg-fast-cyan rounded-full mr-3"></span>
        Análise de Sentimentos
      </h3>
      
      <div className="space-y-4">
        {sentimentData.map((sentiment, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400 flex items-center">
                <span className={`w-3 h-3 ${sentiment.bgColor} rounded-full mr-2`}></span>
                {sentiment.label}
              </span>
              <span className="text-sm font-bold text-fast-ice">
                {sentiment.value} ({sentiment.percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${sentiment.color} rounded-full transition-all duration-500`}
                style={{ width: `${sentiment.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SentimentAnalysis;
