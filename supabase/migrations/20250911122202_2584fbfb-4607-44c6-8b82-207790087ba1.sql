-- Create courses table for post-10th and post-12th courses
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL CHECK (level IN ('post_10th', 'post_12th')),
  duration TEXT,
  course_type TEXT,
  specializations JSONB DEFAULT '[]',
  entrance_exams JSONB DEFAULT '[]',
  career_paths JSONB DEFAULT '[]',
  job_opportunities JSONB DEFAULT '[]',
  roadmap_stages JSONB DEFAULT '[]',
  colleges_offering JSONB DEFAULT '[]',
  fees_range JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Courses are publicly accessible" 
ON public.courses 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();