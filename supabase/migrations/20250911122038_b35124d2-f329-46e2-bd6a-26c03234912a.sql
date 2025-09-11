-- Create courses table for post-10th and post-12th courses
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL CHECK (level IN ('post_10th', 'post_12th')),
  duration TEXT,
  course_type TEXT, -- diploma, degree, certification, etc.
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

-- Insert comprehensive course data
INSERT INTO public.courses (name, description, level, duration, course_type, specializations, entrance_exams, career_paths, job_opportunities, roadmap_stages, colleges_offering, fees_range) VALUES

-- Post-10th Courses
('ITI (Industrial Training Institute)', 'Technical vocational training courses', 'post_10th', '6 months - 2 years', 'diploma', 
'["Electrician", "Fitter", "Welder", "Computer Operator", "Motor Mechanic", "Carpenter"]',
'["No entrance exam required", "Merit-based admission"]',
'["Skilled Technician", "Supervisor", "Self Employment", "Government Jobs"]',
'["Junior Technician", "Skilled Worker", "Technical Assistant", "Supervisor", "Entrepreneur"]',
'[
  {"stage": "Admission", "duration": "1 month", "description": "Apply through state ITI portal", "requirements": ["10th certificate", "Age 14-40"]},
  {"stage": "Training", "duration": "6-24 months", "description": "Practical and theoretical training", "requirements": ["Regular attendance", "Internal assessments"]},
  {"stage": "Certification", "duration": "1 month", "description": "NCVT/SCVT certification exam", "requirements": ["Complete training", "Pass final exam"]},
  {"stage": "Placement", "duration": "Ongoing", "description": "Job placement assistance", "requirements": ["Valid certificate", "Skills demonstration"]}
]',
'["Government ITIs", "Private ITIs", "Industrial Training Centers"]',
'{"government": "₹5,000-15,000", "private": "₹20,000-50,000"}'),

('Polytechnic Diploma', '3-year technical diploma courses', 'post_10th', '3 years', 'diploma',
'["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Computer Science", "Electronics", "Automobile"]',
'["State Polytechnic Entrance Test", "JEE Main", "Merit-based"]',
'["Engineering Technician", "Junior Engineer", "Technical Assistant", "Higher Studies (B.Tech)"]',
'["Junior Engineer", "Technical Officer", "Assistant Engineer", "CAD Designer", "Quality Control Inspector"]',
'[
  {"stage": "Entrance Exam", "duration": "2 months", "description": "Prepare and appear for state polytechnic entrance", "requirements": ["10th pass", "Physics, Chemistry, Math"]},
  {"stage": "Admission", "duration": "1 month", "description": "Counseling and seat allocation", "requirements": ["Valid entrance score", "Document verification"]},
  {"stage": "Diploma Course", "duration": "3 years", "description": "6 semesters of technical education", "requirements": ["Regular attendance", "Pass all semesters"]},
  {"stage": "Industrial Training", "duration": "6 months", "description": "Practical training in industry", "requirements": ["Complete course", "Industry placement"]},
  {"stage": "Career/Higher Studies", "duration": "Ongoing", "description": "Job placement or lateral entry to B.Tech", "requirements": ["Diploma certificate", "Good grades"]}
]',
'["Government Polytechnics", "Private Polytechnics", "University Affiliated Colleges"]',
'{"government": "₹10,000-30,000/year", "private": "₹50,000-150,000/year"}'),

-- Post-12th Courses  
('B.Tech/B.E. (Engineering)', '4-year undergraduate engineering degree', 'post_12th', '4 years', 'degree',
'["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics", "Chemical", "Aerospace", "Biotechnology"]',
'["JEE Main", "JEE Advanced", "State Engineering Entrance", "BITSAT", "VITEEE"]',
'["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Research & Development", "Higher Studies (M.Tech)"]',
'["Software Developer", "Design Engineer", "Project Manager", "Research Scientist", "Consultant", "Government Engineer"]',
'[
  {"stage": "Entrance Preparation", "duration": "1-2 years", "description": "Prepare for JEE Main/Advanced", "requirements": ["12th with PCM", "Strong math & physics"]},
  {"stage": "Entrance Exam", "duration": "3 months", "description": "Appear for engineering entrance exams", "requirements": ["Registration", "Admit card"]},
  {"stage": "Counseling", "duration": "2 months", "description": "College and branch selection", "requirements": ["Valid JEE score", "Document verification"]},
  {"stage": "B.Tech Course", "duration": "4 years", "description": "8 semesters of engineering education", "requirements": ["Regular attendance", "Pass all semesters"]},
  {"stage": "Internships", "duration": "6-12 months", "description": "Industry internships and projects", "requirements": ["Complete 6 semesters", "Company selection"]},
  {"stage": "Placement/Higher Studies", "duration": "6 months", "description": "Campus placement or M.Tech admission", "requirements": ["Good CGPA", "Technical skills"]}
]',
'["IITs", "NITs", "IIITs", "State Government Colleges", "Private Engineering Colleges"]',
'{"government": "₹50,000-200,000/year", "private": "₹200,000-800,000/year"}'),

('MBBS (Medical)', '5.5-year undergraduate medical degree', 'post_12th', '5.5 years', 'degree',
'["General Medicine", "Surgery", "Pediatrics", "Gynecology", "Orthopedics", "Dermatology"]',
'["NEET-UG", "State Medical Entrance", "AIIMS MBBS"]',
'["Doctor", "Medical Officer", "Specialist", "Researcher", "Medical Entrepreneur"]',
'["General Practitioner", "Medical Officer", "Hospital Doctor", "Private Practice", "Medical Researcher"]',
'[
  {"stage": "NEET Preparation", "duration": "1-2 years", "description": "Intensive preparation for medical entrance", "requirements": ["12th with PCB", "NEET registration"]},
  {"stage": "NEET Exam", "duration": "1 day", "description": "National medical entrance examination", "requirements": ["Valid registration", "Admit card"]},
  {"stage": "Counseling", "duration": "2 months", "description": "Medical college seat allocation", "requirements": ["NEET qualifying score", "Document verification"]},
  {"stage": "MBBS Course", "duration": "4.5 years", "description": "Medical education with clinical training", "requirements": ["Regular attendance", "Pass all exams"]},
  {"stage": "Internship", "duration": "1 year", "description": "Compulsory medical internship", "requirements": ["Complete MBBS", "Hospital posting"]},
  {"stage": "Medical Practice/PG", "duration": "Ongoing", "description": "Practice or pursue specialization", "requirements": ["MBBS degree", "Medical license"]}
]',
'["AIIMS", "Government Medical Colleges", "Private Medical Colleges", "Deemed Universities"]',
'{"government": "₹50,000-500,000/year", "private": "₹500,000-2,500,000/year"}'),

('B.Com (Commerce)', '3-year undergraduate commerce degree', 'post_12th', '3 years', 'degree',
'["Accounting", "Finance", "Banking", "Taxation", "Business Management", "Economics"]',
'["Merit-based admission", "University entrance tests", "Management quota"]',
'["Accountant", "Financial Analyst", "Banking", "Business Manager", "Entrepreneur"]',
'["Accountant", "Bank Officer", "Tax Consultant", "Financial Advisor", "Business Analyst", "Audit Assistant"]',
'[
  {"stage": "Admission", "duration": "2 months", "description": "Apply to universities/colleges", "requirements": ["12th pass any stream", "Merit-based selection"]},
  {"stage": "B.Com Course", "duration": "3 years", "description": "6 semesters of commerce education", "requirements": ["Regular attendance", "Pass semester exams"]},
  {"stage": "Practical Training", "duration": "6 months", "description": "Internships and practical exposure", "requirements": ["Complete 4 semesters", "Company tie-ups"]},
  {"stage": "Specialization", "duration": "1 year", "description": "Choose specialization in final year", "requirements": ["Good academic record", "Career interest"]},
  {"stage": "Career/Further Studies", "duration": "Ongoing", "description": "Job placement or higher studies", "requirements": ["B.Com degree", "Additional certifications"]}
]',
'["Delhi University", "Mumbai University", "Christ University", "Loyola College", "St. Xaviers College"]',
'{"government": "₹10,000-50,000/year", "private": "₹100,000-300,000/year"}'),

('BBA (Business Administration)', '3-year undergraduate business degree', 'post_12th', '3 years', 'degree',
'["Marketing", "Finance", "Human Resources", "Operations", "International Business", "Entrepreneurship"]',
'["Management entrance tests", "Merit-based", "Personal Interview", "Group Discussion"]',
'["Business Manager", "Marketing Executive", "HR Professional", "Operations Manager", "Entrepreneur"]',
'["Management Trainee", "Business Development Executive", "Marketing Coordinator", "HR Assistant", "Operations Executive"]',
'[
  {"stage": "Entrance Preparation", "duration": "6 months", "description": "Prepare for management entrance tests", "requirements": ["12th pass", "English proficiency"]},
  {"stage": "Entrance & Interview", "duration": "3 months", "description": "Written test, GD, and personal interview", "requirements": ["Application form", "Entrance exam"]},
  {"stage": "BBA Course", "duration": "3 years", "description": "Business administration curriculum", "requirements": ["Regular attendance", "Project submissions"]},
  {"stage": "Internships", "duration": "6-12 months", "description": "Corporate internships and projects", "requirements": ["Complete 4 semesters", "Company placement"]},
  {"stage": "Placement/MBA", "duration": "6 months", "description": "Campus placement or MBA preparation", "requirements": ["Good CGPA", "Soft skills"]}
]',
'["Christ University", "Symbiosis", "NMIMS", "Manipal University", "Amity University"]',
'{"government": "₹50,000-150,000/year", "private": "₹200,000-500,000/year"}'),

('BCA (Computer Applications)', '3-year undergraduate computer science degree', 'post_12th', '3 years', 'degree',
'["Programming", "Web Development", "Database Management", "Software Engineering", "Mobile App Development"]',
'["University entrance tests", "Merit-based", "Mathematics aptitude test"]',
'["Software Developer", "Web Developer", "System Administrator", "Database Administrator", "Software Tester"]',
'["Junior Developer", "Web Designer", "Technical Support", "Database Administrator", "Software Analyst"]',
'[
  {"stage": "Admission", "duration": "2 months", "description": "Apply through university portals", "requirements": ["12th with Math", "Computer knowledge preferred"]},
  {"stage": "Foundation Year", "duration": "1 year", "description": "Programming basics and computer fundamentals", "requirements": ["Regular classes", "Programming assignments"]},
  {"stage": "Specialization", "duration": "2 years", "description": "Advanced programming and projects", "requirements": ["Good grades", "Project work"]},
  {"stage": "Industry Training", "duration": "6 months", "description": "Internships in IT companies", "requirements": ["Technical skills", "Company selection"]},
  {"stage": "Placement/MCA", "duration": "6 months", "description": "Job placement or MCA admission", "requirements": ["BCA degree", "Technical portfolio"]}
]',
'["Christ University", "Bangalore University", "Delhi University", "Amity University", "Lovely Professional University"]',
'{"government": "₹30,000-100,000/year", "private": "₹150,000-400,000/year"}'),

('BSc (Science)', '3-year undergraduate science degree', 'post_12th', '3 years', 'degree',
'["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "Biotechnology", "Environmental Science"]',
'["Merit-based admission", "University entrance tests", "Subject-specific tests"]',
'["Research Scientist", "Lab Technician", "Quality Analyst", "Teacher", "Government Jobs"]',
'["Lab Assistant", "Research Associate", "Quality Control Officer", "Science Teacher", "Environmental Consultant"]',
'[
  {"stage": "Stream Selection", "duration": "1 month", "description": "Choose PCM, PCB, or other combinations", "requirements": ["12th science", "Subject interest"]},
  {"stage": "Admission", "duration": "2 months", "description": "University application and merit selection", "requirements": ["12th science marks", "Entrance if required"]},
  {"stage": "BSc Course", "duration": "3 years", "description": "Theoretical and practical science education", "requirements": ["Regular lab work", "Semester exams"]},
  {"stage": "Research Projects", "duration": "1 year", "description": "Final year research and projects", "requirements": ["Good academic record", "Research aptitude"]},
  {"stage": "Career/MSc", "duration": "Ongoing", "description": "Job placement or higher studies", "requirements": ["BSc degree", "Specialization skills"]}
]',
'["Delhi University", "Mumbai University", "Bangalore University", "Banaras Hindu University", "Jadavpur University"]',
'{"government": "₹15,000-60,000/year", "private": "₹100,000-300,000/year"}'),

('LLB (Law)', '3-year law degree (after graduation)', 'post_12th', '5 years', 'degree',
'["Constitutional Law", "Criminal Law", "Corporate Law", "International Law", "Intellectual Property", "Environmental Law"]',
'["CLAT", "LSAT", "State Law Entrance", "University specific tests"]',
'["Lawyer", "Legal Advisor", "Judge", "Legal Consultant", "Corporate Counsel"]',
'["Junior Associate", "Legal Assistant", "Court Clerk", "Legal Consultant", "Company Secretary"]',
'[
  {"stage": "CLAT Preparation", "duration": "1 year", "description": "Prepare for law entrance examinations", "requirements": ["12th pass", "English proficiency", "General awareness"]},
  {"stage": "Entrance Exam", "duration": "1 day", "description": "Common Law Admission Test", "requirements": ["CLAT registration", "Admit card"]},
  {"stage": "Law College", "duration": "5 years", "description": "Integrated law education", "requirements": ["Regular attendance", "Moot courts", "Internships"]},
  {"stage": "Bar Exam", "duration": "3 months", "description": "All India Bar Examination", "requirements": ["LLB degree", "Bar Council registration"]},
  {"stage": "Legal Practice", "duration": "Ongoing", "description": "Start legal practice or join law firms", "requirements": ["Bar admission", "Professional networking"]}
]',
'["National Law Universities", "Government Law Colleges", "Private Law Schools", "University Law Departments"]',
'{"government": "₹25,000-100,000/year", "private": "₹200,000-800,000/year"}'),

('Hotel Management', '3-4 year hospitality management degree', 'post_12th', '3-4 years', 'degree',
'["Front Office", "Food & Beverage", "Housekeeping", "Kitchen Operations", "Event Management", "Tourism"]',
'["NCHM JEE", "State Hotel Management Entrance", "Management aptitude tests"]',
'["Hotel Manager", "Restaurant Manager", "Event Coordinator", "Tourism Officer", "Entrepreneur"]',
'["Front Desk Executive", "F&B Service Associate", "Chef", "Event Coordinator", "Travel Consultant"]',
'[
  {"stage": "Entrance Preparation", "duration": "6 months", "description": "Prepare for hotel management entrance", "requirements": ["12th pass", "Communication skills"]},
  {"stage": "Entrance & Interview", "duration": "2 months", "description": "Written test and personality assessment", "requirements": ["Application", "Entrance exam"]},
  {"stage": "Course Training", "duration": "3-4 years", "description": "Hospitality education with practical training", "requirements": ["Regular attendance", "Industrial training"]},
  {"stage": "Industry Exposure", "duration": "6-12 months", "description": "Internships in hotels and restaurants", "requirements": ["Course completion", "Industry placement"]},
  {"stage": "Career Placement", "duration": "Ongoing", "description": "Job in hospitality industry", "requirements": ["Degree certificate", "Industry skills"]}
]',
'["IHM (Institute of Hotel Management)", "Private Hotel Management Colleges", "University Departments"]',
'{"government": "₹50,000-150,000/year", "private": "₹200,000-600,000/year"}}');