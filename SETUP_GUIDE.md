# Dual Database Setup Guide - PostgreSQL + MongoDB

This guide explains how to set up and use the dual-database architecture with PostgreSQL for main data and MongoDB for notifications and messaging.

## Architecture Overview

- **PostgreSQL**: Main application data (users, profiles, pantry, orders, etc.)
- **MongoDB**: Real-time features (notifications, messages, presence, typing indicators)

## Setup Instructions

### 1. Environment Variables
Update your `.env` file with MongoDB connection:
```env
# PostgreSQL (existing)
DATABASE_URL=postgresql://username:password@host:5432/database

# MongoDB (for notifications and messaging)
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/foodloop-notifications?retryWrites=true&w=majority
```

### 2. Generate Prisma Clients
```bash
# Generate both clients
npm run setup

# Or generate individually
npm run db:generate      # PostgreSQL client
npm run mongo:generate   # MongoDB client
```

### 3. Push Schemas to Databases
```bash
# Push PostgreSQL schema
npm run db:push

# Push MongoDB schema
npm run mongo:push
```

## Usage Examples

### Notifications Service
```typescript
import { notificationService } from '@/lib/mongodb'

// Create a notification
await notificationService.createNotification({
  userId: 'user-id',
  type: 'FRIEND_REQUEST',
  title: 'New Friend Request',
  message: 'John Doe sent you a friend request',
  actionUrl: '/friends/requests',
  data: { requesterId: 'requester-id' }
})

// Get user notifications
const notifications = await notificationService.getUserNotifications('user-id')

// Mark as read
await notificationService.markAsRead('notification-id')
```

### Messaging Service
```typescript
import { messagingService } from '@/lib/mongodb'

// Create a conversation
const conversation = await messagingService.createConversation({
  participants: ['user1-id', 'user2-id'],
  type: 'DIRECT',
  createdBy: 'user1-id'
})

// Send a message
await messagingService.sendMessage({
  conversationId: conversation.id,
  senderId: 'user1-id',
  content: 'Hello there!',
  type: 'TEXT'
})

// Get conversation messages
const messages = await messagingService.getConversationMessages(conversation.id)
```

### Presence Service
```typescript
import { presenceService } from '@/lib/mongodb'

// Update user presence
await presenceService.updateUserPresence('user-id', {
  isOnline: true,
  status: 'Available',
  currentDevice: 'web'
})

// Set typing indicator
await presenceService.setTypingIndicator('conversation-id', 'user-id', true)
```

## Database Schemas

### PostgreSQL Models (Enhanced)
- Enhanced `Profile` model with messaging fields
- New `UserConnection` model for real-time connections
- All existing models preserved

### MongoDB Models (New)
- `Notification`: System and user notifications
- `Conversation`: Chat conversations
- `Message`: Individual messages with reactions and status
- `MessageStatusRecord`: Message delivery/read status
- `UserPresence`: Online status and presence
- `NotificationSettings`: User notification preferences
- `TypingIndicator`: Real-time typing status
- `MessageThread`: Message threading support

## API Integration Examples

### Friend Request with Notification
```typescript
// In your friend request API
import { prisma } from '@/lib/prisma'
import { notificationService } from '@/lib/mongodb'

// Create friend request in PostgreSQL
const friendRequest = await prisma.friendRequest.create({
  data: { requesterId, receiverId }
})

// Create notification in MongoDB
await notificationService.createNotification({
  userId: receiverId,
  type: 'FRIEND_REQUEST',
  title: 'New Friend Request',
  message: `${requesterName} sent you a friend request`,
  actionUrl: '/friends/requests',
  data: { requesterId, friendRequestId: friendRequest.id }
})
```

### Real-time Message Handling
```typescript
// In your messaging API
import { messagingService, presenceService } from '@/lib/mongodb'

// Send message
const message = await messagingService.sendMessage({
  conversationId,
  senderId,
  content,
  type: 'TEXT'
})

// Update message status for all participants
for (const participantId of conversation.participants) {
  if (participantId !== senderId) {
    await messagingService.updateMessageStatus(
      message.id,
      participantId,
      'DELIVERED'
    )
  }
}

// Clear typing indicator
await presenceService.setTypingIndicator(conversationId, senderId, false)
```

## Benefits

1. **Performance**: MongoDB handles high-frequency operations efficiently
2. **Scalability**: Databases can be scaled independently
3. **Real-time**: MongoDB's change streams enable real-time features
4. **Reliability**: Critical data remains in PostgreSQL
5. **Flexibility**: Each database optimized for its use case

## Scripts Available

- `npm run setup`: Generate both Prisma clients
- `npm run db:generate`: Generate PostgreSQL client
- `npm run mongo:generate`: Generate MongoDB client
- `npm run db:push`: Push PostgreSQL schema
- `npm run mongo:push`: Push MongoDB schema
- `npm run db:studio`: Open PostgreSQL Prisma Studio
- `npm run mongo:studio`: Open MongoDB Prisma Studio

## Troubleshooting

1. **Connection Issues**: Verify both database URLs in `.env`
2. **Type Errors**: Run `npm run setup` to regenerate clients
3. **Schema Conflicts**: Check for naming conflicts between schemas
4. **Performance**: Index frequently queried fields in MongoDB

This dual-database architecture provides the best of both worlds: ACID compliance for critical data and high-performance real-time features.
