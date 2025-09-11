import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Clock, GraduationCap, MapPin, Banknote, TrendingUp, Users, Award } from 'lucide-react';
import { CourseRoadmap } from './CourseRoadmap';

import { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];

interface CourseInterface {
  id: string;
  name: string;
  description: string;
  level: string;
  duration: string;
  course_type: string;
  specializations: string[];
  entrance_exams: string[];
  career_paths: string[];
  job_opportunities: string[];
  roadmap_stages: any[];
  colleges_offering: string[];
  fees_range: any;
}

const CourseExplorer = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseInterface | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name');
      
      if (error) throw error;
      // Transform the database data to match our interface
      const transformedData: CourseInterface[] = (data || []).map(course => ({
        ...course,
        specializations: Array.isArray(course.specializations) ? course.specializations.map(s => String(s)) : [],
        entrance_exams: Array.isArray(course.entrance_exams) ? course.entrance_exams.map(s => String(s)) : [],
        career_paths: Array.isArray(course.career_paths) ? course.career_paths.map(s => String(s)) : [],
        job_opportunities: Array.isArray(course.job_opportunities) ? course.job_opportunities.map(s => String(s)) : [],
        roadmap_stages: Array.isArray(course.roadmap_stages) ? course.roadmap_stages : [],
        colleges_offering: Array.isArray(course.colleges_offering) ? course.colleges_offering.map(s => String(s)) : [],
        fees_range: course.fees_range || {}
      }));
      setCourses(transformedData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  const handleCourseSelect = (course: CourseInterface) => {
    setSelectedCourse(course);
  };

  const formatFees = (fees: any) => {
    if (!fees || typeof fees !== 'object') return 'Contact college for fees';
    const entries = Object.entries(fees);
    return entries.map(([type, range]) => `${type}: ${range}`).join(', ');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-glow-pulse w-16 h-16 gradient-primary rounded-2xl mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gradient mb-2">Loading Courses</h2>
          <p className="text-muted-foreground">Fetching course information...</p>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => setSelectedCourse(null)}
            className="mb-6 glass-card border-primary/30 hover:bg-primary/10"
          >
            ← Back to Courses
          </Button>

          {/* Course Header */}
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold text-gradient mb-4">{selectedCourse.name}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              {selectedCourse.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedCourse.duration}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {selectedCourse.course_type}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {selectedCourse.level === 'post_10th' ? 'After 10th' : 'After 12th'}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto glass-card">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Specializations */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gradient">
                      <BookOpen className="w-5 h-5" />
                      Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCourse.specializations?.map((spec, index) => (
                        <Badge key={index} variant="outline" className="justify-center">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Entrance Exams */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gradient">
                      <Award className="w-5 h-5" />
                      Entrance Exams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedCourse.entrance_exams?.map((exam, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm font-medium">{exam}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fees Information */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient">
                    <Banknote className="w-5 h-5" />
                    Fee Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{formatFees(selectedCourse.fees_range)}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap">
              <CourseRoadmap stages={selectedCourse.roadmap_stages} courseName={selectedCourse.name} />
            </TabsContent>

            <TabsContent value="careers" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Career Paths */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gradient">
                      <TrendingUp className="w-5 h-5" />
                      Career Paths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCourse.career_paths?.map((path, index) => (
                        <div key={index} className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <span className="font-medium text-primary">{path}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Job Opportunities */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gradient">
                      <Users className="w-5 h-5" />
                      Job Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedCourse.job_opportunities?.map((job, index) => (
                        <div key={index} className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                          <span className="font-medium text-secondary">{job}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="colleges">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gradient">
                    <MapPin className="w-5 h-5" />
                    Colleges Offering This Course
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedCourse.colleges_offering?.map((college, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                        <span className="font-medium">{college}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gradient mb-4">Explore Courses</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover comprehensive courses available after 10th and 12th grade with detailed career roadmaps
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 rounded-xl">
            <div className="flex space-x-1">
              <Button
                variant={selectedLevel === 'all' ? 'default' : 'ghost'}
                onClick={() => setSelectedLevel('all')}
                className="rounded-lg"
              >
                All Courses
              </Button>
              <Button
                variant={selectedLevel === 'post_10th' ? 'default' : 'ghost'}
                onClick={() => setSelectedLevel('post_10th')}
                className="rounded-lg"
              >
                After 10th
              </Button>
              <Button
                variant={selectedLevel === 'post_12th' ? 'default' : 'ghost'}
                onClick={() => setSelectedLevel('post_12th')}
                className="rounded-lg"
              >
                After 12th
              </Button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Card 
              key={course.id} 
              className={`glass-card hover-lift cursor-pointer group ${
                filteredCourses.length > 0 ? 'animate-slide-up' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCourseSelect(course)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={course.level === 'post_10th' ? 'secondary' : 'default'}
                    className="mb-2"
                  >
                    {course.level === 'post_10th' ? 'After 10th' : 'After 12th'}
                  </Badge>
                  <Badge variant="outline">
                    {course.course_type}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gradient group-hover:scale-105 transition-transform">
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="text-primary font-medium">
                    {course.specializations?.length || 0} Specializations
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.specializations?.slice(0, 3).map((spec, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {course.specializations && course.specializations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.specializations.length - 3} more
                    </Badge>
                  )}
                </div>

                <Button className="w-full gradient-primary text-white hover-lift">
                  Explore Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
            <p className="text-muted-foreground">
              No courses available for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseExplorer;