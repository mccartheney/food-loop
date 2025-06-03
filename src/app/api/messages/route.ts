import { NextRequest, NextResponse } from 'next/server'
import { messagingService } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (conversationId) {
      // Get messages for a specific conversation
      const messages = await messagingService.getConversationMessages(
        conversationId,
        limit,
        skip
      )

      return NextResponse.json({
        success: true,
        messages,
        hasMore: messages.length === limit
      })
    } else {
      // Get user's conversations
      const conversations = await messagingService.getUserConversations(userId)

      return NextResponse.json({
        success: true,
        conversations
      })
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      conversationId, 
      senderId, 
      content, 
      type = 'TEXT', 
      metadata, 
      replyToId,
      participants,
      conversationType = 'DIRECT'
    } = body

    if (conversationId) {
      // Send message to existing conversation
      if (!senderId || !content) {
        return NextResponse.json(
          { error: 'Missing required fields: senderId, content' },
          { status: 400 }
        )
      }

      const message = await messagingService.sendMessage({
        conversationId,
        senderId,
        content,
        type,
        metadata,
        replyToId
      })

      return NextResponse.json({
        success: true,
        message
      }, { status: 201 })
    } else {
      // Create new conversation
      if (!participants || !Array.isArray(participants) || participants.length < 2) {
        return NextResponse.json(
          { error: 'At least 2 participants are required to create a conversation' },
          { status: 400 }
        )
      }

      if (!senderId) {
        return NextResponse.json(
          { error: 'Sender ID is required' },
          { status: 400 }
        )
      }

      const conversation = await messagingService.createConversation({
        participants,
        type: conversationType,
        createdBy: senderId
      })

      // Send initial message if content is provided
      if (content) {
        const message = await messagingService.sendMessage({
          conversationId: conversation.id,
          senderId,
          content,
          type,
          metadata
        })

        return NextResponse.json({
          success: true,
          conversation,
          message
        }, { status: 201 })
      }

      return NextResponse.json({
        success: true,
        conversation
      }, { status: 201 })
    }
  } catch (error) {
    console.error('Error handling message request:', error)
    return NextResponse.json(
      { error: 'Failed to process message request' },
      { status: 500 }
    )
  }
}
