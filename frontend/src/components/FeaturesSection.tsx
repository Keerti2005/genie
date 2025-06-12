
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Leaf, ShoppingCart, Gift } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Shopping Assistant",
    description: "Chat with our intelligent Genie to find products that match your needs, preferences, and values. Get personalized recommendations instantly."
  },
  {
    icon: Leaf,
    title: "Eco Score & Green Points",
    description: "See the environmental impact of every product with our sustainability scoring system. Earn Green Points for eco-friendly choices."
  },
  {
    icon: ShoppingCart,
    title: "Smart Cart Recommendations",
    description: "Get intelligent suggestions to optimize your cart for sustainability, savings, and nutritional value with every purchase."
  },
  {
    icon: Gift,
    title: "Redeemable Rewards",
    description: "Turn your Green Points into real rewards - discounts, exclusive products, and special offers for sustainable shopping."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-warm-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Why Choose <span className="text-gradient">Walmart Genie?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our AI-powered features transform your shopping experience 
            while helping you make a positive impact on the planet.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white animate-scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-eco-light rounded-full">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
