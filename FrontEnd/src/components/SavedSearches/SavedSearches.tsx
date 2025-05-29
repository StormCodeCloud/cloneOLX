import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTrash, FaBell } from 'react-icons/fa';
import './SavedSearches.css';

interface SavedSearch {
  id: string;
  query: string;
  filters: Record<string, any>;
  notificationsEnabled: boolean;
  createdAt: Date;
}

export const SavedSearches: React.FC = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch saved searches from API
    const fetchSavedSearches = async () => {
      try {
        const response = await fetch('/api/saved-searches');
        const data = await response.json();
        setSavedSearches(data);
      } catch (error) {
        console.error('Error fetching saved searches:', error);
      }
    };

    fetchSavedSearches();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/saved-searches/${id}`, {
        method: 'DELETE',
      });
      setSavedSearches(prev => prev.filter(search => search.id !== id));
    } catch (error) {
      console.error('Error deleting saved search:', error);
    }
  };

  const toggleNotifications = async (id: string) => {
    try {
      const search = savedSearches.find(s => s.id === id);
      if (!search) return;

      await fetch(`/api/saved-searches/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notificationsEnabled: !search.notificationsEnabled,
        }),
      });

      setSavedSearches(prev =>
        prev.map(s =>
          s.id === id
            ? { ...s, notificationsEnabled: !s.notificationsEnabled }
            : s
        )
      );
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  };

  const executeSearch = (search: SavedSearch) => {
    const queryParams = new URLSearchParams({
      q: search.query,
      ...search.filters,
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="saved-searches">
      <h2>Pesquisas Salvas</h2>
      {savedSearches.length === 0 ? (
        <p className="no-searches">Você ainda não tem pesquisas salvas</p>
      ) : (
        <ul className="saved-searches-list">
          {savedSearches.map(search => (
            <li key={search.id} className="saved-search-item">
              <div className="search-info">
                <h3>{search.query}</h3>
                <p className="filters">
                  {Object.entries(search.filters)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(' • ')}
                </p>
                <span className="date">
                  Salvo em: {new Date(search.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="actions">
                <button
                  onClick={() => executeSearch(search)}
                  className="btn-execute"
                  title="Executar pesquisa"
                >
                  <FaSearch />
                </button>
                <button
                  onClick={() => toggleNotifications(search.id)}
                  className={`btn-notify ${
                    search.notificationsEnabled ? 'active' : ''
                  }`}
                  title="Ativar/desativar notificações"
                >
                  <FaBell />
                </button>
                <button
                  onClick={() => handleDelete(search.id)}
                  className="btn-delete"
                  title="Excluir pesquisa"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 