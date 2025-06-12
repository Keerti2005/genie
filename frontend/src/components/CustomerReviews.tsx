
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, Leaf } from 'lucide-react';
import { Product } from '../types/product';

interface CustomerReviewsProps {
  product: Product;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ product }) => {
  const sampleReviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      review: `Love this ${product.name.toLowerCase()}! The quality is excellent and I feel good about making an eco-friendly choice. ${product.sustainability.includes('Organic Materials') ? 'The organic materials feel so much better than synthetic alternatives.' : ''} Highly recommend!`,
      helpful: 12,
      verified: true,
      ecoFocused: true
    },
    {
      id: 2,
      name: 'Mike R.',
      rating: 4,
      date: '2024-01-10',
      review: `Great product overall. The ${product.sustainability[0]?.toLowerCase()} aspect really sold me on it. Good value for the price and arrived quickly.`,
      helpful: 8,
      verified: true,
      ecoFocused: false
    },
    {
      id: 3,
      name: 'Emily K.',
      rating: 5,
      date: '2024-01-05',
      review: `Exactly what I was looking for! The eco-score of ${product.ecoScore} convinced me to try this brand. ${product.sustainability.includes('Recyclable') ? 'Love that it\'s recyclable too.' : ''} Will definitely buy again.`,
      helpful: 15,
      verified: true,
      ecoFocused: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card className="border-2 border-green-600/20 shadow-xl">
      <CardHeader className="bg-green-600/5">
        <CardTitle className="text-2xl flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-6 h-6 mr-3 text-green-600 fill-current" />
            Customer Reviews
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(Math.round(product.rating))}
            </div>
            <span className="text-lg font-semibold">{product.rating}</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          {sampleReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="font-medium">{review.name}</span>
                  {review.verified && (
                    <Badge variant="outline" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                  {review.ecoFocused && (
                    <Badge className="bg-green-600/10 text-green-600 border-green-600/30 text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      Eco-Focused
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{review.review}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sustainability Highlights */}
        <div className="mt-8 p-6 bg-green-600/5 rounded-xl">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            What Customers Love About Its Sustainability
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-sm">High eco-score rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-sm">Sustainable materials</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-sm">Environmentally conscious packaging</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="text-sm">Long-lasting durability</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
