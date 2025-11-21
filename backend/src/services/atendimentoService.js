const AtendimentoModel = require('../models/AtendimentoModel');

class AtendimentoService {
  
  /**
   * Listar todos os atendimentos de um usuário
   */
  async listar(usuarioId) {
    console.log('🔍 SERVICE - listar chamado com usuarioId:', usuarioId);
    
    // Validação
    if (!usuarioId) {
      throw new Error('usuarioId é obrigatório');
    }
    
    // Buscar no Model
    const atendimentos = await AtendimentoModel.listarPorUsuario(usuarioId);
    
    console.log('✅ SERVICE - atendimentos encontrados:', atendimentos.length);
    
    // Retornar formatado
    return {
      dados: atendimentos,
      total: atendimentos.length
    };
  }
  
  /**
   * Obter KPIs calculados e formatados
   */
  async obterKPIs(usuarioId) {
    console.log('🔍 SERVICE - obterKPIs chamado com usuarioId:', usuarioId);
    
    // Validação
    if (!usuarioId) {
      throw new Error('usuarioId é obrigatório');
    }
    
    // Buscar dados brutos do Model
    const dadosBrutos = await AtendimentoModel.calcularKPIs(usuarioId);
    
    // Formatar duração (150s → "2min 30s")
    const duracaoFormatada = this.formatarTempo(dadosBrutos.duracao_media);
    
    // Calcular taxa de resolução (%)
    const taxaResolucao = dadosBrutos.total > 0 
      ? (dadosBrutos.resolvidos / dadosBrutos.total) * 100 
      : 0;
    
    // Calcular taxa de recontato (%)
    const taxaRecontato = dadosBrutos.total_atendimentos > 0
      ? ((dadosBrutos.total_atendimentos - dadosBrutos.clientes_unicos) / dadosBrutos.total_atendimentos) * 100
      : 0;
    
    // Retornar formatado e organizado
    return {
      total_atendimentos: dadosBrutos.total,
      duracao_media_segundos: Math.round(dadosBrutos.duracao_media),
      duracao_media_formatada: duracaoFormatada,
      taxa_resolucao_pct: parseFloat(taxaResolucao.toFixed(2)),
      
      status: {
        resolvidos: dadosBrutos.resolvidos,
        pendentes: dadosBrutos.pendentes,
        encaminhados: dadosBrutos.encaminhados
      },
      
      sentimentos: {
        positivos: dadosBrutos.positivos,
        neutros: dadosBrutos.neutros,
        negativos: dadosBrutos.negativos
      },
      
      clientes: {
        unicos: dadosBrutos.clientes_unicos,
        taxa_recontato_pct: parseFloat(taxaRecontato.toFixed(2))
      },
      
      atendimentos_por_dia: dadosBrutos.atendimentos_por_dia
    };
  }
  
  /**
   * Formatar tempo em segundos para "Xmin Ys"
   */
  formatarTempo(segundos) {
    if (!segundos || segundos === 0) {
      return '0s';
    }
    
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.round(segundos % 60);
    
    if (minutos === 0) {
      return `${segundosRestantes}s`;
    }
    
    if (segundosRestantes === 0) {
      return `${minutos}min`;
    }
    
    return `${minutos}min ${segundosRestantes}s`;
  }
}

// ✅ EXPORTAR COMO INSTÂNCIA DA CLASSE
module.exports = new AtendimentoService();