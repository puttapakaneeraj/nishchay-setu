import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Brain, 
  Target, 
  Users, 
  Lightbulb, 
  Heart,
  ArrowRight,
  Download,
  MapPin,
  Star,
  TrendingUp
} from 'lucide-react';

interface CareerCluster {
  name: string;
  description: string;
  icon: any;
  color: string;
  streams: string[];
  careers: string[];
  colleges: string[];
}

const careerClusters: Record<string, CareerCluster> = {
  builder: {
    name: "The Builder",
    description: "You love creating tangible solutions and leading projects to completion",
    icon: Target,
    color: "from-orange-500 to-red-500",
    streams: ["Science (PCM)", "Commerce", "Vocational"],
    careers: ["Engineer", "Architect", "Project Manager", "Entrepreneur", "Civil Services"],
    colleges: ["Govt. Engineering College", "Polytechnic Institute", "Commerce College"]
  },
  analyst: {
    name: "The Analyst", 
    description: "You excel at problem-solving and working with data and systems",
    icon: Brain,
    color: "from-blue-500 to-purple-500",
    streams: ["Science (PCM/PCB)", "Commerce with Math"],
    careers: ["Data Scientist", "CA/CS", "Research Scientist", "Banking Professional", "Statistician"],
    colleges: ["Science College", "Statistics Institute", "Commerce College"]
  },
  creator: {
    name: "The Creator",
    description: "You bring imagination to life through art, design, and innovation",
    icon: Lightbulb,
    color: "from-pink-500 to-violet-500",
    streams: ["Arts", "Fine Arts", "Mass Communication"],
    careers: ["Graphic Designer", "Writer", "Filmmaker", "Marketing Professional", "Teacher"],
    colleges: ["Arts College", "Fine Arts Institute", "Mass Comm College"]
  },
  helper: {
    name: "The Helper",
    description: "You find fulfillment in supporting and caring for others",
    icon: Heart,
    color: "from-green-500 to-teal-500",
    streams: ["Arts", "Science (PCB)", "Social Work"],
    careers: ["Doctor", "Psychologist", "Social Worker", "Counselor", "Public Administration"],
    colleges: ["Medical College", "Arts College", "Social Work Institute"]
  }
};

const QuizResults = ({ 
  results, 
  onStartOver, 
  onExploreColleges 
}: { 
  results: any; 
  onStartOver: () => void;
  onExploreColleges: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimationStep(prev => prev + 1);
    }, 600);
    
    return () => clearInterval(timer);
  }, []);

  const cluster = careerClusters[results.topCategory];
  const secondaryScores = Object.entries(results.scores)
    .filter(([key]) => key !== results.topCategory)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 2);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-glow-pulse" />
            <span className="text-lg text-muted-foreground">Your Results Are Ready!</span>
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Amazing Discovery!
          </h1>
          <p className="text-xl text-muted-foreground">
            Here's what we learned about your unique talents
          </p>
        </div>

        {/* Main Result Card */}
        <Card className={`glass-card p-8 mb-8 ${animationStep >= 1 ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${cluster.color} flex items-center justify-center animate-glow-pulse shadow-float`}>
              <cluster.icon className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold text-gradient mb-4">
              You are {cluster.name}! 
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {cluster.description}
            </p>
          </div>

          {/* Personality Breakdown */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {Math.round((results.scores[results.topCategory] / 5) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Primary Match</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {cluster.careers.length}+
              </div>
              <div className="text-sm text-muted-foreground">Career Paths</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                {cluster.colleges.length}+
              </div>
              <div className="text-sm text-muted-foreground">College Types</div>
            </div>
          </div>
        </Card>

        {/* Recommended Streams */}
        <Card className={`glass-card p-8 mb-8 ${animationStep >= 2 ? 'animate-slide-up' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gradient mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Recommended Streams for You
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {cluster.streams.map((stream, index) => (
              <div key={index} className="quiz-option p-4" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{stream}</span>
                  <Star className="w-4 h-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Career Opportunities */}
        <Card className={`glass-card p-8 mb-8 ${animationStep >= 3 ? 'animate-slide-up' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gradient mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2" />
            Your Career Opportunities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cluster.careers.map((career, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="p-3 text-sm justify-center hover-lift glass-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {career}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Secondary Traits */}
        <Card className={`glass-card p-8 mb-8 ${animationStep >= 4 ? 'animate-slide-up' : 'opacity-0'}`}>
          <h3 className="text-2xl font-bold text-gradient mb-6">
            Your Other Strengths
          </h3>
          <div className="space-y-4">
            {secondaryScores.map(([category, score], index) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{category}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(((score as number) / 5) * 100)}%
                  </span>
                </div>
                <Progress value={((score as number) / 5) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${animationStep >= 5 ? 'animate-slide-up' : 'opacity-0'}`}>
          <Button size="lg" onClick={onExploreColleges} className="group gradient-primary text-white font-semibold px-8 py-4 rounded-xl hover-lift shadow-float">
            Explore Local Colleges
            <MapPin className="ml-2 w-5 h-5 group-hover:animate-bounce" />
          </Button>
          
          <Button variant="outline" size="lg" className="glass-card border-primary/30 text-primary hover:bg-primary/10 px-8 py-4 rounded-xl">
            Download Report
            <Download className="ml-2 w-5 h-5" />
          </Button>
          
          <Button variant="outline" size="lg" onClick={onStartOver} className="glass-card border-muted/30 px-8 py-4 rounded-xl">
            Take Quiz Again
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Encouraging Message */}
        <div className={`text-center mt-12 ${animationStep >= 6 ? 'animate-slide-up' : 'opacity-0'}`}>
          <p className="text-lg text-gradient font-medium">
            "Every expert was once a beginner. Your journey starts here! 🌟"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Ready to chat with Dost for more personalized guidance?
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;