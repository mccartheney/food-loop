interface ProfileStatsProps {
    postsCount: number;
    followersCount: number;
    followingCount: number;
  }
  
  export default function ProfileStats({ 
    postsCount, 
    followersCount, 
    followingCount 
  }: ProfileStatsProps) {
    return (
      <div className="flex-1 flex justify-around ml-4">
        <div className="text-center">
          <div className="font-semibold">{postsCount}</div>
          <div className="text-xs text-gray-500">publicações</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{followersCount}</div>
          <div className="text-xs text-gray-500">seguidores</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{followingCount}</div>
          <div className="text-xs text-gray-500">seguindo</div>
        </div>
      </div>
    );
  }