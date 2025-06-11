
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { FilterOptions } from '../types/product';
import { categories, brands } from '../data/products';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: 'All',
      priceRange: [0, 200],
      brand: 'All',
      ecoScore: 0,
      sortBy: 'name'
    });
  };

  return (
    <Card className="w-full shadow-lg border-2 border-eco-green/10 bg-card/80 backdrop-blur-sm">
      <CardHeader className="bg-eco-gradient-soft rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-eco-green">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="hover:bg-eco-green/10 text-eco-green">
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <label className="text-sm font-semibold mb-3 block text-eco-green">Sort By</label>
          <Select value={filters.sortBy} onValueChange={(value: any) => updateFilter('sortBy', value)}>
            <SelectTrigger className="border-2 border-eco-green/20 focus:border-eco-green rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="eco-score">Eco Score</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-eco-green/20" />

        <div>
          <label className="text-sm font-semibold mb-3 block text-eco-green">Category</label>
          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger className="border-2 border-eco-green/20 focus:border-eco-green rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold mb-3 block text-eco-green">Brand</label>
          <Select value={filters.brand} onValueChange={(value) => updateFilter('brand', value)}>
            <SelectTrigger className="border-2 border-eco-green/20 focus:border-eco-green rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-semibold mb-3 block text-eco-green">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={200}
              min={0}
              step={5}
              className="w-full [&_[role=slider]]:bg-eco-green [&_[role=slider]]:border-eco-green"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold mb-3 block text-eco-green">
            Min Eco Score: {filters.ecoScore}
          </label>
          <div className="px-2">
            <Slider
              value={[filters.ecoScore]}
              onValueChange={(value) => updateFilter('ecoScore', value[0])}
              max={100}
              min={0}
              step={5}
              className="w-full [&_[role=slider]]:bg-eco-green [&_[role=slider]]:border-eco-green"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
