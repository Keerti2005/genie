import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Home, ShoppingCart, Gift, User,Box } from "lucide-react";

const NavigationHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and Title linked to Home */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-eco-green rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              Walmart Genie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/product"
              className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium"
            >
              <Box className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </Link>
            <Link
              to="/rewards"
              className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium"
            >
              <Gift className="h-4 w-4" />
              <span>Rewards</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-foreground hover:text-eco-green transition-colors font-medium"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Buttons */}
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
