import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIChat } from './AIChat';
import { Product } from '../types/product';

interface FloatingAIButtonProps {
  selectedProduct?: Product;
  allProducts: Product[];
  conversationHistory: Record<string, any>;
  setConversationHistory: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({
  selectedProduct,
  allProducts,
  conversationHistory,
  setConversationHistory
}) => {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleNewChat = () => {
    const chatId = 'floating';

    // ✅ Add welcome message if not already present
    if (!conversationHistory[chatId] || conversationHistory[chatId].length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        text: `👋 Hello! I'm your Walmart Genie. How can I assist you today?`,
        isUser: false,
        timestamp: new Date(),
      };
      setConversationHistory((prev) => ({
        ...prev,
        [chatId]: [welcomeMessage],
      }));
    }

    setIsChatOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleNewChat}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-green-600 hover:bg-green-600 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 group hover:scale-110"
        size="icon"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      </Button>

      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedProduct={undefined} // This is a floating chat, no product
        allProducts={allProducts}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
    </>
  );
};
