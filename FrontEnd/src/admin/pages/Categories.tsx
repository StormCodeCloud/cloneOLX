import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar.tsx';
import AdminHeader from '../components/AdminHeader.tsx';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Category {
  id: number;
  name: string;
  slug: string;
  totalAds: number;
  isActive: boolean;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de dados - substituir por chamada à API
    setCategories([
      {
        id: 1,
        name: 'Automóveis',
        slug: 'automoveis',
        totalAds: 150,
        isActive: true
      },
      {
        id: 2,
        name: 'Imóveis',
        slug: 'imoveis',
        totalAds: 320,
        isActive: true
      },
      {
        id: 3,
        name: 'Tecnologia',
        slug: 'tecnologia',
        totalAds: 450,
        isActive: true
      },
      {
        id: 4,
        name: 'Vestuário',
        slug: 'vestuario',
        totalAds: 280,
        isActive: false
      }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminHeader title="Gestão de Categorias" />
        
        <main className="p-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Lista de Categorias</h5>
                <button className="btn btn-primary">
                  + Nova Categoria
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
                        <th>Slug</th>
                        <th>Total de Anúncios</th>
                        <th>Estado</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td><code>{category.slug}</code></td>
                          <td>{category.totalAds}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={category.isActive}
                                onChange={() => {}}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button className="btn btn-sm btn-outline-primary">
                                <FaEdit /> Editar
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                <FaTrash /> Eliminar
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

export default Categories; 