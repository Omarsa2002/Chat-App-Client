import { createContext, useContext, useState } from 'react';
import API_CONFIG from "../core/utils/apiConfig";
import { contentType, HTTP_METHODS, httpRequest } from "../core/utils/httpRequest";

// Create UserContext
const UserContext = createContext();

// Fetch user details
const getUserDetails = async () => {
    try {
        const response = await httpRequest(API_CONFIG.endpoints.user.userDetails, HTTP_METHODS.GET, contentType.appJson);
        return response.data.data[0];  // Ensure the structure matches your API response
    } catch (err) {
        console.error("Error fetching user details:", err);
        throw err;  // Ensure you handle errors gracefully
    }
};

// Logout user
const logoutUser = async () => {
    try {
        const response = await httpRequest(API_CONFIG.endpoints.auth.logout, HTTP_METHODS.POST, contentType.appJson);
        return response;
    } catch (err) {
        console.error("Error during logout:", err);
        throw err;  // Handle logout failure
    }
};

// Provide UserContext
export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [requestedFriends, setRequestedFriends] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);
    const [friendsRequestsCount, setFriendsRequestsCount] = useState(0);
    const [requestedFriendsCount, setRequestedFriendsCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Clear user data (logout)
    const clearUserData = async () => {
        setIsLoading(true);
        try {
            await logoutUser();
            setUserDetails(null);
            setFriends([]);
            setFriendRequests([]);
            setRequestedFriends([]);
            setFriendsCount(0);
            setFriendsRequestsCount(0);
            setRequestedFriendsCount(0)
            localStorage.clear();  // Ensure you clear localStorage after logout
        } catch (err) {
            console.error("Failed to clear user data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user details
    const fetchUserDetails = async () => {
        setIsLoading(true);
        try {
            const data = await getUserDetails();  // Ensure this returns expected data
            setUserDetails(data.userDetails);
            setFriends(data.friendsDetails || []);
            setFriendRequests(data.friendsRequestsDetails || []);
            setRequestedFriends(data.requestedFriendsDetails || []);
            setFriendsCount(data.friendsCount || 0);
            setFriendsRequestsCount(data.friendsRequestsCount || 0);
            setRequestedFriendsCount(data.requestedFriendsCount || 0);
        } catch (err) {
            console.error('Failed to fetch user details:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider
            value={{
                userDetails,
                setUserDetails,
                friends,
                setFriends,
                friendRequests,
                setFriendRequests,
                isLoading,
                fetchUserDetails,
                requestedFriends,
                setRequestedFriends,
                friendsCount,
                friendsRequestsCount,
                requestedFriendsCount,
                setFriendsCount,
                setFriendsRequestsCount,
                setRequestedFriendsCount,
                clearUserData
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Use UserContext
export const useUser = () => useContext(UserContext);
