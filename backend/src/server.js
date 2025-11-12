const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas (vamos criar depois)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/atendimentos', require('./routes/atendimentoRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API do Dashboard CRM rodando!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});