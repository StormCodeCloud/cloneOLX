import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaHome, FaMobileAlt, FaTshirt, FaCouch, FaBicycle } from 'react-icons/fa';
import './HomePage.css';

const categories = [
  { name: 'Automóveis', icon: <FaCar size={28} /> },
  { name: 'Imóveis', icon: <FaHome size={28} /> },
  { name: 'Tecnologia', icon: <FaMobileAlt size={28} /> },
  { name: 'Vestuário', icon: <FaTshirt size={28} /> },
  { name: 'Mobiliário', icon: <FaCouch size={28} /> },
  { name: 'Desporto', icon: <FaBicycle size={28} /> },
];

const products = [
  {
    id: '1',
    title: 'Bicicleta Urbana',
    price: '800€',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=Bicicleta',
    location: 'Lisboa',
  },
  {
    id: '2',
    title: 'iPhone 13',
    price: '1.500€',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=iPhone+13',
    location: 'Porto',
  },
  {
    id: '3',
    title: 'Sofá 3 Lugares',
    price: '1.200€',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=Sofa',
    location: 'Coimbra',
  },
  {
    id: '4',
    title: 'Camisola Nike',
    price: '60€',
    image: 'https://dummyimage.com/400x300/ced4da/495057.jpg&text=Camisola',
    location: 'Faro',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Barra de pesquisa */}
      <section className="search-section">
        <div className="container">
          <h2 className="section-title">O que procura hoje?</h2>
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Pesquisar produtos ou serviços..." 
            />
            <button className="btn btn-primary" type="submit">Pesquisar</button>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Categorias</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.name} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anúncios */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Anúncios Recentes</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} className="product-image" alt={product.title} />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-location">{product.location}</p>
                  <p className="product-price">{product.price}</p>
                  <Link 
                    to={`/product/${product.id}`} 
                    className="view-details-btn"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 