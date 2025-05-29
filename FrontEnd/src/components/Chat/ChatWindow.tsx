import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaImage } from 'react-icons/fa';
import { useSocket } from '../../contexts/SocketContext';
import './ChatWindow.css';

interface Message {
  id: number;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatWindowProps {
  adId: number;
  adTitle: string;
  sellerId: number;
  sellerName: string;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  adId,
  adTitle,
  sellerId,
  sellerName,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket, isConnected, error } = useSocket();
  const currentUserId = localStorage.getItem('user_id') || '';

  useEffect(() => {
    if (!socket) return;

    // Carregar histórico de mensagens
    socket.emit('get-chat-history', {
      adId,
      userId: currentUserId,
      sellerId
    });

    // Ouvir novas mensagens privadas
    socket.on('private-message', (data: Message) => {
      if (data.from === sellerId.toString() || data.to === sellerId.toString()) {
        setMessages(prev => [...prev, data]);
      }
    });

    // Ouvir histórico de mensagens
    socket.on('chat-history', (history: Message[]) => {
      setMessages(history);
      setIsLoading(false);
    });

    return () => {
      socket.off('private-message');
      socket.off('chat-history');
    };
  }, [socket, adId, sellerId, currentUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socket || !newMessage.trim() || !isConnected) return;

    socket.emit('private-message', {
      to: sellerId,
      message: newMessage.trim(),
      adId
    });

    setNewMessage('');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (error) {
    return (
      <div className="chat-window">
        <div className="chat-error">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-info">
          <h6 className="mb-0">{sellerName}</h6>
          <small className="text-muted">{adTitle}</small>
        </div>
        <button className="btn-close" onClick={onClose} aria-label="Fechar"></button>
      </div>

      <div className="chat-messages">
        {isLoading ? (
          <div className="text-center p-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">A carregar...</span>
            </div>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.from === currentUserId ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  <p>{message.message}</p>
                  <small className="message-time">
                    {formatTimestamp(message.timestamp)}
                    {message.from === currentUserId && (
                      <span className={`read-status ${message.isRead ? 'read' : ''}`}>
                        ✓✓
                      </span>
                    )}
                  </small>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <button
          type="button"
          className="btn btn-link text-muted"
          title="Enviar imagem"
        >
          <FaImage />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="form-control"
          disabled={!isConnected}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!newMessage.trim() || !isConnected}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow; 