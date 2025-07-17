import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Home, ShoppingCart, Gift, User, Box } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavigationHeader = () => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title linked to Home */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-green-600 rounded-lg">
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
              className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors font-medium"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/product"
              className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors font-medium"
            >
              <Box className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
            </Link>
            <Link
              to="/rewards"
              className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors font-medium"
            >
              <Gift className="h-4 w-4" />
              <span>Rewards</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors font-medium"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Right Side Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || "/placeholder.svg"} />
                  <AvatarFallback>{user.email[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-green-700">
                  {user.email}
                </span>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center gap-2 text-foreground hover:text-green-600 transition-colors font-medium"
              >
                <Button className="bg-green-600 hover:bg-green-600/90">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
