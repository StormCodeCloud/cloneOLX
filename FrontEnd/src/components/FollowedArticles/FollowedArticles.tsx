import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaBell } from 'react-icons/fa';
import './FollowedArticles.css';

interface Article {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  location: string;
  seller: {
    id: string;
    name: string;
  };
  createdAt: Date;
  notificationsEnabled: boolean;
}

export const FollowedArticles: React.FC = () => {
  const [followedArticles, setFollowedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // TODO: Fetch followed articles from API
    const fetchFollowedArticles = async () => {
      try {
        const response = await fetch('/api/followed-articles');
        const data = await response.json();
        setFollowedArticles(data);
      } catch (error) {
        console.error('Error fetching followed articles:', error);
      }
    };

    fetchFollowedArticles();
  }, []);

  const unfollowArticle = async (id: string) => {
    try {
      await fetch(`/api/followed-articles/${id}`, {
        method: 'DELETE',
      });
      setFollowedArticles(prev => prev.filter(article => article.id !== id));
    } catch (error) {
      console.error('Error unfollowing article:', error);
    }
  };

  const toggleNotifications = async (id: string) => {
    try {
      const article = followedArticles.find(a => a.id === id);
      if (!article) return;

      await fetch(`/api/followed-articles/${id}/notifications`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enabled: !article.notificationsEnabled,
        }),
      });

      setFollowedArticles(prev =>
        prev.map(a =>
          a.id === id
            ? { ...a, notificationsEnabled: !a.notificationsEnabled }
            : a
        )
      );
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  };

  return (
    <div className="followed-articles">
      <h2>Anúncios Seguidos</h2>
      {followedArticles.length === 0 ? (
        <p className="no-articles">Você ainda não está seguindo nenhum anúncio</p>
      ) : (
        <div className="articles-grid">
          {followedArticles.map(article => (
            <div key={article.id} className="article-card">
              <Link to={`/article/${article.id}`} className="article-image">
                <img src={article.imageUrl} alt={article.title} />
              </Link>
              <div className="article-info">
                <Link to={`/article/${article.id}`} className="article-title">
                  {article.title}
                </Link>
                <p className="article-price">
                  {article.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p className="article-location">{article.location}</p>
                <p className="article-seller">
                  Vendedor: {article.seller.name}
                </p>
                <span className="article-date">
                  Publicado em: {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="article-actions">
                <button
                  onClick={() => toggleNotifications(article.id)}
                  className={`btn-notify ${
                    article.notificationsEnabled ? 'active' : ''
                  }`}
                  title="Ativar/desativar notificações"
                >
                  <FaBell />
                </button>
                <button
                  onClick={() => unfollowArticle(article.id)}
                  className="btn-unfollow"
                  title="Deixar de seguir"
                >
                  <FaHeart />
                </button>
                <button
                  onClick={() => unfollowArticle(article.id)}
                  className="btn-delete"
                  title="Remover dos seguidos"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 