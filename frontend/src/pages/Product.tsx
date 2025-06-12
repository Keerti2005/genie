// src/pages/Products.tsx

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { FloatingAIButton } from '../components/FloatingAIButton';
import { AIChat } from '../components/AIChat';
import { products } from '../data/products';
import { FilterOptions, Product } from '../types/product';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'All',
    priceRange: [0, 200],
    brand: 'All',
    ecoScore: 0,
    sortBy: 'name'
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isProductChatOpen, setIsProductChatOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Record<string, any>>({});

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = filters.category === 'All' || product.category === filters.category;
      const matchesBrand = filters.brand === 'All' || product.brand === filters.brand;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesEcoScore = product.ecoScore >= filters.ecoScore;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesEcoScore;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'eco-score': return b.ecoScore - a.ecoScore;
        case 'rating': return b.rating - a.rating;
        case 'name':
        default: return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, filters]);

  const handleAskGenie = (product: Product) => {
    setSelectedProduct(product);
    setIsProductChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-eco-gradient-soft">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        allProducts={products}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 space-y-6">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </aside>

          <main className="flex-1">
            <div className="mb-8">
              <div className="bg-green-600 rounded-2xl p-8 text-white mb-6 shadow-xl">
                <h1 className="text-4xl font-bold mb-3">Eco-Friendly Products</h1>
                <p className="text-xl opacity-90 mb-2">{filteredProducts.length} sustainable products found</p>
                <p className="text-lg opacity-80">Discover products that are good for you and the planet 🌱</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <ProductCard
                    product={product}
                    onAskGenie={handleAskGenie}
                  />
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-card rounded-2xl p-8 shadow-lg inline-block">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-muted-foreground mb-4">
                    No products found matching your criteria
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <FloatingAIButton
        selectedProduct={selectedProduct}
        allProducts={products}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />

      <AIChat
        isOpen={isProductChatOpen}
        onClose={() => setIsProductChatOpen(false)}
        selectedProduct={selectedProduct}
        allProducts={products}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
    </div>
  );
};

export default Products;
