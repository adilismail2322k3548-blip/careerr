-- AI Career Counselor Platform - Seed Data
-- Run this script after running the schema script

-- Insert Career Options (20 careers across different domains)

-- Technology Careers
INSERT INTO career_options (name, description, required_interests, required_skills, required_strengths, minimum_education, roadmap, learning_resources) VALUES
('Software Engineer', 'Design, develop, and maintain software applications and systems', 
    ARRAY['Technology', 'Problem Solving'], 
    ARRAY['Logical Thinking', 'Problem Solving', 'Technical Skills'], 
    ARRAY['Quick Learner', 'Detail-Oriented', 'Innovative'],
    'Undergraduate',
    '1. Learn programming fundamentals (Python, Java, or JavaScript)
2. Study data structures and algorithms
3. Build personal projects and portfolio
4. Learn version control (Git)
5. Practice coding on platforms like LeetCode
6. Contribute to open-source projects
7. Apply for internships
8. Prepare for technical interviews',
    'Codecademy, freeCodeCamp, CS50 by Harvard, LeetCode, GitHub, Udemy courses on Full Stack Development'),

('Data Scientist', 'Analyze complex data to help organizations make better decisions',
    ARRAY['Technology', 'Science', 'Analytics'],
    ARRAY['Analytical Skills', 'Problem Solving', 'Technical Skills'],
    ARRAY['Detail-Oriented', 'Innovative', 'Independent Worker'],
    'Undergraduate',
    '1. Learn statistics and mathematics
2. Master Python and R programming
3. Study machine learning algorithms
4. Learn data visualization (Tableau, Power BI)
5. Work on real-world datasets (Kaggle)
6. Build a portfolio of data projects
7. Get certified (Google Data Analytics, IBM Data Science)
8. Network and apply for positions',
    'Coursera Data Science Specialization, Kaggle, DataCamp, Python for Data Analysis book, Fast.ai'),

('Web Developer', 'Create and maintain websites and web applications',
    ARRAY['Technology', 'Creativity'],
    ARRAY['Technical Skills', 'Creativity', 'Problem Solving'],
    ARRAY['Quick Learner', 'Detail-Oriented', 'Independent Worker'],
    'Undergraduate',
    '1. Learn HTML, CSS, and JavaScript
2. Master a frontend framework (React, Vue, or Angular)
3. Learn backend development (Node.js, Python, or PHP)
4. Study databases (SQL and NoSQL)
5. Build responsive websites
6. Create a portfolio website
7. Learn deployment (Vercel, Netlify, AWS)
8. Freelance or apply for junior positions',
    'MDN Web Docs, freeCodeCamp, The Odin Project, Frontend Mentor, Udemy Web Development Bootcamp'),

('Cybersecurity Analyst', 'Protect organizations from cyber threats and security breaches',
    ARRAY['Technology', 'Problem Solving'],
    ARRAY['Analytical Skills', 'Technical Skills', 'Problem Solving'],
    ARRAY['Detail-Oriented', 'Patient', 'Independent Worker'],
    'Undergraduate',
    '1. Learn networking fundamentals
2. Study operating systems (Linux, Windows)
3. Understand security concepts and protocols
4. Learn ethical hacking techniques
5. Get certifications (CompTIA Security+, CEH)
6. Practice on platforms like HackTheBox
7. Participate in CTF competitions
8. Apply for security analyst roles',
    'Cybrary, TryHackMe, HackTheBox, CompTIA Security+ certification, SANS Institute'),

('Mobile App Developer', 'Design and develop applications for mobile devices',
    ARRAY['Technology', 'Creativity'],
    ARRAY['Technical Skills', 'Problem Solving', 'Creativity'],
    ARRAY['Innovative', 'Quick Learner', 'Detail-Oriented'],
    'Undergraduate',
    '1. Choose a platform (iOS/Android or cross-platform)
2. Learn Swift/Kotlin or React Native/Flutter
3. Study mobile UI/UX design principles
4. Build sample apps
5. Learn mobile app architecture
6. Publish apps to app stores
7. Create a portfolio
8. Apply for mobile developer positions',
    'Apple Developer Documentation, Android Developer Docs, Udacity, Ray Wenderlich, Flutter Documentation'),

('Cloud Architect', 'Design and manage cloud computing infrastructure and strategies',
    ARRAY['Technology', 'Problem Solving'],
    ARRAY['Technical Skills', 'Analytical Skills', 'Leadership'],
    ARRAY['Innovative', 'Detail-Oriented', 'Independent Worker'],
    'Undergraduate',
    '1. Learn cloud computing fundamentals
2. Master at least one cloud platform (AWS, Azure, GCP)
3. Study networking and security
4. Learn infrastructure as code (Terraform, CloudFormation)
5. Get cloud certifications (AWS Solutions Architect)
6. Build cloud projects
7. Gain experience with DevOps practices
8. Apply for cloud architect roles',
    'AWS Training, Microsoft Learn, Google Cloud Skills Boost, A Cloud Guru, Linux Academy');

-- Healthcare Careers
INSERT INTO career_options (name, description, required_interests, required_skills, required_strengths, minimum_education, roadmap, learning_resources) VALUES
('Doctor', 'Diagnose and treat illnesses, injuries, and medical conditions',
    ARRAY['Healthcare', 'Science', 'Helping Others'],
    ARRAY['Analytical Skills', 'Communication', 'Problem Solving'],
    ARRAY['Patient', 'Detail-Oriented', 'Team Player'],
    'Graduate',
    '1. Complete pre-medical undergraduate degree
2. Take the MCAT exam
3. Attend medical school (4 years)
4. Complete residency program (3-7 years)
5. Obtain medical license
6. Consider fellowship for specialization
7. Maintain continuing medical education
8. Practice medicine',
    'Khan Academy MCAT, Coursera Medical courses, Medical school resources, NEJM, BMJ'),

('Nurse', 'Provide patient care and support in healthcare settings',
    ARRAY['Healthcare', 'Helping Others'],
    ARRAY['Communication', 'Empathy', 'Attention to Detail'],
    ARRAY['Patient', 'Team Player', 'Detail-Oriented'],
    'Undergraduate',
    '1. Complete nursing degree (BSN)
2. Pass NCLEX-RN exam
3. Obtain nursing license
4. Gain clinical experience
5. Consider specialization (ICU, ER, Pediatrics)
6. Pursue advanced certifications
7. Consider advanced degrees (MSN, DNP)
8. Continue professional development',
    'Nursing.org, Khan Academy, Nurse.com, American Nurses Association, RegisteredNursing.org'),

('Pharmacist', 'Dispense medications and provide pharmaceutical care',
    ARRAY['Healthcare', 'Science'],
    ARRAY['Analytical Skills', 'Communication', 'Attention to Detail'],
    ARRAY['Detail-Oriented', 'Patient', 'Independent Worker'],
    'Graduate',
    '1. Complete pre-pharmacy coursework
2. Attend pharmacy school (PharmD program)
3. Complete internships
4. Pass NAPLEX exam
5. Obtain pharmacy license
6. Consider specialization
7. Pursue board certification
8. Practice pharmacy',
    'Pharmacy College Admission Test prep, APhA resources, Pharmacist''s Letter, Medscape'),

('Medical Researcher', 'Conduct research to advance medical knowledge and treatments',
    ARRAY['Healthcare', 'Science', 'Research'],
    ARRAY['Analytical Skills', 'Problem Solving', 'Technical Skills'],
    ARRAY['Detail-Oriented', 'Patient', 'Innovative'],
    'Graduate',
    '1. Complete undergraduate degree in life sciences
2. Gain research experience
3. Pursue graduate degree (MS/PhD)
4. Publish research papers
5. Conduct clinical trials or lab research
6. Collaborate with medical professionals
7. Apply for research grants
8. Continue advancing medical knowledge',
    'PubMed, Nature Medicine, JAMA, NIH resources, Research methodology courses');

-- Business Careers
INSERT INTO career_options (name, description, required_interests, required_skills, required_strengths, minimum_education, roadmap, learning_resources) VALUES
('Business Analyst', 'Analyze business processes and recommend improvements',
    ARRAY['Business', 'Analytics', 'Problem Solving'],
    ARRAY['Analytical Skills', 'Communication', 'Problem Solving'],
    ARRAY['Detail-Oriented', 'Team Player', 'Innovative'],
    'Undergraduate',
    '1. Earn business or related degree
2. Learn business analysis techniques
3. Master data analysis tools (Excel, SQL, Tableau)
4. Understand business process modeling
5. Get certified (CBAP, PMI-PBA)
6. Gain industry experience
7. Develop domain expertise
8. Advance to senior analyst roles',
    'IIBA resources, Coursera Business Analysis, Udemy SQL courses, LinkedIn Learning, Harvard Business Review'),

('Entrepreneur', 'Start and manage your own business ventures',
    ARRAY['Business', 'Innovation', 'Leadership'],
    ARRAY['Leadership', 'Communication', 'Problem Solving'],
    ARRAY['Innovative', 'Independent Worker', 'Risk Taker'],
    'High School',
    '1. Identify a business opportunity
2. Conduct market research
3. Develop a business plan
4. Secure funding (investors, loans, bootstrapping)
5. Build a minimum viable product (MVP)
6. Launch and market your business
7. Scale operations
8. Continuously innovate and adapt',
    'Y Combinator Startup School, Lean Startup book, How to Start a Startup (Sam Altman), Entrepreneur.com'),

('Marketing Manager', 'Plan and execute marketing strategies to promote products/services',
    ARRAY['Business', 'Creativity', 'Communication'],
    ARRAY['Communication', 'Creativity', 'Leadership'],
    ARRAY['Team Player', 'Innovative', 'Quick Learner'],
    'Undergraduate',
    '1. Earn marketing or business degree
2. Learn digital marketing (SEO, SEM, social media)
3. Gain experience in various marketing roles
4. Master marketing analytics tools
5. Build a portfolio of campaigns
6. Get certifications (Google Ads, HubSpot)
7. Develop leadership skills
8. Advance to marketing manager position',
    'Google Digital Garage, HubSpot Academy, Coursera Marketing, Seth Godin''s blog, Marketing Week'),

('Financial Advisor', 'Provide financial planning and investment advice to clients',
    ARRAY['Business', 'Finance', 'Helping Others'],
    ARRAY['Analytical Skills', 'Communication', 'Problem Solving'],
    ARRAY['Detail-Oriented', 'Patient', 'Team Player'],
    'Undergraduate',
    '1. Earn finance or related degree
2. Study for CFP or CFA certification
3. Pass required licensing exams (Series 7, 63)
4. Gain experience at financial firm
5. Build client base
6. Develop specialization (retirement, estates)
7. Maintain continuing education
8. Grow advisory practice',
    'CFP Board, CFA Institute, Investopedia, Wall Street Journal, Financial Planning Association');

-- Creative Careers
INSERT INTO career_options (name, description, required_interests, required_skills, required_strengths, minimum_education, roadmap, learning_resources) VALUES
('Graphic Designer', 'Create visual concepts to communicate ideas and messages',
    ARRAY['Arts', 'Creativity', 'Technology'],
    ARRAY['Creativity', 'Technical Skills', 'Communication'],
    ARRAY['Innovative', 'Detail-Oriented', 'Independent Worker'],
    'Undergraduate',
    '1. Learn design principles and color theory
2. Master design software (Adobe Creative Suite, Figma)
3. Study typography and layout
4. Build a strong portfolio
5. Gain experience through internships or freelancing
6. Specialize in an area (branding, UI/UX, print)
7. Network with other designers
8. Apply for design positions or start freelancing',
    'Adobe tutorials, Dribbble, Behance, Skillshare design courses, Coursera Graphic Design'),

('Content Writer', 'Create written content for various media and platforms',
    ARRAY['Writing', 'Creativity', 'Communication'],
    ARRAY['Communication', 'Creativity', 'Writing'],
    ARRAY['Independent Worker', 'Quick Learner', 'Detail-Oriented'],
    'Undergraduate',
    '1. Develop strong writing skills
2. Learn SEO and content marketing
3. Study different writing styles and formats
4. Build a writing portfolio
5. Start a blog or contribute to publications
6. Learn content management systems
7. Freelance or apply for writing positions
8. Specialize in a niche (technical, creative, copywriting)',
    'Grammarly blog, Copyblogger, HubSpot Writing resources, Medium, Coursera Content Writing'),

('Architect', 'Design buildings and oversee construction projects',
    ARRAY['Arts', 'Engineering', 'Creativity'],
    ARRAY['Creativity', 'Technical Skills', 'Problem Solving'],
    ARRAY['Detail-Oriented', 'Innovative', 'Patient'],
    'Graduate',
    '1. Complete architecture undergraduate degree (B.Arch)
2. Gain practical experience through internships
3. Complete architecture licensure exams
4. Pursue graduate degree (M.Arch) if needed
5. Work under licensed architect
6. Obtain professional license
7. Build portfolio of projects
8. Specialize or start own practice',
    'ArchDaily, Dezeen, Architecture registration board resources, AutoCAD tutorials, SketchUp');

-- Education & Other Careers
INSERT INTO career_options (name, description, required_interests, required_skills, required_strengths, minimum_education, roadmap, learning_resources) VALUES
('Teacher', 'Educate and mentor students in academic subjects',
    ARRAY['Education', 'Helping Others', 'Communication'],
    ARRAY['Communication', 'Empathy', 'Leadership'],
    ARRAY['Patient', 'Team Player', 'Innovative'],
    'Undergraduate',
    '1. Complete education degree or subject-specific degree
2. Complete teacher training program
3. Student teaching experience
4. Pass teaching certification exams
5. Obtain teaching license
6. Apply for teaching positions
7. Continue professional development
8. Consider advanced degrees or specialization',
    'Teach For America, Khan Academy teaching resources, Edutopia, Teachers Pay Teachers, Coursera teaching courses'),

('Data Analyst', 'Collect, process, and analyze data to derive insights',
    ARRAY['Technology', 'Analytics', 'Problem Solving'],
    ARRAY['Analytical Skills', 'Technical Skills', 'Problem Solving'],
    ARRAY['Detail-Oriented', 'Quick Learner', 'Independent Worker'],
    'Undergraduate',
    '1. Learn statistics and mathematics
2. Master Excel and SQL
3. Learn data visualization tools (Tableau, Power BI)
4. Study Python or R for data analysis
5. Work on data analysis projects
6. Build a portfolio
7. Get certifications (Google Data Analytics)
8. Apply for analyst positions',
    'Coursera Data Analytics, Khan Academy Statistics, Mode Analytics tutorials, DataCamp, Excel training'),

('UX/UI Designer', 'Design user interfaces and improve user experiences for digital products',
    ARRAY['Technology', 'Creativity', 'Arts'],
    ARRAY['Creativity', 'Technical Skills', 'Communication'],
    ARRAY['Innovative', 'Detail-Oriented', 'Team Player'],
    'Undergraduate',
    '1. Learn design principles and user psychology
2. Master design tools (Figma, Sketch, Adobe XD)
3. Study interaction design and prototyping
4. Learn user research methods
5. Build a strong UX portfolio
6. Complete UX design courses or bootcamp
7. Gain experience through projects or internships
8. Apply for UX/UI designer positions',
    'Nielsen Norman Group, Interaction Design Foundation, Figma tutorials, Google UX Design Certificate, Coursera UX courses');

-- Insert Assessment Questions

-- Interests Questions
INSERT INTO assessment_questions (question_text, question_type, options, order_index) VALUES
('What are your primary interests? (Select all that apply)', 'interests', 
    ARRAY['Technology', 'Healthcare', 'Business', 'Arts', 'Science', 'Education', 'Engineering', 'Finance', 'Writing', 'Helping Others', 'Analytics', 'Problem Solving', 'Creativity', 'Leadership', 'Innovation', 'Communication', 'Research'], 
    1);

-- Skills Questions
INSERT INTO assessment_questions (question_text, question_type, options, order_index) VALUES
('What skills do you possess or excel at? (Select all that apply)', 'skills',
    ARRAY['Logical Thinking', 'Communication', 'Creativity', 'Problem Solving', 'Leadership', 'Analytical Skills', 'Technical Skills', 'Empathy', 'Writing', 'Attention to Detail', 'Project Management', 'Critical Thinking', 'Data Analysis', 'Public Speaking', 'Teamwork'],
    2);

-- Strengths Questions
INSERT INTO assessment_questions (question_text, question_type, options, order_index) VALUES
('What are your personal strengths? (Select all that apply)', 'strengths',
    ARRAY['Quick Learner', 'Team Player', 'Independent Worker', 'Detail-Oriented', 'Innovative', 'Patient', 'Risk Taker', 'Adaptable', 'Persistent', 'Organized', 'Confident', 'Empathetic', 'Decisive'],
    3);

-- Verification query
SELECT 'Career Options Count: ' || COUNT(*)::TEXT FROM career_options;
SELECT 'Assessment Questions Count: ' || COUNT(*)::TEXT FROM assessment_questions;
