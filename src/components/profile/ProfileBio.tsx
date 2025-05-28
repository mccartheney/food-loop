interface UserType {
    id: string;
    username: string;
    displayName: string;
    bio?: string;
    occupation?: string;
    website?: string;
    isVerified?: boolean;
  }
  
  interface ProfileBioProps {
    user: UserType;
  }
  
  export default function ProfileBio({ user }: ProfileBioProps) {
    return (
      <div className="mt-4">
        <h2 className="font-semibold text-sm">
          {user.displayName}
          {user.isVerified && (
            <span className="inline-flex ml-1 items-center">
              <span className="badge badge-sm badge-primary badge-outline">✓</span>
            </span>
          )}
        </h2>
        
        {user.occupation && (
          <div className="text-sm text-gray-500">{user.occupation}</div>
        )}
        
        <p className="text-sm mt-1">{user.bio || ""}</p>
        
        {user.website && (
          <a 
            href={user.website} 
            className="text-sm text-primary font-medium block mt-1"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        )}
      </div>
    );
  }