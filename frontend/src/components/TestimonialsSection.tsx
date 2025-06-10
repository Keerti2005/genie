
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Leaf } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Eco-conscious Mom",
    avatar: "SC",
    quote: "Walmart Genie has completely transformed how I shop. I've reduced my family's carbon footprint by 30% while saving money on eco-friendly alternatives.",
    rating: 5,
    impact: "Saved 127 lbs of CO2"
  },
  {
    name: "Marcus Rodriguez", 
    role: "Sustainability Advocate",
    avatar: "MR",
    quote: "The AI recommendations are spot-on. I love how it suggests products I never knew existed. My Green Points balance keeps growing every week!",
    rating: 5,
    impact: "Earned 2,340 Green Points"
  },
  {
    name: "Jennifer Kim",
    role: "Busy Professional",
    avatar: "JK", 
    quote: "Shopping sustainably used to be time-consuming. Now Genie does all the research for me. I can shop with confidence knowing I'm making good choices.",
    rating: 5,
    impact: "20 hours saved monthly"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-eco-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Trusted by <span className="text-gradient">Eco-Warriors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of shoppers who are making a difference with every purchase. 
            See what our community has accomplished together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white animate-scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-walmart-yellow fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-eco-green text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-eco-light px-4 py-2 rounded-full">
                  <Leaf className="h-4 w-4 text-eco-green" />
                  <span className="text-eco-green font-semibold text-sm">{testimonial.impact}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-eco-green mb-2">100K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-eco-green mb-2">2M+</div>
              <div className="text-muted-foreground">Eco Products Recommended</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-eco-green mb-2">500K</div>
              <div className="text-muted-foreground">Tons of CO2 Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
