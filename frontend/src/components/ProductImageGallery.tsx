
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Leaf } from 'lucide-react';
import { Product } from '../types/product';

interface ProductImageGalleryProps {
  product: Product;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ product }) => {
  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      {product.isGreenerChoice && (
        <Badge className="absolute top-4 left-4 bg-green-600 hover:bg-green-600-dark text-white shadow-lg">
          <Leaf className="w-4 h-4 mr-2" />
          Greener Choice
        </Badge>
      )}
      
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 text-lg font-bold text-green-600 shadow-lg">
        Eco: {product.ecoScore}
      </div>
    </div>
  );
};
