// Configuração base da API
const API_URL = 'http://localhost:3000/api';

/**
 * Cadastrar novo usuário
 */
export const cadastrar = async (email, senha) => {
  try {
    const response = await fetch(`${API_URL}/auth/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao cadastrar');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fazer login
 */
export const login = async (email, senha) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro ao fazer login');
    }

    return data;
  } catch (error) {
    throw error;
  }
};