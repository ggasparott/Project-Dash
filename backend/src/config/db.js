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

// Handler de erro do pool
pool.on('error', (err, client) => {
  console.error('❌ Erro inesperado no pool de conexões:', err.message);
});

// Testar conexão
pool.connect()
  .then(client => {
    console.log('✅ Conectado ao PostgreSQL (Supabase)!');
    console.log('📊 Database:', client.database);
    client.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
    if (err.code) console.error('Código do erro:', err.code);
    if (process.env.NODE_ENV === 'development') {
      console.error('Stack completo:', err.stack);
    }
  });

module.exports = pool;