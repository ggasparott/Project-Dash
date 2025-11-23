import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';
import { listarAtendimentos } from '../services/api';
import { logout } from '../services/auth';
import Sidebar from '../components/Layout/Sidebar';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';
import DataTable from '../components/Common/DataTable';
import Pagination from '../components/Common/Pagination';
import FilterBar from '../components/Atendimentos/FilterBar';

function Atendimentos() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentimento, setFilterSentimento] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setUser(currentUser);

      const atendimentosData = await listarAtendimentos(currentUser.id);
      setAtendimentos(atendimentosData.dados);

    } catch (err) {
      console.error('Erro ao carregar atendimentos:', err);
      setError('Erro ao carregar lista de atendimentos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Filtrar atendimentos
  const atendimentosFiltrados = atendimentos.filter(atendimento => {
    const matchSearch = searchTerm === '' || 
      atendimento.cliente_nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.cliente_telefone?.includes(searchTerm);
    
    const matchSentimento = filterSentimento === 'todos' || atendimento.sentimento === filterSentimento;
    const matchStatus = filterStatus === 'todos' || atendimento.status_final === filterStatus;
    
    return matchSearch && matchSentimento && matchStatus;
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = atendimentosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(atendimentosFiltrados.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterSentimento('todos');
    setFilterStatus('todos');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== '' || filterSentimento !== 'todos' || filterStatus !== 'todos';

  // Funções auxiliares
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentoColor = (sentimento) => {
    switch(sentimento) {
      case 'positivo': return 'bg-green-500/20 text-green-400';
      case 'negativo': return 'bg-red-500/20 text-red-400';
      default: return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolvido': return 'bg-green-500/20 text-green-400';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  // Definir colunas da tabela
  const columns = [
    {
      header: 'Cliente',
      accessor: 'cliente_nome',
      render: (row) => (
        <div className="text-fast-ice font-medium">{row.cliente_nome}</div>
      )
    },
    {
      header: 'Telefone',
      accessor: 'cliente_telefone',
      render: (row) => (
        <span className="text-gray-300">{row.cliente_telefone}</span>
      )
    },
    {
      header: 'Sentimento',
      accessor: 'sentimento',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSentimentoColor(row.sentimento)}`}>
          {row.sentimento}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status_final',
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(row.status_final)}`}>
          {row.status_final}
        </span>
      )
    },
    {
      header: 'Data',
      accessor: 'created_at',
      render: (row) => (
        <span className="text-gray-300">{formatDate(row.created_at)}</span>
      )
    }
  ];

  if (loading) {
    return <Loading message="Carregando atendimentos..." />;
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fast-ice mb-2">Atendimentos</h1>
          <p className="text-gray-400">Gerencie todos os seus atendimentos</p>
        </div>

        {/* Filtros e Busca */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          filterSentimento={filterSentimento}
          onSentimentoChange={(value) => {
            setFilterSentimento(value);
            setCurrentPage(1);
          }}
          filterStatus={filterStatus}
          onStatusChange={(value) => {
            setFilterStatus(value);
            setCurrentPage(1);
          }}
          totalResults={atendimentosFiltrados.length}
          displayedResults={currentItems.length}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Tabela de Atendimentos */}
        <DataTable 
          columns={columns}
          data={currentItems}
          emptyMessage="Nenhum atendimento encontrado"
          emptyDescription={
            hasActiveFilters 
              ? 'Tente ajustar os filtros' 
              : 'Os atendimentos aparecerão aqui'
          }
        />

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}

export default Atendimentos;
