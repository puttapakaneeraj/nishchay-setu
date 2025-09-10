-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  grade TEXT,
  location TEXT,
  quiz_completed BOOLEAN DEFAULT false,
  top_career_cluster TEXT,
  quiz_scores JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career clusters table
CREATE TABLE public.career_clusters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  streams TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career pathways table
CREATE TABLE public.career_pathways (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cluster_id UUID REFERENCES public.career_clusters(id),
  pathway_name TEXT NOT NULL,
  stream TEXT NOT NULL,
  degree_program TEXT,
  description TEXT,
  duration TEXT,
  immediate_jobs JSONB,
  higher_studies JSONB,
  govt_jobs JSONB,
  roadmap_steps JSONB,
  colleges JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create colleges table
CREATE TABLE public.colleges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  type TEXT, -- government/private
  programs TEXT[],
  fees JSONB,
  contact_info JSONB,
  coordinates JSONB, -- lat, lng for map
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles (users can only access their own)
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for public data (career info accessible to all)
CREATE POLICY "Career clusters are publicly accessible" 
ON public.career_clusters 
FOR SELECT 
USING (true);

CREATE POLICY "Career pathways are publicly accessible" 
ON public.career_pathways 
FOR SELECT 
USING (true);

CREATE POLICY "Colleges are publicly accessible" 
ON public.colleges 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial career clusters data
INSERT INTO public.career_clusters (name, description, icon, color, streams) VALUES
('Builder', 'Hands-on problem solvers who create tangible solutions', '🔧', 'hsl(220, 70%, 50%)', ARRAY['Science', 'Commerce']),
('Analyst', 'Data-driven thinkers who analyze and strategize', '📊', 'hsl(145, 70%, 50%)', ARRAY['Commerce', 'Science']),
('Creator', 'Innovative minds who express ideas through art and design', '🎨', 'hsl(280, 70%, 50%)', ARRAY['Arts', 'Commerce']),
('Helper', 'People-focused individuals who make a positive social impact', '🤝', 'hsl(25, 70%, 50%)', ARRAY['Arts', 'Science']);

-- Insert sample career pathways
INSERT INTO public.career_pathways (cluster_id, pathway_name, stream, degree_program, description, duration, immediate_jobs, higher_studies, govt_jobs, roadmap_steps) VALUES
(
  (SELECT id FROM public.career_clusters WHERE name = 'Builder'),
  'Computer Science & Engineering',
  'Science',
  'B.Tech Computer Science',
  'Build software solutions and technological innovations',
  '4 years',
  '{"Software Developer": {"salary": "₹3-8 LPA", "companies": "TCS, Infosys, Wipro", "skills": "Programming, Problem Solving"}, "Web Developer": {"salary": "₹2-6 LPA", "companies": "Startups, IT Companies", "skills": "HTML, CSS, JavaScript"}, "Mobile App Developer": {"salary": "₹4-10 LPA", "companies": "Tech Companies", "skills": "React Native, Flutter"}}'::jsonb,
  '{"M.Tech": {"duration": "2 years", "specialization": "AI/ML, Cybersecurity, Data Science"}, "MS in Computer Science": {"duration": "2 years", "countries": "USA, Canada, Germany"}, "MBA": {"duration": "2 years", "specialization": "Tech Management"}}'::jsonb,
  '{"Software Engineer - PSUs": {"salary": "₹6-12 LPA", "companies": "BHEL, ISRO, DRDO"}, "IT Officer - Banks": {"salary": "₹5-10 LPA", "companies": "SBI, PNB, Bank of India"}, "Assistant Professor": {"salary": "₹4-8 LPA", "companies": "Government Colleges"}}'::jsonb,
  '[{"step": 1, "title": "Complete 12th Science (PCM)", "duration": "1 year", "description": "Focus on Physics, Chemistry, Mathematics"}, {"step": 2, "title": "Crack JEE/EAMCET", "duration": "6 months", "description": "Prepare for engineering entrance exams"}, {"step": 3, "title": "B.Tech Computer Science", "duration": "4 years", "description": "Learn programming, algorithms, software development"}, {"step": 4, "title": "Internships & Projects", "duration": "6 months", "description": "Gain practical experience"}, {"step": 5, "title": "Job/Higher Studies", "duration": "Ongoing", "description": "Start career or pursue advanced degrees"}]'::jsonb
),
(
  (SELECT id FROM public.career_clusters WHERE name = 'Analyst'),
  'Commerce & Finance',
  'Commerce',
  'B.Com',
  'Master financial analysis and business strategy',
  '3 years',
  '{"Accountant": {"salary": "₹2-5 LPA", "companies": "CA Firms, Companies", "skills": "Accounting, Tally, Excel"}, "Banking Associate": {"salary": "₹3-6 LPA", "companies": "Banks, NBFCs", "skills": "Finance, Customer Service"}, "Tax Consultant": {"salary": "₹3-7 LPA", "companies": "Tax Firms", "skills": "Tax Laws, GST"}}'::jsonb,
  '{"MBA": {"duration": "2 years", "specialization": "Finance, Marketing, Operations"}, "M.Com": {"duration": "2 years", "specialization": "Advanced Commerce"}, "CA": {"duration": "3-4 years", "specialization": "Chartered Accountancy"}, "CMA": {"duration": "3 years", "specialization": "Cost Management"}}'::jsonb,
  '{"Bank PO": {"salary": "₹4-8 LPA", "companies": "SBI, PNB, BOI"}, "Income Tax Officer": {"salary": "₹5-9 LPA", "companies": "Income Tax Department"}, "Auditor - CAG": {"salary": "₹4-7 LPA", "companies": "Comptroller and Auditor General"}}'::jsonb,
  '[{"step": 1, "title": "Complete 12th Commerce", "duration": "1 year", "description": "Focus on Accountancy, Economics, Business Studies"}, {"step": 2, "title": "B.Com Degree", "duration": "3 years", "description": "Learn accounting, finance, business fundamentals"}, {"step": 3, "title": "Professional Courses", "duration": "1-3 years", "description": "CA, CMA, CS alongside degree"}, {"step": 4, "title": "Internships", "duration": "6 months", "description": "Gain practical experience"}, {"step": 5, "title": "Career Path", "duration": "Ongoing", "description": "Jobs or higher studies"}]'::jsonb
);