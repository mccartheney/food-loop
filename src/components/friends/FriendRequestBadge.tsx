'use client';

import { useCurrentUser, useFriendRequests } from '@/lib/hooks/useFriends';

interface FriendRequestBadgeProps {
  className?: string;
}

export default function FriendRequestBadge({ className = '' }: FriendRequestBadgeProps) {
  const { user: currentUser } = useCurrentUser();
  const { requests } = useFriendRequests(currentUser?.id);

  const totalRequests = requests.received.length;

  if (totalRequests === 0) {
    return null;
  }

  return (
    <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center ${className}`}>
      {totalRequests > 99 ? '99+' : totalRequests}
    </span>
  );
}
