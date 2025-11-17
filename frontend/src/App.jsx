import { useState } from 'react';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';

function App() {
  const [telaCadastro, setTelaCadastro] = useState(false);

  return (
    <>
      {telaCadastro ? (
        <Cadastro trocarParaLogin={() => setTelaCadastro(false)} />
      ) : (
        <Login trocarParaCadastro={() => setTelaCadastro(true)} />
      )}
    </>
  );
}

export default App;