"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RoleSelector } from "@/components/role-selector"
import { ChatMessage } from "@/components/chat-message"
import { WelcomeMessage } from "@/components/welcome-message"
import { LoadingDots } from "@/components/loading-dots"
import { useChat } from "@/hooks/use-chat"

export default function ChatbotPage() {
  const { messages, isLoading, sendMessage, clearChat, selectedRole, setSelectedRole } = useChat()

  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput("")
    }
  }

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    sendMessage(`The user wants to change the role to ${role}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full h-screen flex flex-col shadow-lg border-blue-100 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">VA Tech WABAG Assistant</h1>
            <p className="text-sm opacity-80">{selectedRole ? `Role: ${selectedRole}` : "No role selected"}</p>
          </div>
          <div className="flex gap-2">
            <RoleSelector onRoleSelect={handleRoleChange} currentRole={selectedRole} />
            <Button variant="ghost" size="icon" onClick={clearChat} className="text-white hover:bg-blue-700">
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <WelcomeMessage onRoleSelect={handleRoleChange} />
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} onRoleChange={handleRoleChange} currentRole={selectedRole} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
            {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </Card>
    </div>
  )
}
