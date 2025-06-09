import { NextRequest, NextResponse } from 'next/server'
import { notificationService } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const notifications = await notificationService.getUserNotifications(
      userId,
      limit,
      skip
    )

    const unreadCount = await notificationService.getUnreadCount(userId)

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
      hasMore: notifications.length === limit
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message, data, actionUrl, expiresAt } = body

    // Validate required fields
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, type, title, message' },
        { status: 400 }
      )
    }

    const notification = await notificationService.createNotification({
      userId,
      type,
      title,
      message,
      data,
      actionUrl,
      expiresAt: expiresAt ? new Date(expiresAt) : undefined
    })

    return NextResponse.json({
      success: true,
      notification
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    )
  }
}
