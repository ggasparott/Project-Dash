import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug para identificar o problema em produção
console.log('🔧 Supabase Config Debug:', {
  url: supabaseUrl,
  keyExists: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erro Crítico: Variáveis de ambiente do Supabase não foram carregadas.');
  console.error('Verifique se os BUILD ARGUMENTS foram configurados no painel de deploy.');
  throw new Error('Faltam as variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
