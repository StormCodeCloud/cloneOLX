import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar.tsx';
import AdminHeader from '../components/AdminHeader.tsx';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  registrationDate: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados - substituir por chamada à API
    setUsers([
      {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@email.pt',
        status: 'active',
        registrationDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@email.pt',
        status: 'active',
        registrationDate: '2024-01-16'
      },
      {
        id: 3,
        name: 'António Costa',
        email: 'antonio.costa@email.pt',
        status: 'inactive',
        registrationDate: '2024-01-17'
      }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Gestão de Utilizadores" />
        
        <main className="p-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Lista de Utilizadores</h5>
                <button className="btn btn-primary">
                  + Adicionar Utilizador
                </button>
              </div>

              {loading ? (
                <p>A carregar...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Data de Registo</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                              {user.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td>{new Date(user.registrationDate).toLocaleDateString('pt-PT')}</td>
                          <td>
                            <div className="btn-group">
                              <button className="btn btn-sm btn-outline-primary">Editar</button>
                              <button className="btn btn-sm btn-outline-danger">Remover</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users; 