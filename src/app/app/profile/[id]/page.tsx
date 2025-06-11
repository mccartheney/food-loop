 "use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileActions from "@/components/profile/ProfileActions";
import FriendModal from "@/components/profile/FriendModal"; // Import the separate component
import ProfileTradeGrid from "@/components/trades/ProfileTradeGrid";
import { useSession } from 'next-auth/react';

interface Highlight {
  id: string;
  title: string;
  imageUrl?: string;
}

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isFollowing: boolean;
}

interface Profile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  website?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
  occupation?: string;
  location: string;
  highlights: Highlight[];
}

interface Post {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

const MOCK_PROFILES: Record<"1" | "2" | "3" | "4" | "5" | "6" | "7", Profile> =
  {
    "1": {
      id: "1",
      username: "manuel_tomas",
      displayName: "Manuel Tomas",
      avatar: "/avatars/user1.png",
      bio: "Photographer and traveler based in Porto.",
      website: "linktr.ee/manuel_tomas",
      postsCount: 22,
      followersCount: 1046,
      followingCount: 922,
      isVerified: false,
      occupation: "Photographer",
      location: "Porto",
      highlights: [
        { id: "1", title: "Travel" },
        { id: "2", title: "Nature" },
        { id: "3", title: "Food" },
      ],
    },
    "2": {
      id: "2",
      username: "manuel_luis",
      displayName: "Manuel Luis",
      avatar: "/avatars/user2.png",
      bio: "Digital creator and content maker from Lisbon.",
      website: "linktr.ee/manuel_luis",
      postsCount: 47,
      followersCount: 1832,
      followingCount: 421,
      isVerified: true,
      occupation: "Digital Creator",
      location: "Lisbon",
      highlights: [
        { id: "1", title: "Lisbon" },
        { id: "2", title: "Art" },
        { id: "3", title: "Studio" },
      ],
    },
    "3": {
      id: "3",
      username: "manuel_mc",
      displayName: "Manuel MC",
      avatar: "/avatars/user3.png",
      bio: "Music producer and artist from Faro.",
      website: "soundcloud.com/manuel_mc",
      postsCount: 35,
      followersCount: 1240,
      followingCount: 567,
      isVerified: false,
      occupation: "Music Producer",
      location: "Faro",
      highlights: [
        { id: "1", title: "Music" },
        { id: "2", title: "Studio" },
      ],
    },
    "4": {
      id: "4",
      username: "manuel_joao",
      displayName: "Manuel Joao",
      avatar: "/avatars/user4.png",
      bio: "Chef and food lover from Braga.",
      website: "instagram.com/chef_manuel",
      postsCount: 68,
      followersCount: 2340,
      followingCount: 478,
      isVerified: false,
      occupation: "Chef",
      location: "Braga",
      highlights: [
        { id: "1", title: "Food" },
        { id: "2", title: "Recipes" },
      ],
    },
    "5": {
      id: "5",
      username: "manuel_afonso",
      displayName: "Manuel Afonso",
      avatar: "/avatars/user5.png",
      bio: "Tech student from Coimbra University.",
      postsCount: 15,
      followersCount: 542,
      followingCount: 231,
      location: "Coimbra",
      highlights: [
        { id: "1", title: "Tech" },
        { id: "2", title: "Coding" },
      ],
    },
    "6": {
      id: "6",
      username: "manuel_leandro",
      displayName: "Manuel Leandro",
      avatar: "/avatars/user6.png",
      bio: "Surf instructor and ocean lover.",
      postsCount: 42,
      followersCount: 1320,
      followingCount: 356,
      occupation: "Surf Instructor",
      location: "Setubal",
      highlights: [
        { id: "1", title: "Surf" },
        { id: "2", title: "Ocean" },
      ],
    },
    "7": {
      id: "7",
      username: "manuel_zacarias",
      displayName: "Manuel Zacarias",
      avatar: "/avatars/user7.png",
      bio: "Digital designer from Aveiro.",
      website: "behance.net/manuel_z",
      postsCount: 29,
      followersCount: 876,
      followingCount: 234,
      occupation: "Designer",
      location: "Aveiro",
      highlights: [
        { id: "1", title: "Design" },
        { id: "2", title: "UI/UX" },
      ],
    },
  };

const convertProfilesToFriends = (): Friend[] => {
  return Object.values(MOCK_PROFILES).map((profile) => ({
    id: profile.id,
    username: profile.username,
    displayName: profile.displayName,
    avatar: profile.avatar,
    isFollowing: Math.random() > 0.5,
  }));
};

type ValidProfileId = keyof typeof MOCK_PROFILES;

const generateMockPosts = (userId: string): Post[] => {
  const count = 9;
  const posts: Post[] = [];

  for (let i = 0; i < count; i++) {
    posts.push({
      id: `post-${userId}-${i}`,
      imageUrl: `/images/mock-post-${(i % 3) + 1}.jpg`,
      likes: Math.floor(Math.random() * 200) + 50,
      comments: Math.floor(Math.random() * 30) + 5,
    });
  }

  return posts;
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);

  const handleFriendClick = (friendId: string) => {
    router.push(`/app/profile/${friendId}`);
    setIsFriendsModalOpen(false); // Close the modal after navigation
  };

  const handleFriendsClick = () => {
    setIsFriendsModalOpen(true);
  };

  useEffect(() => {
    if (isFriendsModalOpen) {
      setFriendsList(convertProfilesToFriends());
    }
  }, [isFriendsModalOpen]);

  // Fetch current user profile data
  useEffect(() => {
    const fetchCurrentUserProfile = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/me');
          if (response.ok) {
            const userData = await response.json();
            setCurrentUserProfile(userData);
          }
        } catch (error) {
          console.error('Error fetching current user profile:', error);
        }
      }
    };

    fetchCurrentUserProfile();
  }, [session]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      if (id && Object.keys(MOCK_PROFILES).includes(id)) {
        const mockProfile = MOCK_PROFILES[id as ValidProfileId];
        setProfile(mockProfile);
        setPosts(generateMockPosts(id));
      } else {
        setProfile(null);
      }
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
        <p className="text-gray-600 mb-6">
          The profile you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/app/messages" className="btn btn-primary">
          Back to messages
        </Link>
      </div>
    );
  }

  const profileContent = (
    <main className="max-w-4xl mx-auto pb-16 bg-white min-h-screen">
      {/* Using ProfileHeader component */}
      <ProfileHeader username={profile.username} />

      <div className="p-4">
        <div className="flex items-start">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-20 h-20 rounded-full bg-base-200 border-2 border-base-200 ring-2 ring-primary ring-offset-2 flex items-center justify-center">
              <div className="text-3xl flex items-center justify-center h-full text-gray-400">
                {profile.displayName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-around ml-4">
            <div className="text-center">
              <div className="font-semibold">{profile.postsCount}</div>
              <div className="text-xs text-gray-500">posts</div>
            </div>
            <motion.div
              className="text-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFriendsClick}
            >
              <div className="font-semibold">{profile.followersCount}</div>
              <div className="text-xs text-gray-500">Friends</div>
            </motion.div>
          </div>
        </div>

        {/* Bio information */}
        <div className="mt-4">
          <h2 className="font-semibold text-sm">
            {profile.displayName}
            {profile.isVerified && (
              <span className="ml-1 text-blue-500">✓</span>
            )}
          </h2>
          {profile.occupation && (
            <div className="text-sm text-gray-500">{profile.occupation}</div>
          )}
          <p className="text-sm mt-1">{profile.bio || ""}</p>
          {profile.website && (
            <a
              href={profile.website}
              className="text-sm text-primary font-medium block mt-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.website}
            </a>
          )}
          {profile.location && (
            <p className="text-xs text-gray-500 mt-1">📍 {profile.location}</p>
          )}
        </div>

        {/* ProfileActions component */}
        <ProfileActions userId={profile.id} />
      </div>

      {/* Trade Grid - replaces posts */}
      <ProfileTradeGrid
        userId={id || ''}
        userEmail={session?.user?.email || undefined}
        isOwnProfile={currentUserProfile?.id === id}
      />

      {/* Using the imported FriendModal component */}
      <FriendModal
        isOpen={isFriendsModalOpen}
        onClose={() => setIsFriendsModalOpen(false)}
        friends={friendsList}
        onFriendClick={handleFriendClick}
      />
    </main>
  );

  // Wrap the profile content with DashboardLayout
  return <DashboardLayout>{profileContent}</DashboardLayout>;
}
