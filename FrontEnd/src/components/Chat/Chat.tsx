import React, { useState } from 'react';
import './Chat.css';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  sellerId: string;
  sellerName: string;
  productId: string;
  productTitle: string;
}

export const Chat: React.FC<ChatProps> = ({
  isOpen,
  onClose,
  sellerId,
  sellerName,
  productId,
  productTitle
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'buyer' | 'seller';
    timestamp: Date;
  }>>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Aqui você adicionaria a integração com o backend
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'buyer' as const,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleEndChat = () => {
    if (window.confirm('Tem a certeza que pretende terminar esta conversa? Esta ação não pode ser desfeita.')) {
      setMessages([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header-info">
            <h3>{sellerName}</h3>
            <p className="chat-product-title">{productTitle}</p>
          </div>
          <div className="chat-header-actions">
            <button className="chat-minimize-btn" onClick={onClose} title="Minimizar">
              <i className="bi bi-dash-lg"></i>
            </button>
            <button className="chat-end-btn" onClick={handleEndChat} title="Terminar conversa">
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-empty-state">
              <i className="bi bi-chat-dots"></i>
              <p>Inicie uma conversa com o vendedor</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.sender === 'buyer' ? 'sent' : 'received'}`}
              >
                <div className="message-content">{msg.text}</div>
                <div className="message-time">
                  {msg.timestamp.toLocaleTimeString('pt-PT', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva a sua mensagem..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn" disabled={!message.trim()}>
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
}; 