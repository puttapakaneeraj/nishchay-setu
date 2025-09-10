import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Clock, BookOpen, Target } from 'lucide-react';

interface RoadmapStep {
  step: number;
  title: string;
  duration: string;
  description: string;
}

interface CareerRoadmapProps {
  steps: RoadmapStep[];
  pathwayName: string;
}

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ steps, pathwayName }) => {
  return (
    <Card className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient flex items-center gap-3">
          <Target className="w-6 h-6 text-primary" />
          Your Career Roadmap: {pathwayName}
        </CardTitle>
        <p className="text-muted-foreground">Step-by-step journey to your dream career</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>
          
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex items-start gap-4 pb-8 last:pb-0">
              {/* Step Circle */}
              <div className={`
                relative z-10 flex items-center justify-center w-12 h-12 rounded-full font-bold text-white
                ${index === 0 ? 'bg-gradient-to-r from-primary to-primary-glow shadow-lg shadow-primary/30' : 
                  index === steps.length - 1 ? 'bg-gradient-to-r from-accent to-accent-glow shadow-lg shadow-accent/30' :
                  'bg-gradient-to-r from-secondary to-secondary-glow shadow-lg shadow-secondary/30'}
                animate-pulse-gentle
              `}>
                {step.step}
              </div>
              
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {/* Arrow for non-last items */}
              {index < steps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-primary/40 absolute right-4 top-6" />
              )}
            </div>
          ))}
        </div>
        
        {/* Success Message */}
        <div className="text-center p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-xl border border-success/20">
          <BookOpen className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="text-success font-medium">
            🎯 Follow this roadmap to achieve your career goals step by step!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerRoadmap;