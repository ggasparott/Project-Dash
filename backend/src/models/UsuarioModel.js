const db = require('../config/db');

class UsuarioModel {
  // Criar novo usuário
  static async criar(email, senhaHash) {
    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    const [result] = await db.execute(query, [email, senhaHash]);
    return result.insertId;
  }

  // Buscar usuário por email (para login)
  static async buscarPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const [rows] = await db.execute(query, [email]);
    return rows[0]; // Retorna o primeiro usuário ou undefined
  }
}

module.exports = UsuarioModel;