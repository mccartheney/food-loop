'use client';

import { SessionProvider } from 'next-auth/react';

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      // Refetch session every 5 minutes instead of default 1 minute
      refetchInterval={5 * 60}
      // Refetch when window becomes focused (but not too frequently)
      refetchOnWindowFocus={true}
      // Keep session data fresh when switching tabs
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  );
}
