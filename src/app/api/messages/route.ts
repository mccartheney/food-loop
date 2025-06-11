import { NextRequest, NextResponse } from 'next/server'
import { messagingService } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const conversationId = searchParams.get('conversationId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    console.log('GET /api/messages - userId:', userId, 'conversationId:', conversationId)

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    if (conversationId) {
      // Get messages for a specific conversation
      console.log('Fetching messages for conversation:', conversationId)
      const messages = await messagingService.getConversationMessages(
        conversationId,
        limit,
        skip
      )
      console.log('Found messages:', messages.length)

      return NextResponse.json({
        success: true,
        messages,
        hasMore: messages.length === limit
      })
    } else {
      // Get user's conversations
      console.log('Fetching conversations for user:', userId)
      const conversations = await messagingService.getUserConversations(userId)
      console.log('Found conversations:', conversations.length, 'conversations:', conversations.map(c => ({ id: c.id, participants: c.participants })))

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

    console.log('POST /api/messages - body:', { conversationId, senderId, content, participants, conversationType })

    if (conversationId) {
      // Send message to existing conversation
      console.log('Sending message to existing conversation:', conversationId)
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

      console.log('Message sent successfully:', message.id)
      return NextResponse.json({
        success: true,
        message
      }, { status: 201 })
    } else {
      // Create new conversation
      console.log('Creating new conversation with participants:', participants)
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

      console.log('Conversation created successfully:', { id: conversation.id, participants: conversation.participants })

      // Send initial message if content is provided
      if (content) {
        console.log('Sending initial message to new conversation')
        const message = await messagingService.sendMessage({
          conversationId: conversation.id,
          senderId,
          content,
          type,
          metadata
        })

        console.log('Initial message sent:', message.id)
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
