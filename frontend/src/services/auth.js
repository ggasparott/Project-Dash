import { supabase } from '../config/supabase';

/**
 * Cadastrar novo usuário usando Supabase Auth
 */
export const cadastrar = async (email, senha) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) throw error;

    return {
      mensagem: 'Cadastrado! Verifique seu email para confirmar.',
      usuario: data.user,
      session: data.session
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao cadastrar');
  }
};

/**
 * Fazer login usando Supabase Auth
 */
export const login = async (email, senha) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw error;

    return {
      mensagem: 'Login realizado com sucesso!',
      usuario: data.user,
      session: data.session,
      token: data.session.access_token
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao fazer login');
  }
};

/**
 * Fazer logout
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    localStorage.clear();
    window.location.href = '/login';
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    // Mesmo com erro, limpa storage e redireciona
    localStorage.clear();
    window.location.href = '/login';
  }
};

/**
 * Obter sessão atual
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return null;
  }
};

/**
 * Obter usuário atual
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
};

/**
 * Verificar se está autenticado
 */
export const isAuthenticated = async () => {
  const session = await getSession();
  return !!session;
};
