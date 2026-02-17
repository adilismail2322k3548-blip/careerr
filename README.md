# AI Career Counselor Platform 🎓

A comprehensive web-based AI Career Counselor platform that guides students toward suitable career paths based on their interests, skills, strengths, and academic performance. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase PostgreSQL.

## 🌟 Features

### Student Module
- **Multi-step Assessment Form**: Collect personal information, interests, skills, and strengths
- **AI-Powered Recommendations**: Get top 3 career matches with confidence scores
- **Detailed Results**:
  - Match percentage (0-100%)
  - Confidence score (Low/Medium/High)
  - Skill gap analysis
  - Career roadmap with step-by-step guidance
  - Learning resources and recommendations
- **No Login Required**: Quick and easy assessment process

### Admin Module
- **Career Management**: Full CRUD operations for career options
- **Question Management**: Manage assessment questions for interests, skills, and strengths
- **Student Submissions**: View all student assessments and their results
- **Statistics Dashboard**:
  - Total assessments taken
  - Most selected interests
  - Most recommended careers
  - Average match percentage
  - Education level breakdown

### AI Algorithm
- **Rule-Based Scoring System**:
  - Interest match: +10 points per match
  - Skill match: +8 points per match
  - Strength match: +6 points per match
  - Academic performance bonus: +0 to +15 points
- **Weighted Decision Logic**:
  - Interest weight: 40%
  - Skills weight: 35%
  - Strengths weight: 15%
  - Academic performance weight: 10%

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd careerr
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Setup Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Project Settings > API
   - Copy your project URL and anon/public key

4. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit \`.env.local\` and add your Supabase credentials:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

5. **Setup database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL script from \`supabase-schema.sql\` to create tables
   - Run the SQL script from \`supabase-seed.sql\` to populate initial data

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

\`\`\`
careerr/
├── app/
│   ├── actions/              # Server actions
│   │   ├── ai-logic.ts      # AI scoring algorithm
│   │   ├── assessment.ts    # Assessment operations
│   │   ├── careers.ts       # Career CRUD operations
│   │   └── questions.ts     # Question CRUD operations
│   ├── admin/               # Admin dashboard
│   │   ├── components/      # Admin components
│   │   └── page.tsx
│   ├── assessment/          # Student assessment flow
│   │   ├── components/
│   │   └── page.tsx
│   ├── results/             # Results page
│   │   ├── components/
│   │   └── page.tsx
│   ├── components/          # Shared components
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── lib/
│   ├── supabase.ts         # Supabase client setup
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
├── supabase-schema.sql     # Database schema
├── supabase-seed.sql       # Seed data
└── README.md
\`\`\`

## 💾 Database Schema

### Tables
- **career_options**: Stores all career information
- **assessment_questions**: Stores assessment questions by type
- **student_profiles**: Stores student personal information
- **assessment_responses**: Stores student assessment answers
- **recommendations**: Stores AI-generated career recommendations

## 🎨 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint

## 📊 AI Scoring Algorithm

The platform uses a sophisticated rule-based scoring algorithm:

1. **Match Calculation**: Each career is scored based on matching interests, skills, and strengths
2. **Weighted Scoring**: Different factors have different weights
3. **Education Requirement**: Penalties applied if student doesn't meet minimum education
4. **Confidence Determination**: Based on final match percentage
5. **Skill Gap Identification**: Identifies missing skills for each career
6. **Ranking**: Top 3 careers are selected and ranked

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

## 📝 Usage

### For Students
1. Visit the homepage
2. Click "Start Assessment"
3. Fill in personal information
4. Select your interests, skills, and strengths
5. View your top 3 career recommendations

### For Administrators
1. Navigate to \`/admin\`
2. Manage careers, questions, and view submissions
3. Analyze statistics

## 👨‍💻 Author

Built as a final year undergraduate project demonstrating full-stack development skills.

---

**Note**: Make sure to run both SQL scripts in Supabase before using the application.
