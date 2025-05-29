import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  error: null
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('bearer_token');

    if (!token) {
      setError('No authentication token found. Please login.');
      return;
    }

    const newSocket = io('http://localhost:5000', {
      auth: {
        token: token
      }
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    newSocket.on('connect_error', (err) => {
      setIsConnected(false);
      if (err.message === 'Invalid token' || err.message === 'No token provided') {
        setError('Authentication failed. Please login again.');
        localStorage.removeItem('bearer_token');
      } else {
        setError('Connection failed: ' + err.message);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, error }}>
      {children}
    </SocketContext.Provider>
  );
}; 