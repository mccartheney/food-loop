-- Add missing fields to Profile table
ALTER TABLE "Profile" ADD COLUMN "lastSeenAt" TIMESTAMP(3);
ALTER TABLE "Profile" ADD COLUMN "isOnline" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Profile" ADD COLUMN "messagingEnabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Profile" ADD COLUMN "unreadNotifications" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Profile" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Profile" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "UserConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "deviceType" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivity" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserConnection_userId_isActive_idx" ON "UserConnection"("userId", "isActive");

-- CreateIndex
CREATE INDEX "UserConnection_connectionId_idx" ON "UserConnection"("connectionId");

-- CreateIndex
CREATE INDEX "UserConnection_lastActivity_idx" ON "UserConnection"("lastActivity");
