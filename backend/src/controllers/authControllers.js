const authService = require('../services/authService');

class AuthController {
    async cadastrar(req, res) {
        try {
            const email = req.body.email;
            const senha = req.body.senha;
            const novoUsuario = await authService.cadastrar(email, senha);
            return res.status(201).json({
                mensagem: "Cadastrado!",
                dados: novoUsuario
            });
        } 
        catch (err) {
            return res.status(400).json({ erro: err.message});
        }
    }
    
    async login(req, res) {
        try {
            const email = req.body.email;
            const senha = req.body.senha;
            const usuarioLogado = await authService.login(email, senha);
            return res.status(200).json({
                messagem: "Logado!",
                dados: usuarioLogado
            });
        }
        catch (err) {
            return res.status(401).json({erro: err.message});
        }
        
    }
    
}



module.exports = new AuthController();