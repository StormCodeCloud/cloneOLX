import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';

const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          first_name: nome,
          email, 
          password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Conta criada com sucesso! Será redirecionado para a página de início de sessão.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Não foi possível criar a conta. Por favor, tente novamente.');
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
          <h2 className="mb-3 fw-bold text-primary text-center">Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Introduza o seu nome completo"
                required
              />
            </div>
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
                placeholder="Introduza uma palavra-passe segura"
                required
              />
            </div>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            {success && <div className="alert alert-success py-1">{success}</div>}
            <button 
              type="submit" 
              className="btn btn-primary w-100 mt-2"
              disabled={!nome || !email || !password || loading}
            >
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
