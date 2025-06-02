// Friends API service layer to handle all friend-related API calls

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  profile: {
    id: string;
    bio: string | null;
    profileImg: string | null;
    address: string | null;
    friends: Friend[];
    friendsCount: number;
  } | null;
  requestsCount: {
    sent: number;
    received: number;
  };
}

export interface Friend {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
}

export interface FriendRequest {
  id: string;
  receiverId?: string;
  receiverName?: string;
  receiverEmail?: string;
  receiverBio?: string | null;
  receiverProfileImg?: string | null;
  requesterId?: string;
  requesterName?: string;
  requesterEmail?: string;
  requesterBio?: string | null;
  requesterProfileImg?: string | null;
  status: string;
  createdAt: string;
  type: 'sent' | 'received';
}

export interface SearchedUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  profileImg: string | null;
  address: string | null;
  isActive: boolean;
}

// Get current user data by email
export async function getCurrentUser(email: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/me?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

// Get user's friends list
export async function getFriends(userId: string): Promise<Friend[]> {
  try {
    const response = await fetch(`/api/friends?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch friends');
    }
    
    const data = await response.json();
    return data.success ? data.friends : [];
  } catch (error) {
    console.error('Error fetching friends:', error);
    return [];
  }
}

// Send a friend request
export async function sendFriendRequest(userId: string, friendUserId: string): Promise<boolean> {
  try {
    const response = await fetch('/api/friends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, friendUserId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send friend request');
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
}

// Get friend requests (sent and received)
export async function getFriendRequests(userId: string, type?: 'sent' | 'received' | 'all'): Promise<{
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
  counts: { sent: number; received: number; total: number };
}> {
  try {
    const url = `/api/friends/requests?userId=${userId}${type ? `&type=${type}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch friend requests');
    }
    
    const data = await response.json();
    return data.success ? {
      sentRequests: data.sentRequests,
      receivedRequests: data.receivedRequests,
      counts: data.counts
    } : {
      sentRequests: [],
      receivedRequests: [],
      counts: { sent: 0, received: 0, total: 0 }
    };
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    return {
      sentRequests: [],
      receivedRequests: [],
      counts: { sent: 0, received: 0, total: 0 }
    };
  }
}

// Accept or reject a friend request
export async function handleFriendRequest(
  userId: string, 
  requestId: string, 
  action: 'accept' | 'reject'
): Promise<{ success: boolean; message: string; newFriend?: Friend }> {
  try {
    const response = await fetch('/api/friends/requests', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, requestId, action }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to handle friend request');
    }
    
    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      newFriend: data.newFriend
    };
  } catch (error) {
    console.error('Error handling friend request:', error);
    throw error;
  }
}

// Cancel a sent friend request
export async function cancelFriendRequest(userId: string, requestId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/friends/requests?userId=${userId}&requestId=${requestId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to cancel friend request');
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error cancelling friend request:', error);
    throw error;
  }
}

// Search for users by ID, name, or email
export async function searchUser(userId: string, searchQuery: string): Promise<SearchedUser | null> {
  try {
    const response = await fetch(`/api/friends/search?userId=${userId}&searchUserId=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'User not found');
    }
    
    const data = await response.json();
    return data.success ? data.user : null;
  } catch (error) {
    console.error('Error searching user:', error);
    throw error;
  }
}

// Search for multiple users by name or email
export async function searchUsers(userId: string, searchQuery: string): Promise<SearchedUser[]> {
  try {
    const response = await fetch(`/api/friends/search?userId=${userId}&q=${encodeURIComponent(searchQuery)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Search failed');
    }
    
    const data = await response.json();
    return data.success ? data.users || [data.user].filter(Boolean) : [];
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

// Remove a friend
export async function removeFriend(userId: string, friendId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/friends/${friendId}?userId=${userId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to remove friend');
    }
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error removing friend:', error);
    throw error;
  }
}

// Check friendship status between two users
export async function getFriendshipStatus(
  currentUser: User | null, 
  targetUserId: string
): Promise<'none' | 'friends' | 'request_sent' | 'request_received'> {
  if (!currentUser || !currentUser.profile) return 'none';
  
  // Check if they are already friends
  const isFriend = currentUser.profile.friends.some(friend => friend.userId === targetUserId);
  if (isFriend) return 'friends';
  
  try {
    // Check for pending friend requests
    const requests = await getFriendRequests(currentUser.id);
    
    // Check if current user sent a request to target user
    const sentRequest = requests.sentRequests.find(req => req.receiverId === targetUserId);
    if (sentRequest) return 'request_sent';
    
    // Check if target user sent a request to current user
    const receivedRequest = requests.receivedRequests.find(req => req.requesterId === targetUserId);
    if (receivedRequest) return 'request_received';
    
    return 'none';
  } catch (error) {
    console.error('Error checking friendship status:', error);
    return 'none';
  }
}
