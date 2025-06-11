
import React, { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIChat } from './AIChat';

export const FloatingAIButton: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-eco-gradient hover:bg-eco-green-dark shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 group hover:scale-110"
        size="icon"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 text-white" />
          <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Button>
      
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};