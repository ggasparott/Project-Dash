const { Pool } = require('pg');
require('dotenv').config();

// Verificar se a URL do banco existe
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não configurada no .env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.connect()
  .then(client => {
    console.log('✅ Conectado ao PostgreSQL (Supabase)!');
    client.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
    console.error('Stack:', err.stack);
  });

module.exports = pool;