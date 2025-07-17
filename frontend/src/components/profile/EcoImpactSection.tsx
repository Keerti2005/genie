
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, TreePine, Heart } from 'lucide-react';

interface UserData {
  carbonSaved: number;
  plasticAvoided: number;
  treesEquivalent: number;
}

interface EcoImpactSectionProps {
  userData: UserData;
}

export const EcoImpactSection = ({ userData }: EcoImpactSectionProps) => {
  const impactStats = [
    {
      icon: Leaf,
      value: `${userData.carbonSaved} lbs`,
      label: "CO₂ Emissions Saved",
      description: "Equivalent to driving 285 miles less",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Recycle,
      value: `${userData.plasticAvoided} lbs`,
      label: "Plastic Avoided",
      description: "That's 468 plastic bottles saved!",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TreePine,
      value: `${userData.treesEquivalent}`,
      label: "Trees Equivalent",
      description: "Your impact helps our forests",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-green-600" />
          Your Eco Impact
        </CardTitle>
        <CardDescription>
          See how your sustainable choices make a real difference
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {impactStats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-900">{stat.value}</span>
                <span className="font-medium text-green-700">{stat.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg text-center">
          <p className="text-green-800 font-medium">🌱 Keep up the amazing work!</p>
          <p className="text-sm text-green-700 mt-1">
            Your eco-friendly choices are making a positive impact on our planet
          </p>
        </div>
      </CardContent>
    </Card>
  );
};