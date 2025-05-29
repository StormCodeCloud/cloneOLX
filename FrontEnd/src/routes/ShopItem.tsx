import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';
import { Chat } from '../components/Chat/Chat';
import './ShopItem.css';

const ShopItem: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Dados simulados do produto e vendedor
  const productData = {
    id: '123',
    title: 'iPhone 13 Pro Max - 256GB - Grafite',
    seller: {
      id: '456',
      name: 'João Silva'
    }
  };

  return (
    <>
      {/* Custom Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            ClassiPlace
          </Link>

          <div className="navbar-actions">
            <ThemeToggle />
            <Link to="/login" className="btn btn-outline">
              Iniciar Sessão
            </Link>
            <Link to="/register" className="btn btn-primary">
              Registar
            </Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/">Página Inicial</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/category/electronics">Telemóveis e Tablets</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/category/electronics/phones">Telemóveis</Link>
            </li>
            <li className="breadcrumb-item">iPhone 13 Pro Max</li>
          </ul>
        </nav>

        <div className="product-container">
          {/* Image Gallery */}
          <div className="image-gallery">
            <img 
              src="https://dummyimage.com/600x400/dee2e6/6c757d.jpg" 
              alt="iPhone 13 Pro Max" 
              className="main-image"
            />
            <div className="thumbnail-grid">
              {[1, 2, 3, 4].map((num) => (
                <img
                  key={num}
                  src={`https://dummyimage.com/100x100/dee2e6/6c757d.jpg`}
                  alt={`Miniatura ${num}`}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{productData.title}</h1>
            <div className="product-price">6.999,00 €</div>
            
            <div className="seller-info">
              <div className="seller-name">{productData.seller.name}</div>
              <div className="seller-location">
                <i className="bi bi-geo-alt"></i>
                Lisboa, Portugal
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn btn-primary btn-contact"
                onClick={() => setIsChatOpen(true)}
              >
                <i className="bi bi-chat-dots me-2"></i>
                Contactar Vendedor
              </button>
              <button className="btn btn-outline btn-contact">
                <i className="bi bi-heart me-2"></i>
                Adicionar aos Favoritos
              </button>
            </div>
          </div>

          {/* Description */}
          <section className="description-section">
            <h2 className="description-title">Descrição</h2>
            <p className="description-content">
              iPhone 13 Pro Max em excelente estado, com apenas 6 meses de utilização.
              Inclui todos os acessórios originais: carregador, cabo, auriculares e caixa.
              Ainda com garantia Apple até março de 2024.
              
              Telemóvel sem qualquer marca de uso, sempre utilizado com capa e película de proteção.
              Desbloqueado para todas as operadoras.
            </p>

            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Marca</span>
                <span className="detail-value">Apple</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Modelo</span>
                <span className="detail-value">iPhone 13 Pro Max</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Armazenamento</span>
                <span className="detail-value">256GB</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Estado</span>
                <span className="detail-value">Usado</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Localização</span>
                <span className="detail-value">Lisboa</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Garantia</span>
                <span className="detail-value">Sim, até março 2024</span>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <section className="safety-tips">
            <h3 className="safety-title">
              <i className="bi bi-shield-check"></i>
              Dicas de Segurança
            </h3>
            <ul className="safety-list">
              <li className="safety-item">
                <i className="bi bi-check-circle"></i>
                Não efetue pagamentos antes de verificar o artigo
              </li>
              <li className="safety-item">
                <i className="bi bi-check-circle"></i>
                Encontre o vendedor num local público e seguro
              </li>
              <li className="safety-item">
                <i className="bi bi-check-circle"></i>
                Verifique o artigo antes de efetuar a compra
              </li>
              <li className="safety-item">
                <i className="bi bi-check-circle"></i>
                Desconfie de preços demasiado baixos para o mercado
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Related items section */}
      <section className="related-section">
        <div className="related-container">
          <h2 className="related-title">Related products</h2>
          <div className="related-grid">
            {/* Related Product Card */}
            <div className="product-card">
              <img className="card-image" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product" />
              <div className="card-body">
                <h5 className="card-title">Fancy Product</h5>
                <div className="card-price">$40.00 - $80.00</div>
                <Link className="btn btn-outline" to="/product/1">View options</Link>
              </div>
            </div>

            {/* Related Product Card with Sale Badge */}
            <div className="product-card">
              <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
              <img className="card-image" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="Product" />
              <div className="card-body">
                <h5 className="card-title">Special Item</h5>
                <div className="d-flex justify-content-center small text-warning mb-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bi-star-fill"></div>
                  ))}
                </div>
                <div className="card-price">
                  <span className="price-original">$20.00</span>
                  <span className="price-current">$18.00</span>
                </div>
                <button className="btn btn-primary">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p>
        </div>
      </footer>

      {/* Chat Component */}
      <Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sellerId={productData.seller.id}
        sellerName={productData.seller.name}
        productId={productData.id}
        productTitle={productData.title}
      />
    </>
  );
};

export default ShopItem; 