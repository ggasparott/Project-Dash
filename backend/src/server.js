const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas 
app.use('/api/auth', authRoutes);


// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API do Dashboard CRM rodando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});