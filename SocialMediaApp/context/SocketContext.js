// context/SocketContext.js
import React, { createContext, useEffect, useRef, useContext, useState } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (currentUser?.username) {
      socketRef.current = io("http://192.168.1.7:8900");
      setSocket(socketRef.current);

      socketRef.current.emit("login", currentUser.username);

      socketRef.current.on("forceLogout", (data) => {
        console.log("Force logout:", data.message);
      });

    } else {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        console.log("Socket disconnected");
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("forceLogout");
      }
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);