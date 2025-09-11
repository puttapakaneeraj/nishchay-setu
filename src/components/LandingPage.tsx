import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Star, Target, Users, Brain } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onPageChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Smart Quiz",
      description: "Discover your strengths with our AI-powered aptitude test",
    },
    {
      icon: Target,
      title: "Personalized Paths",
      description: "Get custom career recommendations based on your profile",
    },
    {
      icon: Users,
      title: "Local Guidance",
      description: "Find nearby government colleges and courses",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070712]">
      {/* Animated Background Elements (kept subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/6 rounded-full animate-float blur-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/6 rounded-full animate-float blur-2xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div
              className={`space-y-6 transform transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="space-y-3 pl-12">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight text-white">
                  Confused about
                  <span className="block text-white">what's next?</span>
                </h1>

                <p className="text-base md:text-lg text-slate-300 max-w-lg">
                  Let's find your path together!
                  <span className="block text-sm mt-2 text-slate-400">
                    तर्वाता एमी चेयालो तेलियदम लेदा? मी दारिनी कनुगोंदाम।
                  </span>
                </p>
              </div>

              {/* CTA Buttons (smaller, tighter) */}
              <div className="flex flex-col sm:flex-row gap-3 pl-12">
                <button
                  onClick={() => onPageChange("quiz")}
                  aria-label="Start the discovery quiz"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-400 text-black font-semibold shadow-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20"
                >
                  Start Your Discovery
                  <Sparkles className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onPageChange("courses")}
                  aria-label="Watch demo or explore courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white hover:bg-white/6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/10"
                >
                  Watch Demo
                  <ArrowRight className="w-4 h-4 opacity-90" />
                </button>
              </div>

              {/* Stats (reduced size and more breathing room) */}
              <div className="flex gap-8 pt-6 pl-12">
                <div>
                  <div className="text-2xl md:text-2xl font-bold text-white">
                    10K+
                  </div>
                  <div className="text-sm text-slate-400">Students Guided</div>
                </div>
                <div>
                  <div className="text-2xl md:text-2xl font-bold text-white">
                    500+
                  </div>
                  <div className="text-sm text-slate-400">Colleges Listed</div>
                </div>
                <div>
                  <div className="text-2xl md:text-2xl font-bold text-white">
                    95%
                  </div>
                  <div className="text-sm text-slate-400">Success Rate</div>
                </div>
              </div>
            </div>
            {/* Right Image (reduced size, contained, aligned) */}
            <div
              className={`relative ${
                isVisible ? "animate-scale-in" : "opacity-0"
              } ${isVisible ? "animate-float" : ""}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-float">
                <img
                  src={heroImage}
                  alt="Students discovering career paths with AI guidance"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-bounce shadow-glow">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center animate-glow-pulse shadow-glow">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose PathFinder?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Our AI-powered platform combines personalized guidance with local
              opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-8 hover-lift group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${0.12 * (index + 1)}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
