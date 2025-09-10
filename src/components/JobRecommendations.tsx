import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  GraduationCap, 
  Shield, 
  TrendingUp,
  Building,
  Users,
  Star,
  ChevronRight,
  Download
} from 'lucide-react';

interface JobCategory {
  [key: string]: {
    salary: string;
    companies: string;
    skills: string;
  };
}

interface JobRecommendationsProps {
  immediateJobs: JobCategory;
  higherStudies: JobCategory;
  govtJobs: JobCategory;
  pathwayName: string;
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({ 
  immediateJobs, 
  higherStudies, 
  govtJobs, 
  pathwayName 
}) => {
  const [activeTab, setActiveTab] = useState('immediate');

  const renderJobCard = (jobTitle: string, jobData: any, icon: React.ReactNode, color: string) => (
    <Card key={jobTitle} className={`group hover:shadow-lg transition-all duration-300 border-l-4 border-l-${color} bg-gradient-to-r from-card/80 to-${color}/5`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-${color}/10 text-${color} group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {jobTitle}
              </h3>
              <div className="flex items-center gap-1 text-success font-medium">
                <TrendingUp className="w-4 h-4" />
                {jobData.salary}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <strong>Companies:</strong> {jobData.companies}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              <strong>Skills:</strong> {jobData.skills}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const tabData = [
    {
      id: 'immediate',
      label: 'Immediate Jobs',
      icon: <Briefcase className="w-4 h-4" />,
      data: immediateJobs,
      description: 'Start earning right after graduation',
      color: 'primary'
    },
    {
      id: 'higher',
      label: 'Higher Studies',
      icon: <GraduationCap className="w-4 h-4" />,
      data: higherStudies,
      description: 'Advanced degrees for specialization',
      color: 'secondary'
    },
    {
      id: 'govt',
      label: 'Govt. Jobs',
      icon: <Shield className="w-4 h-4" />,
      data: govtJobs,
      description: 'Secure government positions',
      color: 'accent'
    }
  ];

  return (
    <Card className="w-full bg-gradient-to-br from-card/50 to-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient flex items-center gap-3">
          <Users className="w-6 h-6 text-primary" />
          Career Opportunities: {pathwayName}
        </CardTitle>
        <p className="text-muted-foreground">Explore your career possibilities across different categories</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            {tabData.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-1">{tab.label}</h3>
                <p className="text-sm text-muted-foreground">{tab.description}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {Object.entries(tab.data).map(([jobTitle, jobData]) => 
                  renderJobCard(jobTitle, jobData, tab.icon, tab.color)
                )}
              </div>
              
              {Object.keys(tab.data).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No {tab.label.toLowerCase()} information available yet.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Need detailed career guidance?</h4>
              <p className="text-sm text-muted-foreground">Download your personalized career report</p>
            </div>
            <Button className="gap-2 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;