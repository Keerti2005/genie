
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Recycle, Zap, Shield } from 'lucide-react';
import { Product } from '../types/product';

interface EcoRatingBreakdownProps {
  product: Product;
}

export const EcoRatingBreakdown: React.FC<EcoRatingBreakdownProps> = ({ product }) => {
  const getEcoGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'bg-green-600', description: 'Exceptional' };
    if (score >= 85) return { grade: 'A', color: 'bg-green-600', description: 'Excellent' };
    if (score >= 80) return { grade: 'B+', color: 'bg-green-500', description: 'Very Good' };
    if (score >= 75) return { grade: 'B', color: 'bg-yellow-500', description: 'Good' };
    return { grade: 'C', color: 'bg-orange-500', description: 'Fair' };
  };

  const ecoGrade = getEcoGrade(product.ecoScore);

  const impactCategories = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: 'Materials',
      score: Math.min(100, product.ecoScore + Math.random() * 10 - 5),
      description: 'Sustainable sourcing and organic materials'
    },
    {
      icon: <Recycle className="w-5 h-5" />,
      title: 'Lifecycle',
      score: Math.min(100, product.ecoScore + Math.random() * 10 - 5),
      description: 'Recyclability and end-of-life impact'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Energy',
      score: Math.min(100, product.ecoScore + Math.random() * 10 - 5),
      description: 'Energy efficiency and carbon footprint'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Certifications',
      score: Math.min(100, product.ecoScore + Math.random() * 10 - 5),
      description: 'Third-party environmental certifications'
    }
  ];

  return (
    <Card className="mb-12 border-2 border-green-600/20 shadow-xl">
      <CardHeader className="bg-green-600/5">
        <CardTitle className="text-2xl flex items-center">
          <Leaf className="w-6 h-6 mr-3 text-green-600" />
          Eco-Rating Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Score */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <div className={`w-24 h-24 rounded-full ${ecoGrade.color} flex items-center justify-center text-white`}>
                  <div>
                    <div className="text-2xl font-bold">{ecoGrade.grade}</div>
                    <div className="text-xs">{product.ecoScore}</div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Overall Eco-Score</h3>
            <Badge className="bg-green-600/10 text-green-600 border-green-600/30">
              {ecoGrade.description}
            </Badge>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            {impactCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="text-green-600">{category.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{category.title}</span>
                    <span className="text-sm font-semibold">{Math.round(category.score)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why It's Eco-Friendly */}
        <div className="mt-8 p-6 bg-green-600/5 rounded-xl">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            Why This Product is Eco-Friendly
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.sustainability.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
