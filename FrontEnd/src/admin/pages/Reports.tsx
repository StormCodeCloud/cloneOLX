import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar.tsx';
import AdminHeader from '../components/AdminHeader.tsx';

interface Report {
  id: number;
  adTitle: string;
  reason: string;
  reportedBy: string;
  date: string;
  status: 'pending' | 'reviewed' | 'resolved';
  description: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados - substituir por chamada à API
    setReports([
      {
        id: 1,
        adTitle: 'iPhone 13 Pro Max',
        reason: 'Produto falsificado',
        reportedBy: 'Maria Santos',
        date: '2024-01-20',
        status: 'pending',
        description: 'O vendedor está a anunciar um produto falsificado.'
      },
      {
        id: 2,
        adTitle: 'Apartamento T2',
        reason: 'Informações incorretas',
        reportedBy: 'João Silva',
        date: '2024-01-19',
        status: 'reviewed',
        description: 'As fotos não correspondem ao imóvel anunciado.'
      },
      {
        id: 3,
        adTitle: 'Bicicleta de Montanha',
        reason: 'Preço abusivo',
        reportedBy: 'António Costa',
        date: '2024-01-18',
        status: 'resolved',
        description: 'O preço está muito acima do valor de mercado.'
      }
    ]);
    setLoading(false);
  }, []);

  const getStatusBadge = (status: Report['status']) => {
    const statusMap = {
      pending: { class: 'bg-warning', label: 'Pendente' },
      reviewed: { class: 'bg-info', label: 'Em Análise' },
      resolved: { class: 'bg-success', label: 'Resolvido' }
    };
    return statusMap[status];
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Gestão de Denúncias" />
        
        <main className="p-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Lista de Denúncias</h5>
                <div className="d-flex gap-2">
                  <select className="form-select form-select-sm" defaultValue="">
                    <option value="">Todos os Estados</option>
                    <option value="pending">Pendentes</option>
                    <option value="reviewed">Em Análise</option>
                    <option value="resolved">Resolvidos</option>
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
                        <th>Anúncio</th>
                        <th>Motivo</th>
                        <th>Reportado por</th>
                        <th>Data</th>
                        <th>Estado</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map(report => (
                        <tr key={report.id}>
                          <td>{report.id}</td>
                          <td>{report.adTitle}</td>
                          <td>{report.reason}</td>
                          <td>{report.reportedBy}</td>
                          <td>{new Date(report.date).toLocaleDateString('pt-PT')}</td>
                          <td>
                            <span className={`badge ${getStatusBadge(report.status).class}`}>
                              {getStatusBadge(report.status).label}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                title={report.description}
                              >
                                Ver Detalhes
                              </button>
                              <button className="btn btn-sm btn-outline-success">
                                Resolver
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                Arquivar
                              </button>
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

export default Reports; 