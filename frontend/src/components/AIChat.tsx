import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '../types/product';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, selectedProduct }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: selectedProduct 
        ? `Hi! I can help you with questions about "${selectedProduct.name}" or suggest eco-friendly alternatives. What would you like to know?`
        : "Hi! I'm your Walmart Genie AI assistant. I can help you find eco-friendly products, compare sustainability ratings, and answer any questions about our green products. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const getAIResponse = async (query: string, product?: Product): Promise<string> => {
    try {
      const prompt = product
        ? `I am viewing the product "${product.name}", which has an eco-score of ${product.ecoScore}/100. Features: ${product.sustainability.join(", ")}. User asked: ${query}`
        : query;

      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      return data.reply;
    } catch (err) {
      return "Sorry, something went wrong while talking to Gemini.";
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    const aiText = await getAIResponse(inputValue, selectedProduct);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiText,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsSending(false);
  };

  return (
     <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span>Walmart Genie AI</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 mt-6 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-green-600 text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-center gap-2 p-2 border-t bg-background">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about eco-friendly products..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            
            <Button
              onClick={sendMessage}
              size="icon"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
