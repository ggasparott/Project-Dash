const db = require('../config/db');

class AtendimentoModel {
    static async listarPorUsuario(usuarioId, limite = 100){
        const query = 'SELECT * FROM atendimentos WHERE usuario_id = $1 ORDER BY created_at DESC LIMIT $2';
        const result = await db.query(query, [usuarioId, limite]);
        return result.rows;
    }
    static async buscarPorId(id) {
        const query = 'SELECT * FROM atendimentos WHERE id = $1';
        const result = await db.query(query, [id]);
        if(result.rows.length ===  0) {
            throw new Error('Atendimento Não Encontrado');        
        }
        return result.rows[0];
    }
    static async calcularKPIs(usuarioId) {
        const queryGeral = `
        SELECT 
            COUNT(*) as total
        FROM atendimentos 
        WHERE usuario_id = $1
    `;
    const resultGeral = await db.query(queryGeral, [usuarioId]);

    const queryStatus = `
      SELECT 
        COUNT(*) FILTER (WHERE status_final = 'resolvido') as resolvidos,
        COUNT(*) FILTER (WHERE status_final = 'pendente') as pendentes,
        COUNT(*) FILTER (WHERE status_final = 'encaminhado') as encaminhados
      FROM atendimentos 
      WHERE usuario_id = $1
    `;
    const resultStatus = await db.query(queryStatus, [usuarioId]);

     const querySentimento = `
      SELECT 
        COUNT(*) FILTER (WHERE sentimento = 'positivo') as positivos,
        COUNT(*) FILTER (WHERE sentimento = 'neutro') as neutros,
        COUNT(*) FILTER (WHERE sentimento = 'negativo') as negativos
      FROM atendimentos 
      WHERE usuario_id = $1
    `;
    const resultSentimento = await db.query(querySentimento, [usuarioId]);
    
    // Query 4: Clientes únicos e recontato
    const queryClientes = `
      SELECT 
        COUNT(DISTINCT cliente_telefone) as clientes_unicos,
        COUNT(*) as total_atendimentos
      FROM atendimentos 
      WHERE usuario_id = $1
    `;
    const resultClientes = await db.query(queryClientes, [usuarioId]);
    
    // Query 5: Atendimentos por dia (últimos 7 dias)
    const queryPorDia = `
      SELECT 
        DATE(created_at) as data,
        COUNT(*) as total
      FROM atendimentos
      WHERE usuario_id = $1
        AND created_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY data DESC
    `;
    const resultPorDia = await db.query(queryPorDia, [usuarioId]);
    
    // ✅ Retornar todos os dados
    return {
      // Dados gerais
      total: parseInt(resultGeral.rows[0].total),
      
      // Status
      resolvidos: parseInt(resultStatus.rows[0].resolvidos),
      pendentes: parseInt(resultStatus.rows[0].pendentes),
      encaminhados: parseInt(resultStatus.rows[0].encaminhados),
      tickets_abertos: parseInt(resultStatus.rows[0].pendentes) + parseInt(resultStatus.rows[0].encaminhados),
      
      // Sentimentos
      positivos: parseInt(resultSentimento.rows[0].positivos),
      neutros: parseInt(resultSentimento.rows[0].neutros),
      negativos: parseInt(resultSentimento.rows[0].negativos),
      
      // Clientes
      clientes_unicos: parseInt(resultClientes.rows[0].clientes_unicos),
      total_atendimentos: parseInt(resultClientes.rows[0].total_atendimentos),
      
      // Por dia
      atendimentos_por_dia: resultPorDia.rows
    }
    }
}

module.exports = AtendimentoModel;