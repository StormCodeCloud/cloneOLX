import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

interface AdminHeaderProps {
  title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="d-flex justify-content-between align-items-center p-4">
        <h1 className="h3 mb-0">{title}</h1>
        
        <div className="d-flex align-items-center gap-4">
          {/* Notificações */}
          <div className="position-relative">
            <button className="btn btn-link text-dark p-0">
              <FaBell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
                <span className="visually-hidden">notificações não lidas</span>
              </span>
            </button>
          </div>

          {/* Perfil do Administrador */}
          <div className="dropdown">
            <button 
              className="btn btn-link text-dark p-0 d-flex align-items-center gap-2"
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <FaUserCircle size={24} />
              <span>Administrador</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item">
                  Perfil
                </button>
              </li>
              <li>
                <button className="dropdown-item">
                  Definições
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger">
                  Terminar Sessão
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 