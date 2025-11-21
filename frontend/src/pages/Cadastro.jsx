import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar } from '../services/auth';
import fastLogo from '../assets/Logotipo Fast 1.0-no-bg (1).png';
function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpa erro ao digitar
  };

  // Validação do formulário
  const validateForm = () => {
    if (formData.senha.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }

    return true;
  };

  // Envia o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await cadastrar(formData.email, formData.senha);
      
      setSuccess(true);
      
      // Redireciona para login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-x-hidden"
      style={{
        background: '#003366',
        backgroundImage: 'linear-gradient(135deg, #001a3d 0%, #003366 25%, #004C99 50%, #003366 75%, #001a3d 100%)',
        backgroundSize: '400% 400%',
        backgroundAttachment: 'fixed',
        animation: 'gradient 15s ease infinite'
      }}
    >
      {/* Efeitos de fundo sofisticados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orbs luminosos grandes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(56, 182, 255, 0.15)'}}></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(75, 0, 130, 0.15)', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl animate-pulse" style={{backgroundColor: 'rgba(0, 76, 153, 0.1)', animationDelay: '2s'}}></div>
        
        {/* Pontos de luz pequenos */}
        <div className="absolute top-32 left-40 w-2 h-2 bg-fast-cyan rounded-full animate-pulse"></div>
        <div className="absolute top-48 left-60 w-1 h-1 bg-fast-ice rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-40 right-48 w-2 h-2 bg-fast-cyan/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-56 left-32 w-1 h-1 bg-fast-ice/80 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/4 right-20 w-1.5 h-1.5 bg-fast-cyan rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Container principal */}
      <div className="relative w-full max-w-md z-10 my-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src={fastLogo}
              alt="Fast Logo" 
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-fast-ice mb-2">
            <span className="text-fast-cyan">CRM</span> Dashboard
          </h2>
          <p className="text-sm sm:text-base text-fast-ice/70 font-light">Junte-se a nós hoje</p>
        </div>

        {/* Card do Formulário */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(56, 182, 255, 0.15)'
        }}>
          <h2 className="text-xl sm:text-2xl font-bold text-fast-ice mb-2">Criar sua conta</h2>
          <p className="text-sm sm:text-base text-fast-ice/70 mb-6 sm:mb-8">Preencha os dados para começar</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl mb-6">
              <div className="flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-300 px-4 py-3 rounded-xl mb-6">
              <div className="flex items-center">
                <span className="text-xl mr-2">✅</span>
                Conta criada! Redirecionando para login...
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-fast-ice/90 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-fast-cyan/30 rounded-xl text-fast-ice placeholder-fast-ice/40 focus:outline-none focus:ring-2 focus:ring-fast-cyan focus:border-transparent transition-all hover:bg-white/10"
                placeholder="seu@email.com"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-fast-ice/90 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-fast-cyan/30 rounded-xl text-fast-ice placeholder-fast-ice/40 focus:outline-none focus:ring-2 focus:ring-fast-cyan focus:border-transparent transition-all hover:bg-white/10"
                placeholder="••••••••"
              />
              <p className="mt-2 text-xs text-fast-ice/60">Mínimo de 6 caracteres</p>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-fast-ice/90 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 bg-white/5 border border-fast-cyan/30 rounded-xl text-fast-ice placeholder-fast-ice/40 focus:outline-none focus:ring-2 focus:ring-fast-cyan focus:border-transparent transition-all hover:bg-white/10"
                placeholder="••••••••"
              />
            </div>

            {/* Botão de Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-fast-cyan to-fast-blue hover:from-fast-blue hover:to-fast-cyan text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-fast-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Criando conta...
                </span>
              ) : success ? (
                'Conta criada!'
              ) : (
                'Criar Conta'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">ou</span>
            </div>
          </div>

          {/* Link para Login */}
          <div className="text-center">
            <p className="text-fast-ice/70">
              Já tem uma conta?{' '}
              <Link
                to="/login"
                className="text-fast-cyan hover:text-fast-ice font-semibold transition-colors hover:underline"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2025 Fast Development. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

export default Cadastro;