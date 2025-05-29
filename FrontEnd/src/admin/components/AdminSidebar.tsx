import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaClipboardList, 
  FaTags, 
  FaExclamationTriangle,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <FaHome size={20} />, label: 'Painel Principal' },
    { path: '/admin/users', icon: <FaUsers size={20} />, label: 'Utilizadores' },
    { path: '/admin/ads', icon: <FaClipboardList size={20} />, label: 'Anúncios' },
    { path: '/admin/categories', icon: <FaTags size={20} />, label: 'Categorias' },
    { path: '/admin/reports', icon: <FaExclamationTriangle size={20} />, label: 'Denúncias' },
    { path: '/admin/settings', icon: <FaCog size={20} />, label: 'Definições' },
  ];

  const handleLogout = () => {
    // Implementar lógica de logout
    localStorage.removeItem('bearer_token');
    window.location.href = '/login';
  };

  return (
    <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3 border-bottom border-secondary">
        <h5 className="mb-0">ClassiPlace Admin</h5>
      </div>

      <div className="p-3">
        <nav className="nav flex-column">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link d-flex align-items-center gap-2 text-white-50 py-2 ${
                location.pathname === item.path ? 'active bg-primary rounded' : ''
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-3 border-top border-secondary">
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger d-flex align-items-center gap-2 w-100"
        >
          <FaSignOutAlt size={20} />
          <span>Terminar Sessão</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 