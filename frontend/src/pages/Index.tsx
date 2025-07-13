import React, { useState } from 'react';

import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterSection from "@/components/FooterSection";
import { products } from '../data/products';
import { Product } from '../types/product';
import { AIChat } from '../components/AIChat';
import { FloatingAIButton } from '../components/FloatingAIButton';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isProductChatOpen, setIsProductChatOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Record<string, any>>({});

  return (
    <div className="min-h-screen w-full">
      
      <NavigationHeader />
      <main>
        <HeroSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <FooterSection />
      </main>
         <FloatingAIButton
              selectedProduct={selectedProduct}
              allProducts={products}
              conversationHistory={conversationHistory}
              setConversationHistory={setConversationHistory}
            />
      
    </div>
  );
};

export default Index;
