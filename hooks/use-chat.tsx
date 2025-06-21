"use client"

import { useState, useCallback } from "react"
import type { Message } from "@/types"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    // Add user message to chat
    const userMessage: Message = { role: "user", content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Send to backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const data = await response.json()

      // Add bot response to chat
      const botMessage: Message = { role: "assistant", content: data.response }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])

  const handleInitialMessage = useCallback(() => {
    // Add a welcome message if there are no messages yet
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        role: "assistant",
        content: "Welcome to VA Tech WABAG Assistant. How can I help you today?",
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
    selectedRole,
    setSelectedRole,
    handleInitialMessage,
  }
}
