import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Connect to your Python backend
    const response = await fetch("https://backend-pt1h.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response from backend")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in chat API:", error)

    // Fallback response if backend is not available
    return NextResponse.json(
      {
        response:
          "I'm currently unable to connect to my knowledge base. Please try again later or contact support@wabag.com for immediate assistance.",
      },
      { status: 500 },
    )
  }
}
