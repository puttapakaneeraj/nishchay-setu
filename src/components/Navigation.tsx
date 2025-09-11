import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Home,
  Brain,
  MessageCircle,
  Map,
  User,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "quiz", label: "Take Quiz", icon: Brain },
    { id: "chat", label: "Chat with Dost", icon: MessageCircle },
    { id: "courses", label: "Explore Courses", icon: Map },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onPageChange("home")}
            >
              {/* <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center animate-glow-pulse shadow-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div> */}
              <Logo />
              <span className="text-2xl font-bold text-gradient">NextStep</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover-lift ${
                    currentPage === item.id
                      ? "gradient-primary text-white shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-card-glass/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Profile */}
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-primary/30"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center space-x-2"
              onClick={() => onPageChange("home")}
            >
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center animate-glow-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">
                PathFinder
              </span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-card border-t border-white/10 shadow-float">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                    currentPage === item.id
                      ? "gradient-primary text-white shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-card-glass/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              <div className="pt-2 border-t border-white/10">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full glass-card border-primary/30"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 ${
                currentPage === item.id
                  ? "gradient-primary text-white shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-card-glass/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">
                {item.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navigation;
