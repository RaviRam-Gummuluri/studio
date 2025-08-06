import ChatbotInterface from "./chatbot-interface"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function ChatbotPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
       <div className="mb-6">
         <h2 className="text-2xl font-bold tracking-tight">AI Bond Query Chatbot</h2>
         <p className="text-muted-foreground">
            Ask questions about bonds, and the AI will fetch relevant data to answer you.
        </p>
       </div>
       <Card className="flex-1">
        <CardContent className="p-0 h-full">
            <ChatbotInterface />
        </CardContent>
       </Card>
    </div>
  )
}
