import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getChatResponse } from "@/lib/aiClient";
import ReactMarkdown from "react-markdown"; // 1. Added this import

type Message = { role: "user" | "assistant"; content: string };

const initialMessages: Message[] = [
  { role: "assistant", content: "Hello! I'm your AI Financial Assistant. I can help you understand your loan eligibility, suggest improvements, answer questions about documents, and calculate affordability. How can I help you today?" },
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg: Message = { role: "user", content: input };
  const nextMessages = [...messages, userMsg];

  setMessages(nextMessages);
  setInput("");
  setLoading(true);

  try {
    // 🔥 THE FIX: Filter out ANY message that contains the "Error" text
    // This stops the "Something went wrong" loop
    const cleanHistory = nextMessages.filter(msg => 
      !msg.content.includes("Something went wrong") && 
      !msg.content.includes("couldn't fetch an answer")
    );

    const assistantContent = await getChatResponse([
      { role: "system", content: "You are a helpful AI financial assistant focused on home loans." },
      ...cleanHistory, // Send the clean version
    ]);

    setMessages((prev) => [...prev, { role: "assistant", content: assistantContent }]);
  } catch (error) {
    // ... your existing catch logic
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {/* 3. Wrapped content in ReactMarkdown to handle the ** stars */}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <div className="border-t border-border p-4">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask about your eligibility, EMI, documents..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={!input.trim() || loading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChatAssistant;