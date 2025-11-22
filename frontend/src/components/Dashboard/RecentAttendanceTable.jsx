function RecentAttendanceTable({ atendimentos = [] }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
  };

  const getSentimentBadge = (sentimento) => {
    const classes = {
      positivo: 'bg-green-500/20 text-green-400',
      negativo: 'bg-red-500/20 text-red-400',
      neutro: 'bg-yellow-500/20 text-yellow-400'
    };
    return classes[sentimento] || classes.neutro;
  };

  const getStatusBadge = (status) => {
    const classes = {
      resolvido: 'bg-green-500/20 text-green-400',
      pendente: 'bg-yellow-500/20 text-yellow-400',
      encaminhado: 'bg-blue-500/20 text-blue-400'
    };
    return classes[status] || classes.pendente;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold text-fast-ice flex items-center">
          <span className="w-2 h-8 bg-fast-cyan rounded-full mr-3"></span>
          Últimos Atendimentos
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sentimento</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duração</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {atendimentos.length > 0 ? (
              atendimentos.map((atendimento, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-fast-ice">{atendimento.cliente_nome}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{atendimento.cliente_telefone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSentimentBadge(atendimento.sentimento)}`}>
                      {atendimento.sentimento}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(atendimento.status_final)}`}>
                      {atendimento.status_final}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDuration(atendimento.duracao_segundos)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(atendimento.created_at)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                  Nenhum atendimento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentAttendanceTable;
