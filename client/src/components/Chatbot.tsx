import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trackChatbotInteraction } from "@/lib/analytics";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface SessionInfo {
  id: string;
  questionsRemaining: number;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! I'm Aakash's virtual assistant. How can I help you learn more about him today? Note: You can ask up to 3 questions per session."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || limitReached) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Track chatbot interaction
    const questionsAsked = sessionInfo ? 3 - sessionInfo.questionsRemaining + 1 : 1;
    trackChatbotInteraction('question', questionsAsked);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add session ID to request if we have one
      if (sessionInfo?.id) {
        headers['Authorization'] = sessionInfo.id;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages: [...messages, userMessage].filter(msg => msg.role !== 'system')
        }),
      });

      if (response.status === 429) {
        // Handle rate limiting
        const data = await response.json();
        setLimitReached(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message || "You've reached the limit of 3 questions per session. Please try again tomorrow."
        }]);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message;

      // Update session info if available
      if (data.session) {
        setSessionInfo(data.session);
        
        // Check if this was the last question
        if (data.session.questionsRemaining <= 0) {
          setLimitReached(true);
        }
      }

      if (assistantMessage) {
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={() => {
          setIsOpen(true);
          trackChatbotInteraction('open', 0);
        }}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 p-0 shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 animate-float z-[9999]"
        aria-label="Open Chat"
      >
        <MessageSquare className="h-7 w-7 text-white" />
      </Button>

      {/* Chat dialog */}
      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            trackChatbotInteraction('close', sessionInfo?.questionsRemaining || 3);
          }
        }}>
        <DialogContent className="sm:max-w-[425px] rounded-xl bg-white border border-blue-100 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chat with Aakash's AI
            </DialogTitle>
            {sessionInfo && (
              <div className="text-sm text-gray-500 flex items-center justify-center mt-1">
                <span>{limitReached 
                  ? "Question limit reached for today" 
                  : `Questions remaining: ${sessionInfo.questionsRemaining}`}
                </span>
              </div>
            )}
          </DialogHeader>

          <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div 
                    key={i} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {limitReached && (
              <Alert className="mx-3 my-2 bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-700 text-xs">
                  You've reached the limit of 3 questions per session. Please try again tomorrow.
                </AlertDescription>
              </Alert>
            )}

            <DialogFooter className="px-3 pb-3 pt-2">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  className="flex-1 border-gray-200 focus-visible:ring-blue-500"
                  placeholder={limitReached ? "Question limit reached" : "Type your message..."}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={isLoading || limitReached}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || limitReached}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Send
                </Button>
              </form>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}