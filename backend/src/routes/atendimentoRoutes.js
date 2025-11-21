const express = require('express');
const router = express.Router();
const atendimentoController = require('../controllers/atendimentoController');

/**
 * GET /api/atendimentos?usuario_id=1
 * Listar todos os atendimentos
 */
router.get('/', atendimentoController.listar);

/**
 * GET /api/atendimentos/kpis?usuario_id=1
 * Buscar KPIs calculados
 */
router.get('/kpis', atendimentoController.buscarKPIs);

module.exports = router;