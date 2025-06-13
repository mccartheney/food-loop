import { PrismaClient as MongoClient } from './generated/mongodb'
import type { NotificationType, MessageType, MessageStatusType } from './generated/mongodb'

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined
}

const mongoClient = globalThis.__mongoClient ?? new MongoClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__mongoClient = mongoClient
}

export { mongoClient }

// Helper functions for common operations
export const notificationService = {
  async createNotification(data: {
    userId: string
    type: 'FRIEND_REQUEST' | 'FRIEND_ACCEPTED' | 'MESSAGE_RECEIVED' | 'ORDER_STATUS_UPDATE' | 'PANTRY_EXPIRY_WARNING' | 'RECIPE_SHARED' | 'BOX_AVAILABLE' | 'SYSTEM_ANNOUNCEMENT'
    title: string
    message: string
    data?: Record<string, unknown> | null
    actionUrl?: string
    expiresAt?: Date
  }) {
    return await mongoClient.notification.create({
      data
    })
  },

  async getUserNotifications(userId: string, limit = 20, skip = 0) {
    return await mongoClient.notification.findMany({
      where: { userId, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip
    })
  },

  async markAsRead(notificationId: string) {
    return await mongoClient.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    })
  },

  async markAllAsRead(userId: string) {
    return await mongoClient.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    })
  },

  async getUnreadCount(userId: string) {
    return await mongoClient.notification.count({
      where: { userId, isRead: false, expiresAt: { gt: new Date() } }
    })
  }
}

export const messagingService = {
  async createConversation(data: {
    participants: string[]
    type?: 'DIRECT' | 'GROUP'
    name?: string
    createdBy: string
  }) {
    return await mongoClient.conversation.create({
      data: {
        ...data,
        type: data.type || 'DIRECT'
      }
    })
  },

  async getUserConversations(userId: string) {
    return await mongoClient.conversation.findMany({
      where: {
        participants: { has: userId },
        isActive: true
      },
      orderBy: { lastActivity: 'desc' },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    })
  },

  async sendMessage(data: {
    conversationId: string
    senderId: string
    content: string
    type?: 'TEXT' | 'IMAGE' | 'FILE' | 'RECIPE_SHARE' | 'BOX_SHARE' | 'LOCATION'
    metadata?: Record<string, unknown> | null
    replyToId?: string
  }) {
    const message = await mongoClient.message.create({
      data: {
        ...data,
        type: data.type || 'TEXT'
      }
    })

    // Update conversation last activity
    await mongoClient.conversation.update({
      where: { id: data.conversationId },
      data: {
        lastActivity: new Date(),
        lastMessage: {
          id: message.id,
          content: data.content,
          senderId: data.senderId,
          createdAt: message.createdAt
        }
      }
    })

    return message
  },

  async getConversationMessages(conversationId: string, limit = 50, skip = 0) {
    return await mongoClient.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: limit,
      skip,
      include: {
        replyTo: true,
        reactions: true,
        status: true
      }
    })
  },

  async updateMessageStatus(messageId: string, userId: string, status: 'SENT' | 'DELIVERED' | 'READ') {
    return await mongoClient.messageStatusRecord.upsert({
      where: {
        messageId_userId: {
          messageId,
          userId
        }
      },
      update: { status, timestamp: new Date() },
      create: {
        messageId,
        userId,
        status,
        timestamp: new Date()
      }
    })
  }
}

export const presenceService = {
  async updateUserPresence(userId: string, data: {
    isOnline: boolean
    status?: string
    currentDevice?: string
  }) {
    return await mongoClient.userPresence.upsert({
      where: { userId },
      update: {
        ...data,
        lastSeen: new Date(),
        updatedAt: new Date()
      },
      create: {
        userId,
        ...data,
        lastSeen: new Date()
      }
    })
  },

  async getUserPresence(userId: string) {
    return await mongoClient.userPresence.findUnique({
      where: { userId }
    })
  },

  async getMultipleUserPresence(userIds: string[]) {
    return await mongoClient.userPresence.findMany({
      where: { userId: { in: userIds } }
    })
  },

  async setTypingIndicator(conversationId: string, userId: string, isTyping: boolean) {
    if (isTyping) {
      return await mongoClient.typingIndicator.upsert({
        where: {
          conversationId_userId: {
            conversationId,
            userId
          }
        },
        update: {
          isTyping: true,
          lastTyping: new Date()
        },
        create: {
          conversationId,
          userId,
          isTyping: true,
          lastTyping: new Date()
        }
      })
    } else {
      return await mongoClient.typingIndicator.deleteMany({
        where: { conversationId, userId }
      })
    }
  },

  async getTypingUsers(conversationId: string) {
    const fiveSecondsAgo = new Date(Date.now() - 5000)
    return await mongoClient.typingIndicator.findMany({
      where: {
        conversationId,
        isTyping: true,
        lastTyping: { gte: fiveSecondsAgo }
      }
    })
  }
}

export const notificationSettingsService = {
  async getUserSettings(userId: string) {
    return await mongoClient.notificationSettings.findUnique({
      where: { userId }
    })
  },

  async createOrUpdateSettings(userId: string, settings: Partial<{
    pushNotifications: boolean
    emailNotifications: boolean
    friendRequests: boolean
    messages: boolean
    orderUpdates: boolean
    pantryAlerts: boolean
    recipeShares: boolean
    marketplaceUpdates: boolean
    systemAnnouncements: boolean
    pushTokens: string[]
    emailFrequency: string
    quietHoursStart: string
    quietHoursEnd: string
    timezone: string
  }>) {
    return await mongoClient.notificationSettings.upsert({
      where: { userId },
      update: { ...settings, updatedAt: new Date() },
      create: {
        userId,
        ...settings
      }
    })
  },

  async addPushToken(userId: string, token: string) {
    const settings = await mongoClient.notificationSettings.findUnique({
      where: { userId }
    })

    const currentTokens = settings?.pushTokens || []
    if (!currentTokens.includes(token)) {
      return await mongoClient.notificationSettings.upsert({
        where: { userId },
        update: {
          pushTokens: [...currentTokens, token],
          updatedAt: new Date()
        },
        create: {
          userId,
          pushTokens: [token]
        }
      })
    }
    return settings
  },

  async removePushToken(userId: string, token: string) {
    const settings = await mongoClient.notificationSettings.findUnique({
      where: { userId }
    })

    if (settings) {
      const updatedTokens = settings.pushTokens.filter(t => t !== token)
      return await mongoClient.notificationSettings.update({
        where: { userId },
        data: {
          pushTokens: updatedTokens,
          updatedAt: new Date()
        }
      })
    }
    return settings
  }
}
