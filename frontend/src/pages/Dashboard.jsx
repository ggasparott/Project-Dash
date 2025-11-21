import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, logout } from '../services/auth';
import { getKPIs, listarAtendimentos } from '../services/api';
import fastLogo from '../assets/Logotipo Fast 1.0-no-bg (1).png';

function Dashboard() {
  const navigate = useNavigate();
  const [kpis, setKpis] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const session = await getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      carregarDados();
    };

    verificarAutenticacao();
  }, [navigate]);

  const carregarDados = async () => {
    try {
      const [kpisData, atendimentosData] = await Promise.all([
        getKPIs(),
        listarAtendimentos()
      ]);
      setKpis(kpisData);
      setAtendimentos(atendimentosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-fast-blue">
        <div className="text-fast-ice text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #001a3d 0%, #003366 25%, #004C99 50%, #003366 75%, #001a3d 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header com Logo */}
      <header className="relative z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={fastLogo}
                alt="Fast Logo" 
                className="h-8 sm:h-10 w-auto"
              />
              <span className="ml-4 text-fast-ice text-lg sm:text-xl font-semibold">
                CRM <span className="text-fast-cyan">Dashboard</span>
              </span>
            </div>

            {/* Botão Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Cards */}
        {kpis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total de Atendimentos */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-fast-cyan/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-fast-ice/70 text-sm font-medium">Total de Atendimentos</p>
                  <p className="text-3xl font-bold text-fast-ice mt-2">{kpis.totalAtendimentos}</p>
                </div>
                <div className="w-12 h-12 bg-fast-cyan/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-fast-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Média de Confiança */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-fast-cyan/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-fast-ice/70 text-sm font-medium">Média de Confiança</p>
                  <p className="text-3xl font-bold text-fast-ice mt-2">{kpis.mediaConfianca.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-fast-purple/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-fast-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Ativo */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-fast-cyan/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-fast-ice/70 text-sm font-medium">Status Ativo</p>
                  <p className="text-3xl font-bold text-fast-ice mt-2">{kpis.statusAtivo}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Concluído */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-fast-cyan/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-fast-ice/70 text-sm font-medium">Status Concluído</p>
                  <p className="text-3xl font-bold text-fast-ice mt-2">{kpis.statusConcluido}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Distribuição de Sentimentos */}
        {kpis && kpis.sentimentos && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-xl font-bold text-fast-ice mb-6">Distribuição de Sentimentos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-green-400 text-sm font-medium mb-2">Positivo</p>
                <p className="text-3xl font-bold text-fast-ice">{kpis.sentimentos.positivo || 0}</p>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <p className="text-yellow-400 text-sm font-medium mb-2">Neutro</p>
                <p className="text-3xl font-bold text-fast-ice">{kpis.sentimentos.neutro || 0}</p>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="text-red-400 text-sm font-medium mb-2">Negativo</p>
                <p className="text-3xl font-bold text-fast-ice">{kpis.sentimentos.negativo || 0}</p>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Atendimentos Recentes */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-fast-ice mb-6">Atendimentos Recentes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-fast-ice/70 font-medium text-sm">ID</th>
                  <th className="text-left py-3 px-4 text-fast-ice/70 font-medium text-sm">Cliente</th>
                  <th className="text-left py-3 px-4 text-fast-ice/70 font-medium text-sm">Problema</th>
                  <th className="text-left py-3 px-4 text-fast-ice/70 font-medium text-sm">Sentimento</th>
                  <th className="text-left py-3 px-4 text-fast-ice/70 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-fast-ice/70 font-medium text-sm">Confiança</th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.slice(0, 10).map((atendimento) => (
                  <tr key={atendimento.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-fast-ice text-sm">{atendimento.id}</td>
                    <td className="py-3 px-4 text-fast-ice text-sm">{atendimento.cliente_nome}</td>
                    <td className="py-3 px-4 text-fast-ice text-sm truncate max-w-xs">{atendimento.problema_descricao}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        atendimento.sentimento === 'positivo' ? 'bg-green-500/20 text-green-400' :
                        atendimento.sentimento === 'neutro' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {atendimento.sentimento}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        atendimento.status === 'concluido' ? 'bg-blue-500/20 text-blue-400' :
                        atendimento.status === 'ativo' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {atendimento.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-fast-ice text-sm">{atendimento.confianca.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Orbs de fundo (mesma estética) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-fast-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-fast-cyan/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fast-blue/30 rounded-full blur-3xl"></div>
        
        {/* Pequenas luzes pulsantes */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-fast-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-fast-purple rounded-full animate-pulse delay-150"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-fast-cyan rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-fast-purple rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
}

export default Dashboard;
