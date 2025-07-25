import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import heroVehicle from "@/assets/hero-vehicle.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroVehicle} 
          alt="IoT-enabled electric vehicle" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">IoT-Powered Mobility</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Smart Mobility
              </span>
              <br />
              <span className="text-foreground">
                Pay-As-You-Save
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Revolutionary IoT-enabled e-bike and e-tuktuk marketplace with transparent 
              financing, real-time analytics, and smart security for African urban mobility.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">IoT Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm font-medium">Smart Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium">Real Analytics</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="animate-pulse-glow">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Active Vehicles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">98%</div>
                <div className="text-sm text-muted-foreground">Payment Success</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">3</div>
                <div className="text-sm text-muted-foreground">Cities Live</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-hero rounded-full opacity-20 animate-pulse-glow" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-float" />
              <div className="absolute inset-8 bg-card rounded-full shadow-glow flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Zap className="w-16 h-16 text-primary mx-auto" />
                  <div className="text-sm font-semibold">IoT Connected</div>
                  <div className="text-xs text-muted-foreground">Real-time monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;