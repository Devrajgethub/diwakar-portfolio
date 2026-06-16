import { NextRequest, NextResponse } from 'next/server'

// ─── Simple in-memory message store (for local dev) ───
interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

const messagesStore: ContactMessage[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    const msg: ContactMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    }

    // Store in memory (works locally, ephemeral on Vercel)
    messagesStore.unshift(msg)
    // Keep only last 100 messages
    if (messagesStore.length > 100) messagesStore.pop()

    // Send email via Web3Forms
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY || '07048459-38c0-420b-85f7-4ad47edd6748'
    if (web3formsKey) {
      try {
        const emailRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            from_name: `${name.trim()} (Portfolio Contact)`,
            subject: `New message from ${name.trim()} - Portfolio Contact`,
          }),
        })
        const emailText = await emailRes.text()
        try {
          const emailData = JSON.parse(emailText)
          console.log('Web3Forms response:', emailData)
        } catch {
          console.error('Web3Forms non-JSON response:', emailText.substring(0, 200))
        }
      } catch (emailError) {
        console.error('Web3Forms error:', emailError)
        // Don't fail the request if email fails
      }
    }

    console.log('Contact form submission:', msg.id)

    return NextResponse.json(
      { success: true, message: 'Message received successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch all messages
export async function GET() {
  try {
    return NextResponse.json({ messages: messagesStore })
  } catch (error) {
    console.error('Fetch messages error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE endpoint to delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      )
    }

    const index = messagesStore.findIndex(m => m.id === id)
    if (index !== -1) {
      messagesStore.splice(index, 1)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
