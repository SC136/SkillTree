# Byterover Handbook

*Generated: September 16, 2025*

## Layer 1: System Overview

**Purpose**: Interactive RPG-style skill tree web application for career planning and education guidance. Students explore career paths through a gamified interface with prerequisites, unlocks, and AI-powered recommendations.

**Tech Stack**: 
- Frontend: React 18, React Flow, Framer Motion, Tailwind CSS, Zustand, React Query
- Backend: Node.js, Express, Supabase (PostgreSQL + Auth), OpenAI API
- Development: TypeScript, Vite, Jest, Concurrently

**Architecture**: Full-stack web application with React SPA frontend, Express REST API backend, and Supabase as BaaS. React Flow handles node-based skill tree visualization with custom components for game-like interactions.

**Key Technical Decisions**:
- React Flow for node-based UI (specialized for tree/graph interfaces)
- Supabase over Firebase (PostgreSQL features, better TypeScript support)
- Framer Motion for animations (smooth unlock effects, game-like feel)
- Zustand over Redux (lightweight state management for user progress)
- Shared TypeScript types between client/server for consistency

**Entry Points**: 
- Client: `client/src/main.tsx` → App routing with protected routes
- Server: `server/src/index.ts` → Express app with API routes
- Shared: `shared/types.ts` and `shared/data/skillTreeData.ts`

---

## Layer 2: Module Map

**Core Modules**:
- `SkillTreePage`: Main React Flow canvas with nodes, edges, controls, minimap
- `AuthStore`: Zustand store managing user authentication and progress state
- `SkillNode`: Custom React Flow node component with RPG styling and interactions
- `SkillTreeData`: Complete career tree structure with 20+ nodes across science/commerce/arts
- `API Routes`: Express endpoints for auth, user progress, skill tree, AI recommendations

**Data Layer**:
- Supabase: Users, profiles, progress tracking, questionnaire responses
- Local State: Zustand stores for auth, skill tree filters, UI state
- Static Data: Skill tree JSON structure with prerequisites and connections
- Cache: React Query for API responses and user data

**Integration Points**:
- Supabase client for authentication and real-time data sync
- OpenAI API for questionnaire analysis and career path recommendations
- React Flow for interactive node-based visualization
- Framer Motion for unlock animations and smooth transitions

**Utilities**:
- Type definitions shared between frontend/backend
- Helper functions for node unlocking logic and prerequisite checking
- Winston logger for backend request/error tracking
- Tailwind utilities for RPG theme (dark colors, glow effects, game fonts)

**Module Dependencies**:
```
AuthStore → SkillTreePage → SkillNode → SkillNodeModal
       ↓
SkillTreeData → Node unlocking logic → Progress updates
       ↓
API Services → Supabase → Database persistence
```

---

## Layer 3: Integration Guide

**API Endpoints**:
```
POST /api/auth/register - User signup
POST /api/auth/login - User authentication  
GET  /api/user/progress - Fetch user progress
PUT  /api/user/progress - Update completed nodes
POST /api/skill-tree/validate-unlock - Check if node can be unlocked
POST /api/ai/questionnaire - Submit questionnaire for analysis
POST /api/ai/recommend-path - Get AI career recommendations
```

**Configuration Files**:
- `client/vite.config.ts`: Frontend build config with path aliases and proxy
- `server/tsconfig.json`: Backend TypeScript config with shared types
- `client/tailwind.config.js`: RPG theme configuration with custom colors/animations
- `server/.env`: Environment variables for Supabase, OpenAI, JWT secrets

**External Integrations**:
- Supabase: User auth, PostgreSQL database, real-time subscriptions
- OpenAI: GPT-4 for questionnaire analysis and career path recommendations
- React Flow: Node-based visualization library with custom node types
- Framer Motion: Animation library for unlock effects and smooth transitions

**Workflows**:
1. **User Onboarding**: Signup → Profile setup → Questionnaire → AI recommendations → Skill tree with highlighted path
2. **Node Interaction**: Click node → Modal with requirements → Mark complete → Unlock animation → Update progress → Reveal new nodes
3. **Progress Tracking**: Complete prerequisites → Node becomes available → Visual state change → XP gain → Level progression

**Interface Definitions**:
- `SkillNode`: Core data structure with id, title, prerequisites, position, requirements
- `User`: Profile data with education level, interests, progress tracking
- `UserProgress`: Completed nodes, XP, level, achievements, recommended paths
- React Flow node/edge data structures for visualization

---

## Layer 4: Extension Points

**Design Patterns**:
- **Component Composition**: SkillNode + SkillNodeModal for reusable node interactions
- **State Management**: Zustand stores with persistence for user data
- **Custom Hooks**: React hooks for skill tree logic and progress tracking
- **Provider Pattern**: Auth context and React Query for global state
- **Observer Pattern**: Real-time updates via Supabase subscriptions

**Extension Points**:
- **New Node Types**: Add to `shared/types.ts` NodeType enum and create custom components
- **Custom Themes**: Extend Tailwind config with new color schemes and animations  
- **AI Providers**: Abstract AI service interface to support multiple LLM providers
- **Additional Skill Trees**: Create new data files for different education systems
- **Mobile Components**: Responsive variants for touch interactions

**Customization Areas**:
- Skill tree data structure completely configurable in `skillTreeData.ts`
- RPG theme colors, fonts, animations in Tailwind config
- Questionnaire questions and AI prompts in backend services
- Node unlock logic and XP progression formulas
- Database schema can be extended for additional user data

**Plugin Architecture**:
- React Flow supports custom node types and edge components
- Express middleware for additional API functionality
- Supabase functions for complex database operations
- Custom Tailwind plugins for additional utility classes

**Recent Changes**:
- Initial project scaffolding with full-stack TypeScript setup
- React Flow integration with custom node components and RPG styling
- Supabase configuration for authentication and data persistence
- Comprehensive skill tree data structure covering Indian education paths
- Zustand state management for user progress and authentication

---

*Byterover handbook optimized for agent navigation and human developer onboarding*