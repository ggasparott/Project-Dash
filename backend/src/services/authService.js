const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/UsuarioModel');

class AuthService {
  // Cadastrar novo usuário
  async cadastrar(email, senha) {
    // 1. Validar dados
    if (!email || !senha) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (senha.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    // 2. Verificar se o email já existe
    const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // 3. Criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // 4. Criar o usuário no banco
    const userId = await UsuarioModel.criar(email, senhaHash);

    return {
      id: userId,
      email: email,
      mensagem: 'Usuário cadastrado com sucesso!'
    };
  }

  // Login de usuário
  async login(email, senha) {
    // 1. Validar dados
    if (!email || !senha) {
      throw new Error('Email e senha são obrigatórios');
    }

    // 2. Buscar usuário no banco
    const usuario = await UsuarioModel.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('Email ou senha incorretos');
    }

    // 3. Comparar a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Email ou senha incorretos');
    }

    // 4. Retornar dados do usuário (sem a senha!)
    return {
      id: usuario.id,
      email: usuario.email,
      mensagem: 'Login realizado com sucesso!'
    };
  }
}

module.exports = new AuthService();