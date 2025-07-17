import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '../types/product';
import ReactMarkdown from 'react-markdown';

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
  allProducts: Product[];
  conversationHistory: Record<string, Message[]>;
  setConversationHistory: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
}

export const AIChat: React.FC<AIChatProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  allProducts,
  conversationHistory,
  setConversationHistory
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const chatId = selectedProduct?.id || 'floating';

  const initialBotMessage: Message = {
    id: '0',
    text: selectedProduct
      ? `Hi! I can help you with **"${selectedProduct.name}"**. What would you like to know?`
      : `👋 Hello! I'm your Walmart Genie AI assistant. Ask me about any product!`,
    isUser: false,
    timestamp: new Date()
  };

  useEffect(() => {
    if (!conversationHistory) return;

    const hasMessages =
      conversationHistory[chatId] && conversationHistory[chatId].length > 0;

    if (!hasMessages) {
      setConversationHistory(prev => ({
        ...prev,
        [chatId]: [initialBotMessage]
      }));
    }
  }, [chatId, conversationHistory, initialBotMessage, setConversationHistory]);

  const prevMessages = conversationHistory?.[chatId];
  const isFirstFloating = chatId === 'floating' && (!prevMessages || prevMessages.length === 0);
  const messages: Message[] = isFirstFloating
    ? [initialBotMessage]
    : prevMessages ?? [];

  const updateConversation = (newMessages: Message[]) => {
    setConversationHistory(prev => ({
      ...prev,
      [chatId]: newMessages
    }));
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = async (query: string): Promise<string> => {
    let prompt = '';
    if (selectedProduct) {
      prompt = `Product: "${selectedProduct.name}", eco-score ${selectedProduct.ecoScore}/100. Features: ${selectedProduct.sustainability.join(', ')}.\nUser: ${query}`;
    } else {
      const summary = allProducts.map(p =>
        `- ${p.name}: Eco-score ${p.ecoScore}/100`
      ).join('\n');
      prompt = `Here are products you can ask about:\n${summary}\nUser: ${query}`;
    }

    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return data.reply;
    } catch {
      return "Sorry, something went wrong.";
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    const beforeTyping = [...messages, userMsg];
    updateConversation(beforeTyping);
    setInputValue('');
    setIsSending(true);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: await getAIResponse(inputValue),
      isUser: false,
      timestamp: new Date()
    };

    updateConversation([...beforeTyping, aiMsg]);
    setIsSending(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <span>Walmart Genie AI</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 overflow-hidden mt-4">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.isUser ? 'bg-green-600 text-white' : 'bg-muted text-foreground'}`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted text-sm text-foreground">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="sticky bottom-0 w-full border-t mt-2 p-2 flex items-center gap-2 bg-background">
            <Input
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 text-sm"
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
