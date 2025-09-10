import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Sparkles, Star, Target, Users, Brain } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Smart Quiz",
      description: "Discover your strengths with our AI-powered aptitude test"
    },
    {
      icon: Target,
      title: "Personalized Paths",
      description: "Get custom career recommendations based on your profile"
    },
    {
      icon: Users,
      title: "Local Guidance",
      description: "Find nearby government colleges and courses"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/30 rounded-full animate-bounce blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-secondary/25 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-primary-glow/40 rounded-full animate-bounce blur-xl" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary animate-glow-pulse" />
            <span className="text-2xl font-bold text-gradient">PathFinder</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Confused about 
                  <span className="text-gradient block">what's next?</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-md">
                  Let's find your path together! 
                  <span className="block text-lg mt-2 text-accent">तर्वाता एमी चेयालो तेलियदम लेदा? मी दारिनी कनुगोंदाम।</span>
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group gradient-primary text-white font-semibold px-8 py-4 rounded-xl hover-lift shadow-float">
                  Start Your Discovery
                  <Sparkles className="ml-2 w-5 h-5 group-hover:animate-bounce" />
                </Button>
                <Button variant="outline" size="lg" className="glass-card border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 rounded-xl">
                  Watch Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">10K+</div>
                  <div className="text-sm text-muted-foreground">Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground">Colleges Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className={`relative ${isVisible ? 'animate-scale-in' : 'opacity-0'} ${isVisible ? 'animate-float' : ''}`} style={{ animationDelay: '0.3s' }}>
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
            <h2 className="text-4xl font-bold text-gradient mb-4">Why Choose PathFinder?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform combines personalized guidance with local opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`glass-card p-8 hover-lift group ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${0.2 * index}s` }}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-glow-pulse shadow-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gradient">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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