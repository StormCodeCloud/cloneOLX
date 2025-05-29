import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar.tsx';
import AdminHeader from '../components/AdminHeader.tsx';

interface Ad {
  id: number;
  title: string;
  category: string;
  price: string;
  status: 'active' | 'pending' | 'rejected';
  createdAt: string;
  seller: string;
}

const Ads: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados - substituir por chamada à API
    setAds([
      {
        id: 1,
        title: 'iPhone 13 Pro Max',
        category: 'Tecnologia',
        price: '899€',
        status: 'active',
        createdAt: '2024-01-20',
        seller: 'João Silva'
      },
      {
        id: 2,
        title: 'Apartamento T2',
        category: 'Imóveis',
        price: '250.000€',
        status: 'pending',
        createdAt: '2024-01-19',
        seller: 'Maria Santos'
      },
      {
        id: 3,
        title: 'Bicicleta de Montanha',
        category: 'Desporto',
        price: '450€',
        status: 'rejected',
        createdAt: '2024-01-18',
        seller: 'António Costa'
      }
    ]);
    setLoading(false);
  }, []);

  const getStatusBadge = (status: Ad['status']) => {
    const statusMap = {
      active: { class: 'bg-success', label: 'Ativo' },
      pending: { class: 'bg-warning', label: 'Pendente' },
      rejected: { class: 'bg-danger', label: 'Rejeitado' }
    };
    return statusMap[status];
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Gestão de Anúncios" />
        
        <main className="p-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Lista de Anúncios</h5>
                <div className="d-flex gap-2">
                  <select className="form-select form-select-sm" defaultValue="">
                    <option value="">Todas as Categorias</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="imoveis">Imóveis</option>
                    <option value="desporto">Desporto</option>
                  </select>
                  <select className="form-select form-select-sm" defaultValue="">
                    <option value="">Todos os Estados</option>
                    <option value="active">Ativos</option>
                    <option value="pending">Pendentes</option>
                    <option value="rejected">Rejeitados</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <p>A carregar...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Estado</th>
                        <th>Data</th>
                        <th>Vendedor</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ads.map(ad => (
                        <tr key={ad.id}>
                          <td>{ad.id}</td>
                          <td>{ad.title}</td>
                          <td>{ad.category}</td>
                          <td>{ad.price}</td>
                          <td>
                            <span className={`badge ${getStatusBadge(ad.status).class}`}>
                              {getStatusBadge(ad.status).label}
                            </span>
                          </td>
                          <td>{new Date(ad.createdAt).toLocaleDateString('pt-PT')}</td>
                          <td>{ad.seller}</td>
                          <td>
                            <div className="btn-group">
                              <button className="btn btn-sm btn-outline-primary">Ver</button>
                              <button className="btn btn-sm btn-outline-success">Aprovar</button>
                              <button className="btn btn-sm btn-outline-danger">Rejeitar</button>
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

export default Ads; 