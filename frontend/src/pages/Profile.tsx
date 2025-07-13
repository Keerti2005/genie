import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import NavigationHeader from "@/components/NavigationHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Recycle, TreePine, Leaf, Award } from "lucide-react";

import { ProfileHeader } from "../components/profile/ProfileHeader";
import { EcoImpactSection } from "../components/profile/EcoImpactSection";
import { OrderHistory } from "../components/profile/OrderHistory";
import { AccountSettings } from "../components/profile/AccountSettings";
import { EcoGoals } from "../components/profile/EcoGoals";
import { FloatingAIButton } from "../components/FloatingAIButton";

import { useToast } from "../hooks/use-toast";
import { products } from "../data/products";
import { Product } from "../types/product";
import { useUser } from "../contexts/UserContext";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { user } = useUser();

  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [conversationHistory, setConversationHistory] = useState<Record<string, any>>({});

  // Fallback in case user data is missing
  const userData = {
    name: user?.displayName || "Eco Shopper",
    email: user?.email || "eco@user.com",
    avatar: user?.photoURL || "/placeholder.svg",
    level: "Eco Hero",
    levelProgress: 75,
    totalPoints: 2840,
    nextLevelPoints: 3000,
    carbonSaved: 127.5,
    plasticAvoided: 23.4,
    treesEquivalent: 8.2,
    totalOrders: 47,
    ecoOrders: 35,
    memberSince: "January 2023",
  };

  const ecoGoals = [
    { 
      title: "Reduce Plastic Use", 
      progress: 68, 
      target: "Avoid 50 plastic items this month",
      current: 34,
      total: 50,
      icon: Recycle 
    },
    { 
      title: "Carbon Neutral Shopping", 
      progress: 82, 
      target: "Save 200 lbs CO₂ this quarter",
      current: 164,
      total: 200,
      icon: Leaf 
    },
    { 
      title: "Eco Product Explorer", 
      progress: 45, 
      target: "Try 20 new eco-friendly products",
      current: 9,
      total: 20,
      icon: TreePine 
    }
  ];

  const handleViewAllGoals = () => {
    setActiveTab("goals");
  };

  return (
    <div className="min-h-screen w-full">
      <NavigationHeader />
      <div className="min-h-screen bg-background p-4 md:p-6 pt-20">
        <div className="max-w-6xl mx-auto space-y-6">
          <ProfileHeader userData={userData} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="goals">Eco Goals</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EcoImpactSection userData={userData} />

                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-green-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Eco-friendly detergent purchased</p>
                        <p className="text-sm text-muted-foreground">+50 points • 2 days ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        +50 pts
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Used reusable bags</p>
                        <p className="text-sm text-muted-foreground">+25 points • 4 days ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        +25 pts
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">Chose eco-delivery option</p>
                        <p className="text-sm text-muted-foreground">+15 points • 1 week ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        +15 pts
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-green-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Current Eco Goals
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={handleViewAllGoals}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ecoGoals.slice(0, 3).map((goal, index) => (
                      <div key={index} className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <goal.icon className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium text-sm">{goal.title}</h4>
                        </div>
                        <Progress value={goal.progress} className="mb-2" />
                        <p className="text-xs text-muted-foreground">{goal.current}/{goal.total}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <OrderHistory />
            </TabsContent>

            <TabsContent value="goals">
              <EcoGoals goals={ecoGoals} />
            </TabsContent>

            <TabsContent value="settings">
              <AccountSettings userData={userData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <FloatingAIButton
        selectedProduct={selectedProduct}
        allProducts={products}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
    </div>
  );
};

export default Profile;
