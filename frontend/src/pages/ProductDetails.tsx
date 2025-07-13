import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { ProductImageGallery } from '../components/ProductImageGallery';
import { EcoRatingBreakdown } from '../components/EcoRatingBreakdown';
import { CustomerReviews } from '../components/CustomerReviews';
import { AIChat } from '../components/AIChat';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Record<string, any>>({});

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-eco-gradient-soft flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/">
              <Button className="bg-green-600 hover:bg-green-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-eco-gradient-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-600/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link to="/product">
            <Button variant="ghost" className="text-green-600 hover:bg-green-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div className="space-y-6">
            <ProductImageGallery product={product} />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-green-600/10 text-green-600 border-green-600/30">
                  {product.category}
                </Badge>
                <Badge className="bg-gray-100 text-gray-700">{product.brand}</Badge>
                {product.isGreenerChoice && (
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-3 h-3 mr-1" />
                    Greener Choice
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{product.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleGoToCart}
                  variant="outline"
                  className="flex-1 border-green-700 text-green-600  font-semibold py-4 text-lg rounded-xl"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Go to Cart
                </Button>
              </div>

             <div className="mt-4">
  <Button
    onClick={() => setIsAIChatOpen(true)}
    variant="outline"
    className="w-full border-2 border-green-600 hover:bg-green-50 py-3 rounded-xl group"
  >
    <MessageCircle className="w-5 h-5 text-green-600 mr-2 group-hover:text-green-700" />
    <span className="text-green-600 group-hover:text-green-700">Ask Eco-Genie</span>
  </Button>
</div>

            </div>
          </div>
        </div>

        <EcoRatingBreakdown product={product} />
        <CustomerReviews product={product} />
      </div>

      <AIChat
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        selectedProduct={product}
        allProducts={products}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
    </div>
  );
};

export default ProductDetails;
