"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User, BrainCircuit, Loader2 } from "lucide-react"
import { bondQueryChatbot, type BondQueryChatbotOutput } from "@/ai/flows/bond-query-chatbot"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type Message = {
  role: "user" | "assistant"
  content: string
  reasoning?: string
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const result: BondQueryChatbotOutput = await bondQueryChatbot({ query: input })
      const assistantMessage: Message = {
        role: "assistant",
        content: result.answer,
        reasoning: result.reasoning,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling chatbot flow:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-16">
                  <Bot className="w-16 h-16 mb-4" />
                  <h3 className="text-lg font-semibold">Welcome to the BondView AI Chatbot</h3>
                  <p className="max-w-md">You can ask me questions like "What are the details for ISIN US912828U624?" or "Show me bonds from Apple Inc."</p>
              </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-4 ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-xl rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="font-code text-sm whitespace-pre-wrap">{message.content}</p>
                 {message.reasoning && (
                  <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="item-1" className="border-t border-muted-foreground/20">
                      <AccordionTrigger className="text-xs py-2 hover:no-underline">
                        <div className="flex items-center gap-2">
                           <BrainCircuit className="h-4 w-4"/> View Reasoning
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-xs font-code text-muted-foreground bg-background/50 p-2 rounded">
                        {message.reasoning}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                   <AvatarFallback><User size={20} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
                 <div className="max-w-xl rounded-lg p-3 bg-muted flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Thinking...</span>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about bonds..."
            className="pr-20"
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                }
            }}
          />
          <Button type="submit" size="sm" className="absolute bottom-3 right-3" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
