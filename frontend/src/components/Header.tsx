
import React, { useState } from 'react';
import { ShoppingCart, Search, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../contexts/CartContext';
import { CartDrawer } from './CartDrawer';
import { AIChat } from './AIChat';
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-eco-green rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Walmart Genie
            </span>
          </Link>
              
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for eco-friendly products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg rounded-2xl border-2 border-eco-green/20 focus:border-eco-green transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(true)}
              className="relative h-12 w-12 rounded-xl hover:bg-eco-green/10 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-eco-green" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative h-12 w-12 rounded-xl hover:bg-eco-green/10 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-eco-green" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-green text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};
