
import { Button } from "@/components/ui/button";
import { Leaf, Home, ShoppingCart, Gift, User } from "lucide-react";

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-eco-green rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Walmart Genie
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a href="#cart" className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </a>
            <a href="#rewards" className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium">
              <Gift className="h-4 w-4" />
              <span>Rewards</span>
            </a>
            <a href="#profile" className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>
            <Button className="bg-eco-green hover:bg-eco-green/90">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
