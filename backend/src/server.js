const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');
require('dotenv').config();
require('./config/db');

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'https://dash.fastdevdigital.com.br',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get(['/health', '/api/health'], (req, res) => {
  try {
    res.json({ 
      status: 'ok', 
      message: 'API Dashboard rodando!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      hasDatabase: !!process.env.DATABASE_URL
    });
  } catch (error) {
    console.error('Erro no health check:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota de teste
app.get(['/', '/api'], (req, res) => {
  try {
    res.json({ 
      message: '🚀 API do Dashboard CRM rodando!',
      env: {
        node_env: process.env.NODE_ENV,
        port: process.env.PORT,
        has_db: !!process.env.DATABASE_URL,
        has_supabase: !!process.env.SUPABASE_URL
      }
    });
  } catch (error) {
    console.error('Erro na rota raiz:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rotas 
app.use('/api/auth', authRoutes);
app.use('/api/atendimentos', atendimentoRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS habilitado para: ${process.env.FRONTEND_URL || 'localhost'}`);
});