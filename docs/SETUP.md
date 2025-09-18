# SkillTree Career Advisor - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for database and auth)
- OpenAI API key (for AI recommendations)

### Installation

1. **Install all dependencies**
```bash
# Install root dependencies and all sub-projects
npm run install:all
```

2. **Environment Setup**

**Server Configuration:**
```bash
# Copy environment template
cd server
cp .env.example .env

# Edit .env with your credentials:
# - SUPABASE_URL and keys from your Supabase project
# - OPENAI_API_KEY from OpenAI dashboard
# - JWT_SECRET (generate a secure random string)
```

**Client Configuration:**
The client uses Vite with proxy configuration pointing to `localhost:5000` for API calls.

3. **Database Setup**

Create the following tables in your Supabase database:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  education_level TEXT NOT NULL,
  interests TEXT[] DEFAULT '{}',
  skills_completed TEXT[] DEFAULT '{}',
  career_goals TEXT[] DEFAULT '{}',
  location TEXT,
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  user_id UUID REFERENCES profiles(id) PRIMARY KEY,
  completed_nodes TEXT[] DEFAULT '{}',
  in_progress_nodes TEXT[] DEFAULT '{}',
  unlocked_paths TEXT[] DEFAULT '{}',
  ai_recommended_path TEXT[] DEFAULT '{}',
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  achievements JSONB DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questionnaire responses table
CREATE TABLE questionnaire_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  answers JSONB NOT NULL,
  personality JSONB NOT NULL,
  recommended_paths TEXT[] DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can view own questionnaire" ON questionnaire_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own questionnaire" ON questionnaire_responses FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### Development

```bash
# Start both client and server in development mode
npm run dev

# Or run separately:
npm run dev:client  # Starts on localhost:3000
npm run dev:server  # Starts on localhost:5000
```

### Testing

```bash
# Run client tests
npm run test

# Run server tests  
npm run test:server
```

### Production Build

```bash
# Build client for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Architecture

### Frontend Structure
```
client/src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements (Button, Modal, etc.)
│   ├── SkillNode.tsx    # Individual skill tree node
│   ├── SkillNodeModal.tsx # Node details modal
│   ├── ProgressSidebar.tsx # Progress tracking sidebar
│   └── TreeControls.tsx # Skill tree filter controls
├── pages/               # Main application pages
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── DashboardPage.tsx
│   ├── SkillTreePage.tsx
│   ├── QuestionnairePage.tsx
│   └── ProfilePage.tsx
├── stores/              # Zustand state management
│   ├── authStore.ts     # Authentication state
│   └── skillTreeStore.ts # Skill tree state
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
└── services/            # API service functions
```

### Backend Structure
```
server/src/
├── routes/              # API route handlers
│   ├── auth.ts          # Authentication endpoints
│   ├── user.ts          # User management
│   ├── skillTree.ts     # Skill tree operations
│   └── ai.ts            # AI recommendation endpoints
├── middleware/          # Express middleware
├── services/            # Business logic services
├── utils/               # Utility functions
└── types/               # TypeScript type definitions
```

### Shared Structure
```
shared/
├── types.ts             # Common TypeScript interfaces
└── data/
    └── skillTreeData.ts # Complete skill tree structure
```

## 🎮 Features Overview

### Core Features
- **Interactive Skill Tree**: React Flow-based node visualization with smooth zoom/pan
- **Gamified Progress**: XP system, levels, achievements, unlock animations
- **AI Recommendations**: OpenAI-powered career path suggestions
- **Dynamic Questionnaire**: Psychology-based questions for personalized guidance
- **RPG Theme**: Dark theme with game-like fonts, colors, and animations
- **Mobile Responsive**: Touch-friendly interface for all devices

### Skill Tree Features
- **Node Types**: Skills, courses, degrees, jobs, certifications, milestones
- **Categories**: Science, Commerce, Arts, Interdisciplinary, Foundation
- **Prerequisites**: Logical dependency system for node unlocking
- **Connections**: Visual paths showing career progressions
- **Filtering**: By category, difficulty, status (available/locked/completed)
- **Progress Tracking**: Real-time updates of completion status

### Authentication Features
- **Secure Login/Signup**: Supabase authentication with email verification
- **Session Management**: Persistent login state with automatic token refresh
- **Profile Management**: Education level, interests, career goals
- **Progress Persistence**: All user progress saved to database

## 🎨 Customization

### Theme Customization
Edit `client/tailwind.config.js` to modify:
- Color schemes (RPG dark theme)
- Typography (Orbitron, Cinzel fonts)
- Animations (glow, float, unlock effects)
- Component styles

### Skill Tree Customization
Edit `shared/data/skillTreeData.ts` to:
- Add new career paths and nodes
- Modify prerequisites and connections
- Update XP rewards and difficulty levels
- Change node positions and categories

### AI Customization
Edit server AI service to:
- Modify questionnaire questions
- Adjust personality profiling algorithm
- Customize recommendation logic
- Add new career path suggestions

## 🔧 Troubleshooting

### Common Issues

**"Module not found" errors**: 
- Run `npm run install:all` to ensure all dependencies are installed
- Check that TypeScript path mappings are configured correctly

**Supabase connection issues**:
- Verify environment variables are set correctly
- Check Supabase project URL and API keys
- Ensure database tables are created with proper permissions

**React Flow rendering issues**:
- Check that node data structure matches expected format
- Verify position coordinates are valid numbers
- Ensure custom node types are properly registered

**Build failures**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript compilation: `npm run build`
- Verify all imports are using correct paths

### Development Tips

1. **Hot Reload**: Both client and server support hot reload during development
2. **Debugging**: Use browser dev tools for client, VS Code debugger for server
3. **Database**: Use Supabase dashboard to view and edit data directly
4. **API Testing**: Use tools like Postman or Thunder Client for API endpoint testing

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.