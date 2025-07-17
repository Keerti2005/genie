import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import NavigationHeader from "@/components/NavigationHeader";
import { products } from '../data/products';
import { Product } from '../types/product';
import { AIChat } from '../components/AIChat';
import { FloatingAIButton } from '../components/FloatingAIButton';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Leaf, 
  ShoppingBag, 
  Recycle, 
  Truck, 
  Gift, 
  TrendingUp, 
  Award,
  Star,
  Target,
  TreePine,
  Droplets,
  Zap,
  Heart,
  Trophy,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react';

const Rewards = () => {
  const { toast } = useToast();

  // ✅ State declarations
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isProductChatOpen, setIsProductChatOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Record<string, any>>({});
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([
    "First Green Purchase",
    "Bag Hero (10 reusable bags)",
    "Eco Delivery Champion"
  ]);

  const userLevel = {
    name: "Eco Hero",
    icon: <Award className="w-6 h-6" />,
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
    points: 2847,
    nextLevel: "Planet Guardian",
    pointsToNext: 653
  };

  const pointsBreakdown = [
    { category: "Green Products", points: 1250, icon: <Leaf className="w-5 h-5" />, color: "text-green-600" },
    { category: "Reusable Bags", points: 485, icon: <ShoppingBag className="w-5 h-5" />, color: "text-blue-600" },
    { category: "Eco Delivery", points: 620, icon: <Truck className="w-5 h-5" />, color: "text-purple-600" },
    { category: "Recycling Program", points: 392, icon: <Recycle className="w-5 h-5" />, color: "text-orange-600" },
    { category: "Referral Bonus", points: 100, icon: <Heart className="w-5 h-5" />, color: "text-pink-600" }
  ];

  const rewards = [
    { id: 1, name: "$10 Walmart Gift Card", points: 500, category: "Gift Cards", available: true, image: "🎁", description: "Use for any purchase at Walmart stores or online" },
    { id: 2, name: "20% Off Organic Produce", points: 300, category: "Discounts", available: true, image: "🥬", description: "Valid for one shopping trip on organic fruits & vegetables" },
    { id: 3, name: "Bamboo Utensil Set", points: 750, category: "Eco Products", available: true, image: "🍴", description: "Sustainable bamboo utensils with carrying case" },
    { id: 4, name: "Solar Power Bank", points: 1200, category: "Tech", available: true, image: "🔋", description: "10,000 mAh solar-powered portable charger" },
    { id: 5, name: "Free Eco-Delivery Month", points: 400, category: "Services", available: true, image: "🚚", description: "One month of free carbon-neutral delivery" },
    { id: 6, name: "Reusable Water Bottle", points: 600, category: "Eco Products", available: true, image: "💧", description: "Insulated stainless steel bottle with custom engraving" }
  ];

  const impactStats = [
    { label: "CO₂ Emissions Saved", value: "47.2 kg", icon: <TreePine className="w-6 h-6" />, color: "text-green-600" },
    { label: "Plastic Bottles Avoided", value: "156", icon: <Droplets className="w-6 h-6" />, color: "text-blue-600" },
    { label: "Energy Conserved", value: "23.8 kWh", icon: <Zap className="w-6 h-6" />, color: "text-yellow-600" }
  ];

  const progressPercentage = (userLevel.points / (userLevel.points + userLevel.pointsToNext)) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progressPercentage), 500);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  const handleRedeemReward = (reward: typeof rewards[0]) => {
    if (userLevel.points >= reward.points && !redeemedRewards.includes(reward.id)) {
      setRedeemedRewards([...redeemedRewards, reward.id]);
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've successfully redeemed ${reward.name}. Check your email for details.`,
      });

      if (reward.category === "Gift Cards" && !earnedBadges.includes("First Reward Redeemed")) {
        setTimeout(() => {
          setEarnedBadges([...earnedBadges, "First Reward Redeemed"]);
          toast({
            title: "New Achievement Unlocked! 🏆",
            description: "You earned the 'First Reward Redeemed' badge!",
          });
        }, 1500);
      }
    } else if (redeemedRewards.includes(reward.id)) {
      toast({
        title: "Already Redeemed",
        description: "You've already redeemed this reward!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.points - userLevel.points} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  const filterRewardsByCategory = (category: string) => {
    if (category === "all") return rewards;
    return rewards.filter(reward => reward.category.toLowerCase() === category.toLowerCase());
  };

  const RewardCard = ({ reward }: { reward: typeof rewards[0] }) => {
    const isRedeemed = redeemedRewards.includes(reward.id);
    const canRedeem = userLevel.points >= reward.points && !isRedeemed;

    return (
      <Card className={`hover:shadow-lg transition-all duration-300 ${isRedeemed ? 'opacity-60' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="text-3xl relative">
              {reward.image}
              {isRedeemed && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="w-4 h-4 text-green-600 bg-white rounded-full" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{reward.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{reward.description}</p>
              <Badge variant="outline" className="text-xs mb-2">{reward.category}</Badge>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-sm">{reward.points}</span>
                </div>
                <Button 
                  size="sm" 
                  disabled={!canRedeem}
                  onClick={() => handleRedeemReward(reward)}
                  className={`${canRedeem ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600' : ''}`}
                >
                  {isRedeemed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Redeemed
                    </>
                  ) : canRedeem ? (
                    'Redeem'
                  ) : (
                    'Need more points'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen w-full">
      <NavigationHeader />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 pt-10">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Walmart Genie Rewards
            </h1>
            <p className="text-gray-600 text-lg">Your sustainable shopping journey</p>
          </div>

          {/* User Level */}
          <Card className="overflow-hidden animate-fade-in">
            <div className={`${userLevel.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {userLevel.icon}
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      {userLevel.name}
                      <Sparkles className="w-5 h-5" />
                    </h2>
                    <p className="opacity-90">{userLevel.points.toLocaleString()} Total Points</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Next Level</div>
                  <div className="font-semibold">{userLevel.nextLevel}</div>
                  <Trophy className="w-8 h-8 mx-auto mt-2 opacity-80" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm opacity-90 mb-2">
                  <span>Progress to next level</span>
                  <span>{userLevel.pointsToNext} points to go</span>
                </div>
                <Progress value={animatedProgress} className="h-3 bg-white/20" />
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Points Breakdown */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Points Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pointsBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={item.color}>{item.icon}</div>
                        <span className="font-medium text-sm">{item.category}</span>
                      </div>
                      <Badge variant="secondary" className="font-bold">{item.points}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Impact Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-white to-gray-50 rounded-lg border hover:shadow-md transition-shadow">
                      <div className={stat.color}>{stat.icon}</div>
                      <div>
                        <div className="font-bold text-lg">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Rewards Catalog */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-purple-600" />
                    Rewards Catalog
                    <Badge className="ml-2">{redeemedRewards.length} Redeemed</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="discounts">Discounts</TabsTrigger>
                      <TabsTrigger value="gift cards">Gift Cards</TabsTrigger>
                      <TabsTrigger value="eco products">Eco Products</TabsTrigger>
                      <TabsTrigger value="services">Services</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {rewards.map((reward) => (
                          <RewardCard key={reward.id} reward={reward} />
                        ))}
                      </div>
                    </TabsContent>
                    {["discounts", "gift cards", "eco products", "services"].map((category) => (
                      <TabsContent key={category} value={category} className="mt-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          {filterRewardsByCategory(category).map((reward) => (
                            <RewardCard key={reward.id} reward={reward} />
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Your Achievements
                <Badge variant="outline">{earnedBadges.length} Earned</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {earnedBadges.map((badge, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 px-3 py-2 text-sm hover:bg-green-200 transition-colors cursor-pointer">
                    {badge === "First Green Purchase" && "🌱"} 
                    {badge === "Bag Hero (10 reusable bags)" && "🛍️"} 
                    {badge === "Eco Delivery Champion" && "🚚"} 
                    {badge === "First Reward Redeemed" && "🎉"} 
                    {badge}
                  </Badge>
                ))}
                <Badge className="bg-gray-100 text-gray-600 px-3 py-2 text-sm border-2 border-dashed">
                  <Clock className="w-4 h-4 mr-1" />
                  More coming soon...
                </Badge>
              </div>
            </CardContent>
          </Card>
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

export default Rewards;
