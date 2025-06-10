import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ShoppingCart, Star, Leaf } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Chat with Genie",
    description: "Tell our AI assistant what you're looking for. Ask questions, share preferences, or describe your needs in natural language."
  },
  {
    icon: ShoppingCart,
    step: "02", 
    title: "Add to Cart",
    description: "Review personalized recommendations with sustainability scores. Add eco-friendly options to your cart with confidence."
  },
  {
    icon: Star,
    step: "03",
    title: "Earn Green Points",
    description: "Complete your purchase and earn Green Points based on the environmental impact of your choices. Redeem for rewards!"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started with Walmart Genie in three simple steps. 
            It's designed to make sustainable shopping effortless and rewarding.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-6 w-12 h-0.5 bg-gradient-to-r from-eco-green to-primary"></div>
                )}
                
                <Card className="border-2 border-eco-light hover:border-eco-green transition-all duration-300 hover:shadow-xl bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center relative">
                      <div className="absolute -top-2 -right-2 bg-gradient-eco text-white text-sm font-bold px-3 py-1 rounded-full">
                        {step.step}
                      </div>
                      <div className="p-6 bg-eco-light rounded-full">
                        <step.icon className="h-10 w-10 text-eco-green" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-eco-light px-6 py-3 rounded-full">
            <Leaf className="h-5 w-5 text-eco-green" />
            <span className="text-eco-green font-semibold">Average user earns 50+ Green Points per week</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
