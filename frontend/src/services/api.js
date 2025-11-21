import axios from 'axios';

// Configuração base da API
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Cadastrar novo usuário
 */
export const cadastrar = async (email, senha) => {
  try {
    const response = await api.post('/auth/cadastro', { email, senha });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.erro || 'Erro ao cadastrar');
  }
};

/**
 * Fazer login
 */
export const login = async (email, senha) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    
    // Salvar token no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.erro || 'Erro ao fazer login');
  }
};

/**
 * Fazer logout
 */
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

/**
 * Listar atendimentos do usuário
 */
export const listarAtendimentos = async (usuarioId) => {
  try {
    const response = await api.get('/atendimentos', {
      params: { usuario_id: usuarioId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.erro || 'Erro ao listar atendimentos');
  }
};

/**
 * Obter KPIs dos atendimentos
 */
export const obterKPIs = async (usuarioId) => {
  try {
    const response = await api.get('/atendimentos/kpis', {
      params: { usuario_id: usuarioId },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.erro || 'Erro ao obter KPIs');
  }
};

// Alias para compatibilidade
export const getKPIs = obterKPIs;

export default api;