const atendimentoService = require('../services/atendimentoService');

class AtendimentoController {
    /**
     * GET api/atendimentos?usuario_id=1
     */
    async listar(req, res) {
        try {
            const { usuario_id } = req.query;

            if(!usuario_id) {
                return res.status(400).json({
                  erro: 'usuario_id não encontrado'
                });
            }
            
            const resultado = await atendimentoService.listar(parseInt(usuario_id));
            
            return res.status(200).json({
                mensagem: 'Atendimentos encontrados',
                dados: resultado.dados,
                total: resultado.total 
            });
            
        } catch (error) {
            console.error('❌ Erro completo:', error);
            return res.status(500).json({
              erro: error.message || 'Erro interno no servidor'  // ← CORRIGIR
            });
        }
    }

    /**
     * GET /api/atendimentos/kpis?usuario_id=1
     */
    async buscarKPIs(req, res) {
        try {
            const { usuario_id } = req.query;
            
            if (!usuario_id) {
                return res.status(400).json({ 
                  erro: 'usuario_id é obrigatório' 
                });
            }
            
            const kpis = await atendimentoService.obterKPIs(parseInt(usuario_id));
            
            return res.status(200).json({
                mensagem: 'KPIs calculados com sucesso',
                dados: kpis
            });
            
        } catch (error) {
            console.error('❌ Erro completo:', error);
            return res.status(500).json({ 
              erro: error.message || 'Erro interno do servidor'  // ← CORRIGIR
            });
        }
    }
}   

module.exports = new AtendimentoController();