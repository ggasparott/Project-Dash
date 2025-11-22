import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/auth';
import { getKPIs, listarAtendimentos } from '../services/api';
import Sidebar from '../components/Layout/Sidebar';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';
import KPICard from '../components/Dashboard/KPICard';
import SentimentAnalysis from '../components/Dashboard/SentimentAnalysis';
import StatusChart from '../components/Dashboard/StatusChart';
import RecentAttendanceTable from '../components/Dashboard/RecentAttendanceTable';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [kpis, setKpis] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      // Buscar usuário atual
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);

      // Buscar KPIs
      const kpisData = await getKPIs(currentUser.id);
      setKpis(kpisData.dados);

      // Buscar últimos atendimentos
      const atendimentosData = await listarAtendimentos(currentUser.id);
      setAtendimentos(atendimentosData.dados.slice(0, 5)); // Apenas os 5 últimos

    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  if (loading) {
    return <Loading message="Carregando dashboard..." />;
  }

  return (
    <div 
      className="flex min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #004C99 0%, #1B263B 50%, #004C99 100%)',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      {/* Orbs de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-fast-cyan/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-fast-purple/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Sidebar onLogout={handleLogout} />

      {/* Conteúdo Principal */}
      <main className="flex-1 ml-64 p-8 relative z-10">
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={carregarDados} />
          </div>
        )}

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={carregarDados} />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fast-ice mb-2">Dashboard de Atendimentos</h1>
          <p className="text-gray-400">Bem-vindo, {user?.email}</p>
        </div>

        {/* Cards de KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total de Atendimentos"
            value={kpis?.total_atendimentos || 0}
            icon={
              <svg className="w-6 h-6 text-fast-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            color="cyan"
          />

          <KPICard
            title="Duração Média"
            value={kpis?.duracao_media_formatada || '0s'}
            subtitle={`${kpis?.duracao_media_segundos || 0} segundos`}
            icon={
              <svg className="w-6 h-6 text-fast-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="cyan"
          />

          <KPICard
            title="Taxa de Resolução"
            value={`${kpis?.taxa_resolucao_pct || 0}%`}
            subtitle={`${kpis?.status?.resolvidos || 0} resolvidos`}
            icon={
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="green"
          />

          <KPICard
            title="Clientes Únicos"
            value={kpis?.clientes?.unicos || 0}
            subtitle={`${kpis?.clientes?.taxa_recontato_pct || 0}% recontato`}
            icon={
              <svg className="w-6 h-6 text-fast-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            color="cyan"
          />
        </div>

        {/* Grid de 2 Colunas - Métricas Detalhadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SentimentAnalysis 
            sentimentos={kpis?.sentimentos} 
            totalAtendimentos={kpis?.total_atendimentos || 0} 
          />
          <StatusChart 
            status={kpis?.status} 
            totalAtendimentos={kpis?.total_atendimentos || 0} 
          />
        </div>

        <RecentAttendanceTable atendimentos={atendimentos} />

      </main>
    </div>
  );
}

export default Dashboard;