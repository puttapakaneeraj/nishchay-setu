import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import JobRecommendations from './JobRecommendations';
import CareerRoadmap from './CareerRoadmap';
import { 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  Download, 
  RotateCcw,
  Sparkles,
  GraduationCap,
  MapPin,
  Star
} from 'lucide-react';

interface QuizResults {
  topCategory: string;
  scores: {
    builder: number;
    analyst: number;
    creator: number;
    helper: number;
  };
}

interface QuizResultsProps {
  results: QuizResults;
  onStartOver: () => void;
  onExploreColleges: () => void;
}

interface CareerPathway {
  id: string;
  pathway_name: string;
  stream: string;
  degree_program: string;
  description: string;
  duration: string;
  immediate_jobs: any;
  higher_studies: any;
  govt_jobs: any;
  roadmap_steps: any;
  cluster_id?: string;
  colleges?: any;
  created_at?: string;
}

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
    icon: Trophy,
    color: "from-orange-500 to-red-500",
    streams: ["Science (PCM)", "Commerce", "Vocational"],
    careers: ["Engineer", "Architect", "Project Manager", "Entrepreneur", "Civil Services"],
    colleges: ["Govt. Engineering College", "Polytechnic Institute", "Commerce College"]
  },
  analyst: {
    name: "The Analyst", 
    description: "You excel at problem-solving and working with data and systems",
    icon: BookOpen,
    color: "from-blue-500 to-purple-500",
    streams: ["Science (PCM/PCB)", "Commerce with Math"],
    careers: ["Data Scientist", "CA/CS", "Research Scientist", "Banking Professional", "Statistician"],
    colleges: ["Science College", "Statistics Institute", "Commerce College"]
  },
  creator: {
    name: "The Creator",
    description: "You bring imagination to life through art, design, and innovation",
    icon: Sparkles,
    color: "from-pink-500 to-violet-500",
    streams: ["Arts", "Fine Arts", "Mass Communication"],
    careers: ["Graphic Designer", "Writer", "Filmmaker", "Marketing Professional", "Teacher"],
    colleges: ["Arts College", "Fine Arts Institute", "Mass Comm College"]
  },
  helper: {
    name: "The Helper",
    description: "You find fulfillment in supporting and caring for others",
    icon: GraduationCap,
    color: "from-green-500 to-teal-500",
    streams: ["Arts", "Science (PCB)", "Social Work"],
    careers: ["Doctor", "Psychologist", "Social Worker", "Counselor", "Public Administration"],
    colleges: ["Medical College", "Arts College", "Social Work Institute"]
  }
};

const QuizResults: React.FC<QuizResultsProps> = ({ results, onStartOver, onExploreColleges }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [careerPathways, setCareerPathways] = useState<CareerPathway[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 800);
    
    fetchCareerPathways();
    
    return () => clearInterval(timer);
  }, [results.topCategory]);

  const fetchCareerPathways = async () => {
    try {
      setLoading(true);
      
      // Get cluster ID for the top category
      const { data: clusters } = await supabase
        .from('career_clusters')
        .select('id')
        .eq('name', results.topCategory.charAt(0).toUpperCase() + results.topCategory.slice(1))
        .single();

      if (clusters) {
        // Fetch pathways for this cluster
        const { data: pathways } = await supabase
          .from('career_pathways')
          .select('*')
          .eq('cluster_id', clusters.id);

        if (pathways) {
          setCareerPathways(pathways as CareerPathway[]);
          setSelectedPathway(pathways[0] as CareerPathway || null);
        }
      }
    } catch (error) {
      console.error('Error fetching career pathways:', error);
    } finally {
      setLoading(false);
    }
  };

  const cluster = careerClusters[results.topCategory];
  const secondaryScores = Object.entries(results.scores)
    .filter(([key]) => key !== results.topCategory)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 2);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
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

        {/* Career Pathways Selection */}
        {!loading && careerPathways.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center mb-4 text-gradient">
              🎯 Recommended Career Pathways
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {careerPathways.map((pathway) => (
                <Button
                  key={pathway.id}
                  variant={selectedPathway?.id === pathway.id ? "default" : "outline"}
                  onClick={() => setSelectedPathway(pathway)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {pathway.pathway_name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Job Recommendations and Roadmap */}
        {selectedPathway && (
          <div className="mt-8 space-y-8">
            <JobRecommendations
              immediateJobs={selectedPathway.immediate_jobs || {}}
              higherStudies={selectedPathway.higher_studies || {}}
              govtJobs={selectedPathway.govt_jobs || {}}
              pathwayName={selectedPathway.pathway_name}
            />
            
            <CareerRoadmap
              steps={Array.isArray(selectedPathway.roadmap_steps) ? selectedPathway.roadmap_steps : []}
              pathwayName={selectedPathway.pathway_name}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            onClick={onExploreColleges}
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Explore Colleges
          </Button>
          
          <Button 
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 shadow-md transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Report
          </Button>
          
          <Button 
            onClick={onStartOver}
            variant="secondary"
            className="shadow-md transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Quiz Again
          </Button>
        </div>

        {/* Encouraging Message */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl border border-success/20">
          <Sparkles className="w-8 h-8 text-success mx-auto mb-3" />
          <p className="text-lg font-medium text-success mb-2">
            Your journey to success starts here! 🚀
          </p>
          <p className="text-muted-foreground">
            Remember, every expert was once a beginner. Take the first step with confidence!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;