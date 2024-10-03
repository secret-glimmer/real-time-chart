import React, { createContext, useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState(null);

    // const socketUrl = 'ws://localhost:8080';
    const socketUrl = 'wss://chart-hive-server.onrender.com';

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        shouldReconnect: () => true, // Always attempt to reconnect
        reconnectAttempts: Number.MAX_VALUE, // Infinite reconnect attempts
        reconnectInterval: 3000, // Reconnect every 3 seconds
    });

    // Handle incoming WebSocket messages
    useEffect(() => {
        if (!lastMessage) return;
        
        const updatedData = JSON.parse(lastMessage.data);
        setData(updatedData);
    }, [lastMessage]);

    return (
        <WebSocketContext.Provider value={data}>
            {children}
        </WebSocketContext.Provider>
    );
};
