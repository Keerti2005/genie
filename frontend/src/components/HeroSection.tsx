
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90"></div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-green-500/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Shop Smarter.
            <br />
            <span className="text-yellow-400">Live Greener.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Meet your AI-powered shopping assistant that helps you make sustainable choices, 
            discover eco-friendly products, and earn rewards for going green.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="text-white/80 text-sm mb-4">
            Join 100,000+ eco-conscious shoppers
          </div>
          
          <div className="flex justify-center">
            <ArrowDown className="text-white/60 animate-bounce" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
