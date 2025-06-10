
import { Separator } from "@/components/ui/separator";
import { Leaf } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-eco-green rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">Walmart Genie</span>
            </div>
            <p className="text-white/80 leading-relaxed max-w-md">
              Your AI-powered shopping assistant that helps you make sustainable choices 
              while earning rewards. Shop smarter, live greener.
            </p>
            <div className="mt-6">
              <p className="text-sm text-white/60">
                © 2024 Walmart Genie. All rights reserved.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  Rewards Program
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-eco-green transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span>Made with 💚 for a sustainable future</span>
          </div>
          <div className="flex items-center gap-6">
            <span>🌱 Carbon Neutral Shipping</span>
            <span>♻️ Eco-Friendly Packaging</span>
            <span>🌍 Global Impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
