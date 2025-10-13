"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Bot, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function ChatbotPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your medical AI assistant. How can I help you today?",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      type: "user",
      content: "I have a headache and feel dizzy. What could be the cause?",
      timestamp: "10:01 AM",
    },
    {
      id: 3,
      type: "bot",
      content:
        "I understand you're experiencing headache and dizziness. These symptoms can have various causes including dehydration, stress, or blood pressure changes. However, I recommend consulting with a healthcare professional for proper diagnosis. Would you like me to help you find a specialist nearby?",
      timestamp: "10:02 AM",
    },
  ])

  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when messages update
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          content:
            "Thank you for your question. I'm analyzing your symptoms and will provide guidance shortly. Please remember that this is for informational purposes only and doesn't replace professional medical advice.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 rounded-xl  p-4">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-1 space-y-4 py-4 mb-4 max-h-[66vh] scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 shadow-sm ${msg.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                  }`}
              >
                {msg.type === "user" ? (
                  <User className="h-5 w-5" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>

              <div
                className={`rounded-2xl p-3 mb-2 text-sm shadow-sm ${msg.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  }`}
              >
                <p>{msg.content}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${msg.type === "user" ? "text-blue-100" : "text-gray-400"
                    }`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="w-full  flex items-center gap-2 bg-white dark:bg-gray-900 rounded-full shadow-md px-3  border border-gray-100 dark:border-gray-800">
        <Input
          placeholder="Type your medical question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 border-0 py-5 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-gray-800 dark:text-gray-100"
        />
        <Button
          onClick={handleSendMessage}
          size="icon"
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
