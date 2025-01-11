import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    withCredentials: true,
    autoConnect: false,
    transports: ['websocket'],  // Ensure WebSocket is used
});

// Enable debugging for Socket.io client
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (err) => {
    console.error('Connect error:', err);
});

socket.on('disconnect', () => {
    console.log('Disconnected');
});
export default socket;