import { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import API_CONFIG from "../core/utils/apiConfig";
import { useUser } from "./UserContext";
import { NOTIFICATION_TYPES, showNotification } from '../core/helperMethods/showNotification'
// Create a SocketContext
const SocketContext = createContext();

// Socket URL, you can replace it with an environment variable if needed
const SOCKET_URL = API_CONFIG.socketConnection;

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const { userDetails, 
          setFriendRequests, setFriendsRequestsCount,
          setFriends,setFriendsCount,
          setRequestedFriends, setRequestedFriendsCount,
        } = useUser();
  const [connected, setConnected] = useState(false); // Track connection status
  const socketRef = useRef(null); // Use a ref to store the socket instance
  const isSocketInitialized = useRef(false); // Track if the socket has been initialized

  // Initialize or update the socket connection when userDetails changes
  useEffect(() => {
    if (!userDetails || isSocketInitialized.current) {
      // If userDetails is not available or socket is already initialized, do nothing
      return;
    }

    // Mark the socket as initialized
    isSocketInitialized.current = true;

    // Initialize the socket
    socketRef.current = io(SOCKET_URL, {
      auth: {
        user: userDetails, // Pass userDetails in the auth object
      },
      withCredentials: true,
      autoConnect: true, // Allow auto-connection
      transports: ['websocket'], // Ensure WebSocket is used
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts
    });

    // Emit "isOnline" event only once when the socket connects
    const handleConnect = () => {
      console.log('Connected to server');
      setConnected(true);
    };

    const handleFriendRequestNote = (message) => {
      showNotification(message.message, NOTIFICATION_TYPES.INFO);
      setFriendRequests((prev) => [...prev, { requesterId: message.userId }]);
      setFriendsRequestsCount((prev) => prev + 1);
    };

    // Event listener for new friend
    const handleNewFriend = (message) => {
      showNotification(message.message, NOTIFICATION_TYPES.INFO);
      setFriends((prev) => [...prev, { friendId: message.userId }]);
      setFriendsCount((prev) => prev + 1);
      setRequestedFriends((prev) => prev.filter((req) => req.recipientId !== message.userId));
      setRequestedFriendsCount((prev) => prev - 1);
    };

    // Event listener for refused friend request
    const handleRefuseFriend = (message) => {
      setRequestedFriends((prev) => prev.filter((req) => req.recipientId !== message.userId));
      setRequestedFriendsCount((prev) => prev - 1);
    };

    // Event listener for canceled friend request
    const handleCancelFriend = (message) => {
      setFriendRequests((prev) => prev.filter((req) => req.requesterId !== message.userId));
      setFriendsRequestsCount((prev) => prev - 1);
    };

    // Event listener for removed friend
    const handleRemoveFriend = (message) => {
      setFriends((prev) => prev.filter((req) => req.friendId !== message.userId));
      setFriendsCount((prev) => prev - 1);
    };

    // Event listener for connection errors
    const handleConnectError = (err) => {
      console.error('Connection error:', err);
      setConnected(false);
    };

    // Event listener for disconnect
    const handleDisconnect = (reason) => {
      console.log('Disconnected from server. Reason:', reason);
      setConnected(false);
    };

    // Add event listeners
    socketRef.current.on('connect', handleConnect);
    socketRef.current.on('friendRequestNote', handleFriendRequestNote);
    socketRef.current.on('newFriend', handleNewFriend);
    socketRef.current.on('refuseFriend', handleRefuseFriend);
    socketRef.current.on('cancelFriend', handleCancelFriend);
    socketRef.current.on('removeThisFriend', handleRemoveFriend);
    socketRef.current.on('connect_error', handleConnectError);
    socketRef.current.on('disconnect', handleDisconnect);

    // Cleanup on unmount (only disconnect when the app is fully closed)
    return () => {
      if (socketRef.current) {

        socketRef.current.off('connect', handleConnect);
        socketRef.current.off('friendRequestNote', handleFriendRequestNote);
        socketRef.current.off('newFriend', handleNewFriend);
        socketRef.current.off('refuseFriend', handleRefuseFriend);
        socketRef.current.off('cancelFriend', handleCancelFriend);
        socketRef.current.off('removeThisFriend', handleRemoveFriend);
        socketRef.current.off('connect_error', handleConnectError);
        socketRef.current.off('disconnect', handleDisconnect);

        socketRef.current.disconnect(); // Disconnect the socket on unmount
        socketRef.current = null; // Clear the socket reference
        isSocketInitialized.current = false; // Reset the initialization flag
        console.log('Socket disconnected on cleanup');
      }
    };
  }, [userDetails]); // Re-run this effect only when userDetails changes

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context in any component
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};