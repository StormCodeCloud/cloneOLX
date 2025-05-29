import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.tsx';
import AdminHeader from '../components/AdminHeader.tsx';

interface DashboardStats {
  totalUsers: number;
  totalAds: number;
  activeAds: number;
  pendingAds: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAds: 0,
    activeAds: 0,
    pendingAds: 0
  });

  useEffect(() => {
    // Aqui seria feita a chamada à API para obter as estatísticas
    // Por enquanto, usando dados simulados
    setStats({
      totalUsers: 1250,
      totalAds: 3456,
      activeAds: 2890,
      pendingAds: 45
    });
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Painel de Controlo" />
        
        <main className="p-4">
          {/* Estatísticas Gerais */}
          <div className="row g-4 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Total de Utilizadores</h6>
                  <h3 className="mb-0 fw-bold text-primary">{stats.totalUsers}</h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Total de Anúncios</h6>
                  <h3 className="mb-0 fw-bold text-primary">{stats.totalAds}</h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Anúncios Ativos</h6>
                  <h3 className="mb-0 fw-bold text-success">{stats.activeAds}</h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted mb-2">Anúncios Pendentes</h6>
                  <h3 className="mb-0 fw-bold text-warning">{stats.pendingAds}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Ações Rápidas</h5>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to="/admin/users" className="btn btn-outline-primary">
                      Gerir Utilizadores
                    </Link>
                    <Link to="/admin/ads" className="btn btn-outline-primary">
                      Gerir Anúncios
                    </Link>
                    <Link to="/admin/categories" className="btn btn-outline-primary">
                      Gerir Categorias
                    </Link>
                    <Link to="/admin/reports" className="btn btn-outline-primary">
                      Ver Denúncias
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Atividade Recente</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Ação</th>
                          <th>Utilizador</th>
                          <th>Data</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Novo anúncio publicado</td>
                          <td>João Silva</td>
                          <td>Hoje, 14:30</td>
                          <td><span className="badge bg-success">Aprovado</span></td>
                        </tr>
                        <tr>
                          <td>Denúncia recebida</td>
                          <td>Maria Santos</td>
                          <td>Hoje, 13:15</td>
                          <td><span className="badge bg-warning">Pendente</span></td>
                        </tr>
                        <tr>
                          <td>Novo utilizador registado</td>
                          <td>António Costa</td>
                          <td>Hoje, 12:45</td>
                          <td><span className="badge bg-info">Verificado</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 