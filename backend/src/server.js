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
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API Dashboard rodando!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API do Dashboard CRM rodando!' });
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

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});