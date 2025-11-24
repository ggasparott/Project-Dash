const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const atendimentoRoutes = require('./routes/atendimentoRoutes');
require('dotenv').config();
require('./config/db');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rotas 
app.use('/api/auth', authRoutes);
app.use('/api/atendimentos', atendimentoRoutes);


// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API do Dashboard CRM rodando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});