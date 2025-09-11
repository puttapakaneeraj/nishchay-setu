import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, ArrowRight, BookOpen, Award, Briefcase } from 'lucide-react';

interface RoadmapStage {
  stage: string;
  duration: string;
  description: string;
  requirements: string[];
}

interface CourseRoadmapProps {
  stages: RoadmapStage[];
  courseName: string;
}

export const CourseRoadmap: React.FC<CourseRoadmapProps> = ({ stages, courseName }) => {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());

  const toggleStageCompletion = (index: number) => {
    const newCompleted = new Set(completedStages);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedStages(newCompleted);
  };

  const getStageIcon = (stageName: string) => {
    const name = stageName.toLowerCase();
    if (name.includes('exam') || name.includes('entrance') || name.includes('test')) {
      return Award;
    } else if (name.includes('course') || name.includes('training') || name.includes('education')) {
      return BookOpen;
    } else if (name.includes('placement') || name.includes('career') || name.includes('job')) {
      return Briefcase;
    }
    return CheckCircle;
  };

  if (!stages || stages.length === 0) {
    return (
      <Card className="glass-card">
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Roadmap Coming Soon</h3>
          <p className="text-muted-foreground">
            Detailed roadmap for {courseName} will be available soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gradient mb-4">{courseName} Journey Roadmap</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow this step-by-step roadmap to successfully complete your {courseName} journey from admission to career placement.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gradient">
            <CheckCircle className="w-5 h-5" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              {completedStages.size} of {stages.length} stages completed
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round((completedStages.size / stages.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full gradient-primary transition-all duration-500"
              style={{ width: `${(completedStages.size / stages.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Stages */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary opacity-30 hidden md:block" />

        <div className="space-y-6">
          {stages.map((stage, index) => {
            const Icon = getStageIcon(stage.stage);
            const isCompleted = completedStages.has(index);
            const isExpanded = expandedStage === index;

            return (
              <div key={index} className="relative">
                {/* Stage Card */}
                <Card className={`glass-card hover-lift transition-all duration-300 ml-0 md:ml-16 ${
                  isCompleted ? 'border-primary/50 bg-primary/5' : ''
                } ${isExpanded ? 'shadow-glow' : ''}`}>
                  {/* Stage Number Indicator */}
                  <div className={`absolute -left-4 md:-left-20 top-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'glass-card text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>

                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedStage(isExpanded ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className={`text-lg ${isCompleted ? 'text-primary' : 'text-gradient'}`}>
                            {stage.stage}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {stage.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={isCompleted ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStageCompletion(index);
                          }}
                        >
                          {isCompleted ? 'Completed' : 'Mark Done'}
                        </Button>
                        <ArrowRight className={`w-4 h-4 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="pt-0 animate-slide-up">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Description</h4>
                          <p className="text-muted-foreground">{stage.description}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <div className="space-y-2">
                            {stage.requirements?.map((requirement, reqIndex) => (
                              <div key={reqIndex} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{requirement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Message */}
      {completedStages.size === stages.length && (
        <Card className="glass-card border-primary/50 bg-primary/5 animate-scale-in">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center animate-glow-pulse">
              <Award className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Congratulations! 🎉</h3>
            <p className="text-muted-foreground mb-4">
              You've completed all stages of the {courseName} roadmap. You're now ready to pursue your career goals!
            </p>
            <Button className="gradient-primary text-white">
              Explore Career Opportunities
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};