const AtendimentoModel = require('../models/AtendimentoModel');

class AtendimentoService {
  
  /**
   * Validar se é um UUID válido
   */
  validarUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
  
  /**
   * Listar todos os atendimentos de um usuário
   */
  async listar(usuarioId) {
    console.log('🔍 SERVICE - listar chamado com usuarioId:', usuarioId, 'tipo:', typeof usuarioId);
    
    // Validação
    if (!usuarioId) {
      throw new Error('usuarioId é obrigatório');
    }
    
    // Validar se é UUID válido
    if (!this.validarUUID(usuarioId)) {
      console.error('❌ usuarioId inválido (não é UUID):', usuarioId);
      throw new Error('usuarioId deve ser um UUID válido');
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
    console.log('🔍 SERVICE - obterKPIs chamado com usuarioId:', usuarioId, 'tipo:', typeof usuarioId);
    
    // Validação
    if (!usuarioId) {
      throw new Error('usuarioId é obrigatório');
    }
    
    // Validar se é UUID válido
    if (!this.validarUUID(usuarioId)) {
      console.error('❌ usuarioId inválido (não é UUID):', usuarioId);
      throw new Error('usuarioId deve ser um UUID válido');
    }
    
    // Buscar dados brutos do Model
    const dadosBrutos = await AtendimentoModel.calcularKPIs(usuarioId);
    
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
      tickets_abertos: dadosBrutos.tickets_abertos || 0,
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
}

// ✅ EXPORTAR COMO INSTÂNCIA DA CLASSE
module.exports = new AtendimentoService();