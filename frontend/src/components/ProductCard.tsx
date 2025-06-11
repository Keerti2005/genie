
import React from 'react';
import { Plus, MessageCircle, Star, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onAskGenie: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAskGenie }) => {
  const { addToCart } = useCart();

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-eco-green/20 overflow-hidden bg-card/50 backdrop-blur-sm animate-fade-in">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {product.isGreenerChoice && (
            <Badge className="absolute top-3 left-3 bg-eco-green hover:bg-eco-green-dark text-white shadow-lg">
              <Leaf className="w-3 h-3 mr-1" />
              Greener Choice
            </Badge>
          )}
          
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-eco-green shadow-lg">
            Eco: {product.ecoScore}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-bold text-lg line-clamp-2 cursor-pointer hover:text-eco-green transition-colors group-hover:text-eco-green">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground font-medium">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-eco-green">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Button
              onClick={() => addToCart(product)}
              className="flex-1 bg-eco-green hover:bg-eco-green-dark text-white font-medium rounded-xl h-11 transition-all shadow-lg hover:shadow-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAskGenie(product)}
              className="px-4 h-11 rounded-xl border-2 border-eco-green/20 hover:border-eco-green hover:bg-eco-green/5 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-eco-green" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
