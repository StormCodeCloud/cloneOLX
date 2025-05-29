import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle';
import './CreatePost.css';

interface PostData {
  title: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  images: File[];
}

const CreatePost: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: '',
    images: []
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<PostData>>({});

  const categories = [
    'Veículos',
    'Tecnologia',
    'Imóveis',
    'Móveis e Decoração',
    'Electrodomésticos',
    'Moda e Acessórios',
    'Desporto e Lazer',
    'Animais',
    'Outros'
  ];

  const conditions = [
    'Novo',
    'Como Novo',
    'Bom Estado',
    'Usado',
    'Para Peças'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 10) {
      alert('Pode carregar no máximo 10 imagens');
      return;
    }

    setPostData(prev => ({ ...prev, images: files }));

    // Criar URLs para preview
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(newPreviewUrls);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPostData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PostData> = {};

    if (!postData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    if (!postData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }
    if (!postData.price.trim()) {
      newErrors.price = 'O preço é obrigatório';
    }
    if (!postData.category) {
      newErrors.category = 'Selecione uma categoria';
    }
    if (!postData.condition) {
      newErrors.condition = 'Selecione o estado do artigo';
    }
    if (!postData.location.trim()) {
      newErrors.location = 'A localização é obrigatória';
    }
    if (postData.images.length === 0) {
      newErrors.images = 'Adicione pelo menos uma imagem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Aqui você adicionaria a integração com o backend
    console.log('Dados do anúncio:', postData);
    // Após sucesso, redirecionar para a página do anúncio
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            ClassiPlace
          </Link>

          <div className="navbar-actions">
            <ThemeToggle />
            <Link to="/profile" className="btn btn-outline">
              Minha Conta
            </Link>
          </div>
        </div>
      </nav>

      <main className="create-post-content">
        <div className="create-post-container">
          <h1>Criar Novo Anúncio</h1>

          <form onSubmit={handleSubmit} className="create-post-form">
            {/* Imagens */}
            <div className="form-section">
              <h2>Fotografias</h2>
              <div className="image-upload-container">
                <div className="image-upload-area">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <div className="upload-placeholder">
                    <i className="bi bi-cloud-upload"></i>
                    <p>Arraste as suas fotografias ou clique para carregar</p>
                    <span>Máximo 10 fotografias</span>
                  </div>
                </div>
                {errors.images && <span className="error-message">{errors.images}</span>}
                
                {previewImages.length > 0 && (
                  <div className="image-preview-grid">
                    {previewImages.map((url, index) => (
                      <div key={index} className="preview-image">
                        <img src={url} alt={`Preview ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="form-section">
              <h2>Informações Básicas</h2>
              
              <div className="form-group">
                <label htmlFor="title">Título do Anúncio*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: iPhone 13 Pro Max 256GB Grafite"
                  className={errors.title ? 'error' : ''}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição*</label>
                <textarea
                  id="description"
                  name="description"
                  value={postData.description}
                  onChange={handleInputChange}
                  placeholder="Descreva o seu artigo em detalhe..."
                  rows={6}
                  className={errors.description ? 'error' : ''}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Preço*</label>
                  <div className="price-input-container">
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={postData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className={errors.price ? 'error' : ''}
                    />
                    <span className="currency">€</span>
                  </div>
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="condition">Estado*</label>
                  <select
                    id="condition"
                    name="condition"
                    value={postData.condition}
                    onChange={handleInputChange}
                    className={errors.condition ? 'error' : ''}
                  >
                    <option value="">Selecione o estado</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                  {errors.condition && <span className="error-message">{errors.condition}</span>}
                </div>
              </div>
            </div>

            {/* Categoria e Localização */}
            <div className="form-section">
              <h2>Categoria e Localização</h2>

              <div className="form-group">
                <label htmlFor="category">Categoria*</label>
                <select
                  id="category"
                  name="category"
                  value={postData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location">Localização*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={postData.location}
                  onChange={handleInputChange}
                  placeholder="Ex: Lisboa, Portugal"
                  className={errors.location ? 'error' : ''}
                />
                {errors.location && <span className="error-message">{errors.location}</span>}
              </div>
            </div>

            <div className="form-actions">
              <Link to="/" className="btn btn-outline">Cancelar</Link>
              <button type="submit" className="btn btn-primary">
                Publicar Anúncio
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreatePost; 