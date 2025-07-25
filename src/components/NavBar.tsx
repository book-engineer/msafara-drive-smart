import { Button } from "@/components/ui/button";
import { Menu, X, Zap, BarChart3, Car } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-card backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Msafara
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#marketplace" className="text-foreground/80 hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="#dashboard" className="text-foreground/80 hover:text-primary transition-colors">
              IoT Dashboard
            </a>
            <a href="#financing" className="text-foreground/80 hover:text-primary transition-colors">
              PAYS Financing
            </a>
            <a href="#analytics" className="text-foreground/80 hover:text-primary transition-colors">
              Analytics
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => window.location.href = '/auth'}
            >
              Sign In
            </Button>
            <Button 
              variant="hero"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <a href="#marketplace" className="text-foreground/80 hover:text-primary transition-colors">
                Marketplace
              </a>
              <a href="#dashboard" className="text-foreground/80 hover:text-primary transition-colors">
                IoT Dashboard
              </a>
              <a href="#financing" className="text-foreground/80 hover:text-primary transition-colors">
                PAYS Financing
              </a>
              <a href="#analytics" className="text-foreground/80 hover:text-primary transition-colors">
                Analytics
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="ghost"
                  onClick={() => window.location.href = '/auth'}
                >
                  Sign In
                </Button>
                <Button 
                  variant="hero"
                  onClick={() => window.location.href = '/auth'}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;