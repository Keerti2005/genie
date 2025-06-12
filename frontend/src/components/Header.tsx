import React, { useState } from 'react';
import { ShoppingCart, Search, MessageCircle, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';
import { CartDrawer } from './CartDrawer';
import { AIChat } from './AIChat';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  allProducts: Product[];
  conversationHistory: Record<string, any>;
  setConversationHistory: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  allProducts,
  conversationHistory,
  setConversationHistory
}) => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">
                Walmart Genie
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for eco-friendly products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg rounded-2xl border-2 border-green-700/20 focus:border-green-700 transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(true)}
              className="relative h-12 w-12 rounded-xl hover:bg-green-700/10 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-green-700" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative h-12 w-12 rounded-xl hover:bg-green-700/10 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-green-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        allProducts={allProducts}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
    </>
  );
};
