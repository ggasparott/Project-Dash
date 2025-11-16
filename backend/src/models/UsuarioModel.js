const db = require('../config/db');

class UsuarioModel {
  // Criar novo usuário
  static async criar(email, senhaHash) {
    const query = 'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id';
    const result = await db.query(query, [email, senhaHash]);
    return result.rows[0].id;
  }

  // Buscar usuário por email
  static async buscarPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }
}

module.exports = UsuarioModel;