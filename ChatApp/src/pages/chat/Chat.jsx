import classes from './Chat.module.css';
import { useState, useEffect, useRef } from 'react';
import { Container, Box, Text, ScrollArea, Button, Input } from '@mantine/core';
import { useUser } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';
import { contentType, HTTP_METHODS, httpRequest } from "../../core/utils/httpRequest";
import API_CONFIG from "../../core/utils/apiConfig";
import { useSocket } from "../../context/SocketContext";
import { v4 as uuidv4 } from "uuid";

function Chat() {
    const { friends, userDetails } = useUser();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const location = useLocation();
    const { socket } = useSocket();
    const messagesEndRef = useRef(null); // Ref for the end of the messages container
    const scrollAreaRef = useRef(null); // Ref for the ScrollArea component

    // Fetch chat messages for the selected friend
    const fetchMessages = async (chatId) => {
        try {
            const response = await httpRequest(
                `${API_CONFIG.endpoints.chat.getChat}/${chatId}`,
                HTTP_METHODS.GET,
                contentType.appJson
            );
            setMessages(response.data.data.messages);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    // Handle friend selection
    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        fetchMessages(friend.chatId);
    };

    // Handle sending a new message
    const handleSendMessage = async (friend) => {
        if (!newMessage.trim()) return;

        const message = {
            messageId: "Message" + uuidv4(),
            senderId: userDetails.userId,
            content: newMessage,
            sentAt: Date.now(),
        };

        // Add the message to the local state optimistically
        setMessages((prev) => [...prev, message]);

        // Emit the message to the server
        socket.emit("sendMessageToFriend", {
            chatId: friend.chatId,
            friendId: friend.friendId,
            message,
        });

        // Clear the input field
        setNewMessage("");
    };

    // Set up socket event listener for new messages
    useEffect(() => {
        if (!socket) {
            console.error("Socket is not initialized!");
            return;
        }

        const handleNewMessage = (data) => {
            console.log("New message received:", data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.on("newMessage", handleNewMessage);

        // Clean up the listener when the component unmounts
        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket]);

    // Handle initial friend selection from URL query params
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const userId = queryParams.get('userId');
        if (userId) {
            const friend = friends.find((f) => f.friendId === userId);
            if (friend) {
                setSelectedFriend(friend);
                fetchMessages(friend.chatId);
            }
        }
    }, [location.search, friends]);

    // Scroll to the bottom of the messages container when messages change
    useEffect(() => {
        if (scrollAreaRef.current && messagesEndRef.current) {
            // Use the ScrollArea's scrollTo method to scroll to the bottom
            scrollAreaRef.current.scrollTo({ top: messagesEndRef.current.offsetTop, behavior: "smooth" });
        }
    }, [messages]); // Trigger scroll when messages change

    return (
        <Container size="xl" className={classes.chatContainer}>
            {/* Left Section: Friends List */}
            <Box className={classes.LeftSectionBox}>
                <div className={classes.LeftSectionText}>
                    <Text weight={700} className={classes.LeftSectionBoxText}>
                        Friends
                    </Text>
                    <Text weight={700} className={classes.LeftSectionBoxText}>
                        Groups
                    </Text>
                </div>
                <ScrollArea className={classes.friendsScrollArea}>
                    {friends.map((friend) => (
                        <Box
                            key={friend.friendId}
                            className={classes.friendBox}
                            style={{
                                backgroundColor: selectedFriend?.friendId === friend.friendId ? 'rgb(74, 74, 74)' : 'rgb(17, 16, 16)',
                            }}
                            onClick={() => handleFriendClick(friend)}
                        >
                            <Text weight={500}>{friend.friendName}</Text>
                        </Box>
                    ))}
                </ScrollArea>
            </Box>
            {/* Right Section: Chat Interface */}
            <Box className={classes.rightSectionBox}>
                {selectedFriend ? (
                    <>
                        <Box className={classes.rightSectionTitileBox}>
                            <Text className={classes.rightSectionTitile} weight={700} size="lg">
                                Chat with
                            </Text>
                            <Text className={classes.rightSectionName} weight={700} size="lg">
                                {selectedFriend.friendName}
                            </Text>
                        </Box>
                        <ScrollArea
                            style={{ flex: 1, marginBottom: '10px' }}
                            viewportRef={scrollAreaRef} // Attach the ref to the ScrollArea
                        >
                            {messages.map((message, index) => (
                                <Box
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: (message.senderId === userDetails.userId) ? 'var(--primary-color)' : 'var(--outline-field-color)',
                                        marginLeft: (message.senderId === userDetails.userId) ? 'auto' : '0',
                                        borderRadius: '10px',
                                        width: "max-content",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: (message.senderId === userDetails.userId) ? '' : 'var(--second-color)',
                                        }}
                                    >
                                        {message.content}
                                    </Text>
                                    <Text size="xs" color="var(--second-color)" mt="xs">
                                        {new Date(message.sentAt).toLocaleTimeString()}
                                    </Text>
                                </Box>
                            ))}
                            {/* Empty div to act as a scroll target */}
                            <div ref={messagesEndRef} />
                        </ScrollArea>
                        <Box style={{ display: 'flex', gap: '10px' }}>
                            <Input
                                style={{ flex: 1 }}
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button onClick={() => handleSendMessage(selectedFriend)}>Send</Button>
                        </Box>
                    </>
                ) : (
                    <Text>Select a friend to start chatting</Text>
                )}
            </Box>
        </Container>
    );
}

export default Chat;