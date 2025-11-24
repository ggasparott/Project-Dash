const { Pool } = require('pg');
require('dotenv').config();

// Verificar se a URL do banco existe
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada no .env');
  process.exit(1);
}

// Configuração do pool com SSL habilitado
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Necessário para Supabase
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handler de erro do pool - NÃO DEIXAR O SERVIDOR CAIR
pool.on('error', (err, client) => {
  console.error('❌ Erro inesperado no pool de conexões:', err.message);
  console.error('⚠️ Mantendo servidor rodando...');
  // NÃO chamar process.exit() aqui para manter o servidor vivo
});

// Testar conexão inicial (opcional, não crítico)
pool.connect()
  .then(client => {
    console.log('✅ Conectado ao PostgreSQL (Supabase)!');
    console.log('📊 Database:', client.database);
    client.release();
  })
  .catch(err => {
    console.error('❌ Erro na conexão inicial ao PostgreSQL:', err.message);
    console.error('⚠️ O servidor vai tentar reconectar nas próximas requisições...');
    // NÃO fazer exit aqui, deixar o servidor tentar reconectar
  });

module.exports = pool;