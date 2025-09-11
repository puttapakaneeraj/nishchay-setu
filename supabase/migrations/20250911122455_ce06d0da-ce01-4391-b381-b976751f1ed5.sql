-- Insert sample course data
INSERT INTO public.courses (name, description, level, duration, course_type, specializations, entrance_exams, career_paths, job_opportunities, roadmap_stages, colleges_offering, fees_range) VALUES
('ITI (Industrial Training Institute)', 'Technical vocational training courses', 'post_10th', '6 months - 2 years', 'diploma', 
'["Electrician", "Fitter", "Welder", "Computer Operator", "Motor Mechanic"]',
'["No entrance exam required", "Merit-based admission"]',
'["Skilled Technician", "Supervisor", "Self Employment"]',
'["Junior Technician", "Skilled Worker", "Technical Assistant"]',
'[
  {"stage": "Admission", "duration": "1 month", "description": "Apply through state ITI portal", "requirements": ["10th certificate", "Age 14-40"]},
  {"stage": "Training", "duration": "6-24 months", "description": "Practical and theoretical training", "requirements": ["Regular attendance", "Internal assessments"]},
  {"stage": "Certification", "duration": "1 month", "description": "NCVT/SCVT certification exam", "requirements": ["Complete training", "Pass final exam"]}
]',
'["Government ITIs", "Private ITIs", "Industrial Training Centers"]',
'{"government": "₹5,000-15,000", "private": "₹20,000-50,000"}'),

('Polytechnic Diploma', '3-year technical diploma courses', 'post_10th', '3 years', 'diploma',
'["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Computer Science"]',
'["State Polytechnic Entrance Test", "JEE Main", "Merit-based"]',
'["Engineering Technician", "Junior Engineer", "Technical Assistant"]',
'["Junior Engineer", "Technical Officer", "Assistant Engineer"]',
'[
  {"stage": "Entrance Exam", "duration": "2 months", "description": "Prepare for state polytechnic entrance", "requirements": ["10th pass", "Physics, Chemistry, Math"]},
  {"stage": "Admission", "duration": "1 month", "description": "Counseling and seat allocation", "requirements": ["Valid entrance score"]},
  {"stage": "Diploma Course", "duration": "3 years", "description": "6 semesters of technical education", "requirements": ["Regular attendance"]}
]',
'["Government Polytechnics", "Private Polytechnics"]',
'{"government": "₹10,000-30,000/year", "private": "₹50,000-150,000/year"}'),

('B.Tech/B.E. (Engineering)', '4-year undergraduate engineering degree', 'post_12th', '4 years', 'degree',
'["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"]',
'["JEE Main", "JEE Advanced", "State Engineering Entrance"]',
'["Software Engineer", "Mechanical Engineer", "Civil Engineer"]',
'["Software Developer", "Design Engineer", "Project Manager"]',
'[
  {"stage": "JEE Preparation", "duration": "1-2 years", "description": "Prepare for JEE Main/Advanced", "requirements": ["12th with PCM"]},
  {"stage": "B.Tech Course", "duration": "4 years", "description": "8 semesters of engineering education", "requirements": ["Regular attendance"]},
  {"stage": "Placement", "duration": "6 months", "description": "Campus placement or higher studies", "requirements": ["Good CGPA"]}
]',
'["IITs", "NITs", "State Engineering Colleges"]',
'{"government": "₹50,000-200,000/year", "private": "₹200,000-800,000/year"}'),

('MBBS (Medical)', '5.5-year undergraduate medical degree', 'post_12th', '5.5 years', 'degree',
'["General Medicine", "Surgery", "Pediatrics", "Gynecology"]',
'["NEET-UG", "State Medical Entrance"]',
'["Doctor", "Medical Officer", "Specialist"]',
'["General Practitioner", "Medical Officer", "Hospital Doctor"]',
'[
  {"stage": "NEET Preparation", "duration": "1-2 years", "description": "Prepare for NEET examination", "requirements": ["12th with PCB"]},
  {"stage": "MBBS Course", "duration": "4.5 years", "description": "Medical education with clinical training", "requirements": ["Regular attendance"]},
  {"stage": "Internship", "duration": "1 year", "description": "Compulsory medical internship", "requirements": ["Complete MBBS"]}
]',
'["AIIMS", "Government Medical Colleges", "Private Medical Colleges"]',
'{"government": "₹50,000-500,000/year", "private": "₹500,000-2,500,000/year"}');