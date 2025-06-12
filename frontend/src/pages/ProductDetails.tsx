import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, MessageCircle, Star, Leaf, Shield, Recycle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { ProductImageGallery } from '../components/ProductImageGallery';
import { EcoRatingBreakdown } from '../components/EcoRatingBreakdown';
import { CustomerReviews } from '../components/CustomerReviews';
import { AIChat } from '../components/AIChat';
import Product from "../pages/Product";
  const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
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

  const sustainabilityIcons = {
    'Organic Materials': <Leaf className="w-4 h-4" />,
    'Recyclable': <Recycle className="w-4 h-4" />,
    'Energy Efficient': <Zap className="w-4 h-4" />,
    'Fair Trade': <Shield className="w-4 h-4" />,
    'Carbon Neutral': <Leaf className="w-4 h-4" />,
    'Biodegradable': <Recycle className="w-4 h-4" />,
    'Solar Powered': <Zap className="w-4 h-4" />,
    'Renewable Materials': <Leaf className="w-4 h-4" />
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
          {/* Product Image Gallery */}
          <div className="space-y-6">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-green-600/10 text-green-600 border-green-600/30">
                  {product.category}
                </Badge>
                <Badge className="bg-gray-100 text-gray-700">
                  {product.brand}
                </Badge>
                {product.isGreenerChoice && (
                  <Badge className="bg-green-600 hover:bg-green-600-dark text-white">
                    <Leaf className="w-3 h-3 mr-1" />
                    Greener Choice
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{product.description}</p>

              {/* Sustainability Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  Sustainability Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sustainability.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-green-600/30 text-green-600 px-3 py-1"
                    >
                      {sustainabilityIcons[feature as keyof typeof sustainabilityIcons] || (
                        <Leaf className="w-4 h-4" />
                      )}
                      <span className="ml-2">{feature}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-green-600 hover:bg-green-600-dark text-white font-semibold py-4 text-lg rounded-xl"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  onClick={() => setIsAIChatOpen(true)}
                  variant="outline"
                  size="lg"
                  className="px-6 py-4 rounded-xl border-2 border-green-600 hover:bg-green-600/5"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
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
