const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
 
});

pool.connect()
  .then(client => {
    console.log('✅ Conectado ao PostgreSQL (Supabase)!');
    client.release();
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
  });

module.exports = pool;