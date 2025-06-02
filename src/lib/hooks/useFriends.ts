'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { 
  getCurrentUser, 
  getFriends, 
  sendFriendRequest, 
  getFriendRequests,
  handleFriendRequest,
  cancelFriendRequest,
  removeFriend,
  getFriendshipStatus,
  searchUser,
  User,
  Friend,
  FriendRequest,
  SearchedUser
} from '../friendsApi';

// Hook for managing current user data
export function useCurrentUser() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!session?.user?.email) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userData = await getCurrentUser(session.user.email);
      setUser(userData);
    } catch (err) {
      console.error('Error fetching current user:', err);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
  };
}

// Hook for managing friends list
export function useFriends(userId?: string) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    if (!userId) {
      setFriends([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const friendsData = await getFriends(userId);
      setFriends(friendsData);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to fetch friends');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const removeFriendFromList = useCallback(async (friendId: string) => {
    if (!userId) return false;

    try {
      const success = await removeFriend(userId, friendId);
      if (success) {
        setFriends(prev => prev.filter(friend => friend.id !== friendId));
      }
      return success;
    } catch (err) {
      console.error('Error removing friend:', err);
      throw err;
    }
  }, [userId]);

  return {
    friends,
    loading,
    error,
    refetch: fetchFriends,
    removeFriend: removeFriendFromList,
  };
}

// Hook for managing friend requests
export function useFriendRequests(userId?: string) {
  const [requests, setRequests] = useState<{
    sent: FriendRequest[];
    received: FriendRequest[];
    counts: { sent: number; received: number; total: number };
  }>({
    sent: [],
    received: [],
    counts: { sent: 0, received: 0, total: 0 }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    if (!userId) {
      setRequests({
        sent: [],
        received: [],
        counts: { sent: 0, received: 0, total: 0 }
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const requestsData = await getFriendRequests(userId);
      setRequests({
        sent: requestsData.sentRequests,
        received: requestsData.receivedRequests,
        counts: requestsData.counts
      });
    } catch (err) {
      console.error('Error fetching friend requests:', err);
      setError('Failed to fetch friend requests');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const acceptRequest = useCallback(async (requestId: string) => {
    if (!userId) return null;

    try {
      const result = await handleFriendRequest(userId, requestId, 'accept');
      if (result.success) {
        await fetchRequests();
      }
      return result;
    } catch (err) {
      console.error('Error accepting friend request:', err);
      throw err;
    }
  }, [userId, fetchRequests]);

  const rejectRequest = useCallback(async (requestId: string) => {
    if (!userId) return null;

    try {
      const result = await handleFriendRequest(userId, requestId, 'reject');
      if (result.success) {
        await fetchRequests();
      }
      return result;
    } catch (err) {
      console.error('Error rejecting friend request:', err);
      throw err;
    }
  }, [userId, fetchRequests]);

  const cancelRequest = useCallback(async (requestId: string) => {
    if (!userId) return false;

    try {
      const success = await cancelFriendRequest(userId, requestId);
      if (success) {
        await fetchRequests();
      }
      return success;
    } catch (err) {
      console.error('Error cancelling friend request:', err);
      throw err;
    }
  }, [userId, fetchRequests]);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest,
  };
}

// Hook for friend actions (send request, check status, etc.)
export function useFriendActions(currentUser: User | null) {
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async (targetUserId: string) => {
    if (!currentUser) return false;

    try {
      setLoading(true);
      const success = await sendFriendRequest(currentUser.id, targetUserId);
      return success;
    } catch (err) {
      console.error('Error sending friend request:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const checkFriendshipStatus = useCallback(async (targetUserId: string) => {
    return await getFriendshipStatus(currentUser, targetUserId);
  }, [currentUser]);

  const searchForUser = useCallback(async (searchUserId: string) => {
    if (!currentUser) return null;

    try {
      setLoading(true);
      const user = await searchUser(currentUser.id, searchUserId);
      return user;
    } catch (err) {
      console.error('Error searching for user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  return {
    loading,
    sendRequest,
    checkFriendshipStatus,
    searchForUser,
  };
}

// Hook for user search functionality
export function useUserSearch() {
  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user: currentUser } = useCurrentUser();

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!currentUser || !searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Try to search for multiple users first
      const { searchUsers: searchMultipleUsers } = await import('../friendsApi');
      const users = await searchMultipleUsers(currentUser.id, searchQuery.trim());
      
      if (users.length > 0) {
        setSearchResults(users);
      } else {
        // Fallback to single user search
        const user = await searchUser(currentUser.id, searchQuery.trim());
        setSearchResults(user ? [user] : []);
      }
    } catch (err: any) {
      console.error('Error searching users:', err);
      setError(err.message || 'Failed to search users');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    loading,
    error,
    searchUsers,
    clearResults,
  };
}
