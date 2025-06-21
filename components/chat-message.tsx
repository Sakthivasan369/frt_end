"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Message } from "@/types"

// Update the ChatMessageProps interface to include currentRole
interface ChatMessageProps {
  message: Message
  onRoleChange?: (role: string) => void
  currentRole: string | null
}

// Update the function signature to include currentRole
export function ChatMessage({ message, onRoleChange, currentRole }: ChatMessageProps) {
  const isUser = message.role === "user"
  //const currentRole = message.role // Assuming message contains the current role

  // Function to detect and convert links in text
  const formatMessageWithLinks = (text: string) => {
    // Simple regex to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g

    // Split by URLs and map each part
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  // Update the detectRoleButtons function to not show buttons for the current role
  // Function to detect role change suggestions
  const detectRoleButtons = (text: string) => {
    const roles = ["investor", "job_seeker", "visitor"]

    // Only show role buttons if the message mentions roles
    const shouldShowRoleButtons = roles.some((role) => text.toLowerCase().includes(role.toLowerCase()))

    if (!shouldShowRoleButtons) return null

    return roles
      .map((role) => {
        // Don't show button for the current role
        if (role === currentRole) return null

        if (text.toLowerCase().includes(role.toLowerCase())) {
          return (
            <Button
              key={role}
              variant="outline"
              size="sm"
              className="mt-2 mr-2"
              onClick={() => onRoleChange && onRoleChange(role)}
            >
              Switch to {role.replace("_", " ")}
            </Button>
          )
        }
        return null
      })
      .filter(Boolean)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`rounded-lg p-3 max-w-[80%] ${isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
        <div className="whitespace-pre-wrap">{formatMessageWithLinks(message.content)}</div>

        {!isUser && <div className="flex flex-wrap mt-1">{detectRoleButtons(message.content)}</div>}
      </div>
    </motion.div>
  )
}
