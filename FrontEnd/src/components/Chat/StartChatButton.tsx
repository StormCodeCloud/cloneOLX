import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import ChatWindow from './ChatWindow';

interface StartChatButtonProps {
  adId: number;
  adTitle: string;
  sellerId: number;
  sellerName: string;
}

const StartChatButton: React.FC<StartChatButtonProps> = ({
  adId,
  adTitle,
  sellerId,
  sellerName
}) => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    const token = localStorage.getItem('bearer_token');
    if (!token) {
      // Redirecionar para login ou mostrar modal de login
      alert('Por favor, faça login para enviar mensagens.');
      return;
    }
    setShowChat(true);
  };

  return (
    <>
      <button
        className="btn btn-primary d-flex align-items-center gap-2"
        onClick={handleStartChat}
      >
        <FaComments />
        Enviar Mensagem
      </button>

      {showChat && (
        <ChatWindow
          adId={adId}
          adTitle={adTitle}
          sellerId={sellerId}
          sellerName={sellerName}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default StartChatButton; 