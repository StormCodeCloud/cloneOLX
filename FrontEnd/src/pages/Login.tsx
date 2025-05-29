import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Guardar o token no localStorage
        localStorage.setItem('bearer_token', data.bearer_token);
        // Redirecionar para a página inicial
        navigate('/');
      } else {
        setError(data.message || 'Endereço de email ou palavra-passe incorretos.');
      }
    } catch (err) {
      setError('Não foi possível estabelecer ligação com o servidor. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', background: '#f8f9fa' }}>
        <div className="card shadow-sm p-4" style={{ maxWidth: 500, width: '30%' }}>
          <h2 className="mb-3 fw-bold text-primary text-center">Iniciar Sessão</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Endereço de Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="exemplo@email.pt"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Palavra-passe</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Introduza a sua palavra-passe"
                required
              />
            </div>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <button 
              type="submit" 
              className="btn btn-primary w-100 mt-2" 
              disabled={!email || !password || loading}
            >
              {loading ? 'A iniciar sessão...' : 'Iniciar Sessão'}
            </button>
          </form>
          <div className="text-center mt-3">
            <span className="text-secondary small">Ainda não tem uma conta?</span>
            <Link to="/register" className="ms-1 text-primary small">Criar conta</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 