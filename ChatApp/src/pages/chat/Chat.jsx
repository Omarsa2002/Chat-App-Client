import { useState, useEffect } from 'react';
import { Container, Box, Text, ScrollArea, Button, Input } from '@mantine/core';
import { useUser } from '../../context/UserContext'; // Import your context

function Chat() {
    const { friends } = useUser(); // Fetch the friends list from the context
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]); // Chat messages
    const [newMessage, setNewMessage] = useState(''); // Input field value

    // Fetch chat messages for the selected friend
    const fetchMessages = async (friendId) => {
        // try {
        //     const response = await httpRequest(
        //         `${API_CONFIG.endpoints.chat.getMessages}/${friendId}`,
        //         HTTP_METHODS.GET,
        //         contentType.appJson
        //     );
        //     setMessages(response.data.messages);
        // } catch (err) {
        //     console.error('Error fetching messages:', err);
        // }
    };

    // Handle friend selection
    const handleFriendClick = (friend) => {
        setSelectedFriend(friend);
        fetchMessages(friend.friendId);
    };

    // Handle sending a new message
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Prevent empty messages
        console.log('message')
    };

    return (
        <Container size="xl" style={{ display: 'flex', height: '100vh' }}>
            {/* Left Section: Friends List */}
            <Box
                style={{
                    width: '30%',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRight: '1px solid #ddd',
                    overflowY: 'auto',
                }}
            >
                <Text weight={700} size="lg" mb="md">
                    Friends
                </Text>
                <ScrollArea style={{ height: 'calc(100vh - 50px)' }}>
                    {friends.map((friend) => (
                        <Box
                            key={friend.friendId}
                            style={{
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: selectedFriend?.friendId === friend.friendId ? '#ddd' : '#fff',
                                cursor: 'pointer',
                                borderRadius: '5px',
                            }}
                            onClick={() => handleFriendClick(friend)}
                        >
                            <Text weight={500}>{friend.friendName}</Text>
                        </Box>
                    ))}
                </ScrollArea>
            </Box>

            {/* Right Section: Chat Interface */}
            <Box
                style={{
                    flex: 1,
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {selectedFriend ? (
                    <>
                        <Text weight={700} size="lg" mb="md">
                            Chat with {selectedFriend.friendName}
                        </Text>
                        <ScrollArea style={{ flex: 1, marginBottom: '10px' }}>
                            {messages.map((message, index) => (
                                <Box
                                    key={index}
                                    style={{
                                        padding: '10px',
                                        marginBottom: '10px',
                                        backgroundColor: message.isSentByMe ? '#d4f5d4' : '#f5d4d4',
                                        alignSelf: message.isSentByMe ? 'flex-end' : 'flex-start',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <Text>{message.text}</Text>
                                    <Text size="xs" color="gray" mt="xs">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </Text>
                                </Box>
                            ))}
                        </ScrollArea>
                        <Box style={{ display: 'flex', gap: '10px' }}>
                            <Input
                                style={{ flex: 1 }}
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button onClick={handleSendMessage}>Send</Button>
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
