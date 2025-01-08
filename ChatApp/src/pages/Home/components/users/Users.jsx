import { useState, useEffect } from 'react';
import { Container, Title, Text, Button, SimpleGrid, Card } from '@mantine/core';
import API_CONFIG from "../../../../core/utils/apiConfig";
import { contentType, HTTP_METHODS, httpRequest } from "../../../../core/utils/httpRequest";
import classes from './users.module.css';
import { useUser } from '../../../../context/UserContext';

function Users() {
    // Access global user data from context
    const { userDetails, 
            friends, setFriends, 
            friendRequests, setFriendRequests, 
            requestedFriends, setRequestedFriends,
            setFriendsCount,
            setFriendsRequestsCount,
            setRequestedFriendsCount
        } = useUser();
    // Component state for managing the list of all users
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await httpRequest(
                API_CONFIG.endpoints.user.allUsers,
                HTTP_METHODS.GET,
                contentType.appJson
            );
            setUsers(response.data.data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    // Handle Add Friend
    const handleAddFriendClick = async (userId) => {
        try {
            await httpRequest(
                API_CONFIG.endpoints.user.sendFriendRequest,
                HTTP_METHODS.PATCH,
                contentType.appJson,
                { requestId: userId }
            );
            setRequestedFriends((prev) => [...prev, { requestedId: userId }]);
            setRequestedFriendsCount((prevCount) => prevCount + 1);
        } catch (err) {
            console.error('Error sending friend request:', err);
        }
    };
    // Handle Accept Friend Request
    const handleAcceptRequestClick = async (userId) => {
        try {
            await httpRequest(
                API_CONFIG.endpoints.user.acceptFriendRequest,
                HTTP_METHODS.PATCH,
                contentType.appJson,
                { friendId: userId }
            );
            setFriends((prev) => [...prev, { friendId: userId }]); // Update friends optimistically
            setFriendRequests((prev) => prev.filter((req) => req.requestId !== userId)); // Remove from requests
            setFriendsCount((prevCount) => prevCount + 1);
            setFriendsRequestsCount((prevCount) => prevCount - 1);
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };
    const handleCancelRequestClick = async (userId) => {
        try {
            await httpRequest(
                API_CONFIG.endpoints.user.refuseFriendRequest,
                HTTP_METHODS.PATCH,
                contentType.appJson,
                { requestId: userId }
            );
            setFriendRequests((prev) => prev.filter((req) => req.requestId !== userId)); // Remove from requests
            setFriendsRequestsCount((prevCount) => prevCount - 1);
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };
    const handleCancelFriendRequestClick = async (userId) => {
        try {
            await httpRequest(
                API_CONFIG.endpoints.user.cancelFriendRequest,
                HTTP_METHODS.PATCH,
                contentType.appJson,
                { requestId: userId }
            );
            setRequestedFriends((prev) => prev.filter((req) => req.requestedId !== userId))
            setRequestedFriendsCount((prevCount) => {prevCount - 1});
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };
    const handleRemoveFriendClick = async (userId) => {
        try {
            await httpRequest(
                API_CONFIG.endpoints.user.removeFriend,
                HTTP_METHODS.PATCH,
                contentType.appJson,
                { friendId: userId }
            );
            setFriends((prev) => prev.filter((req) => req.friendId !== userId)); // Remove from friends
            setFriendsCount((prevCount) => prevCount - 1);
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };
    // Handle Chat
    const handleChatClick = (userId) => {
        console.log('Chat with:', userId);
    };
    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);
    // Render loading, error, or user data
    return (
        <Container size="xl" style={{ textAlign: 'center', padding: '80px 0' }}>
            <Title className={classes.title} order={1}>
                Welcome {userDetails.userName}
            </Title>
            <Text className={classes.text} size="lg" mt="md">
                Connect with your friends and family seamlessly.
            </Text>
            {isLoading && <Text>Loading users...</Text>}
            {error && <Text color="red">{error}</Text>}
            {!isLoading && !error && (
                <SimpleGrid
                    className={classes.cardContainer}
                    type="container"
                    cols={{ base: 1, '300px': 2, '500px': 3 }}
                    spacing={{ base: 10, '300px': 'xl' }}
                >
                    {users.map((user) => (
                        <Card className={classes.card} key={user.userId} shadow="sm" padding="lg">
                            <Title className={classes.title} order={3}>
                                {user.userName}
                            </Title>
                            <Text className={classes.text} mt="sm">
                                {user.email || 'No email provided'}
                            </Text>
                            {friends?.find((friend) => friend.friendId === user.userId) ? (
                                <>
                                    <Button onClick={() => handleChatClick(user.userId)}>Chat</Button>
                                    <Button onClick={() => handleRemoveFriendClick(user.userId)}>Remove from friends</Button>
                                </>
                            ) : friendRequests?.find((req) => req.requestId === user.userId) ? (
                                <>
                                    <Button onClick={() => handleAcceptRequestClick(user.userId)}>
                                        Accept Friend Request
                                    </Button>
                                    <Button onClick={() => handleCancelRequestClick(user.userId)}>
                                        Remove Friend Request
                                    </Button>
                                </>
                            ) : requestedFriends?.find(req=> req.requestedId === user.userId)? (
                                    <Button onClick={() => handleCancelFriendRequestClick(user.userId)}>
                                        cancel Friend Request
                                    </Button>
                                ):(
                                    <Button onClick={() => handleAddFriendClick(user.userId)}>
                                        Add Friend
                                    </Button>
                                
                            )}
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
}

export default Users;