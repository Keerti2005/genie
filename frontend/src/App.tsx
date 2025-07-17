  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Index from "./pages/Index";
  import NotFound from "./pages/NotFound";
  import Product from "./pages/Product";
  import CartContext, { CartProvider } from "./contexts/CartContext"; 
  import ProductDetails from "./pages/ProductDetails";
  import SignInPage from "./pages/SignInPage";
  import Rewards from "./pages/Rewards";
  import Cart from "./pages/CartPage";
  const queryClient = new QueryClient();
  import Profile from "./pages/Profile"
  const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider> 
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );

  export default App;
