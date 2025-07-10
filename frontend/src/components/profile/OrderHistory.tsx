
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Package, Leaf, Calendar, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const OrderHistory = () => {
  const { toast } = useToast();

  const handleViewDetails = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for ${orderId}`,
    });
  };

  const handleReorderEcoItems = (orderId: string) => {
    toast({
      title: "Reorder Eco Items",
      description: `Adding eco-friendly items from ${orderId} to your cart`,
    });
  };

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 89.99,
      items: 8,
      ecoItems: 6,
      status: "Delivered",
      ecoPoints: 75,
      highlights: ["Organic produce", "Reusable containers", "Eco-friendly packaging"]
    },
    {
      id: "ORD-002",
      date: "2024-01-08",
      total: 124.50,
      items: 12,
      ecoItems: 9,
      status: "Delivered",
      ecoPoints: 95,
      highlights: ["Sustainable brands", "Plastic-free options", "Carbon-neutral delivery"]
    },
    {
      id: "ORD-003",
      date: "2024-01-01",
      total: 67.25,
      items: 5,
      ecoItems: 5,
      status: "Delivered",
      ecoPoints: 85,
      highlights: ["100% eco-friendly order", "Local sourcing", "Minimal packaging"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-green-600" />
            Order History
          </CardTitle>
          <CardDescription>
            Track your sustainable shopping journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:bg-green-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {order.total}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {order.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-700">{order.items}</div>
                    <div className="text-xs text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-700">{order.ecoItems}</div>
                    <div className="text-xs text-muted-foreground">Eco Items</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-700">{order.ecoPoints}</div>
                    <div className="text-xs text-muted-foreground">Eco Points</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-700">{Math.round((order.ecoItems/order.items)*100)}%</div>
                    <div className="text-xs text-muted-foreground">Eco Ratio</div>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Eco Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {order.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReorderEcoItems(order.id)}
                  >
                    Reorder Eco Items
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};