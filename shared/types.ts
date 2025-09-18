// Core User Types
export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  progress: UserProgress;
  questionnaire?: QuestionnaireResponse;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  educationLevel: EducationLevel;
  interests: string[];
  skillsCompleted: string[];
  careerGoals: string[];
  location?: string;
  age?: number;
}

export interface UserProgress {
  completedNodes: string[];
  inProgressNodes: string[];
  unlockedPaths: string[];
  aiRecommendedPath: string[];
  totalXP: number;
  level: number;
  achievements: Achievement[];
}

export type EducationLevel = 
  | 'high_school_10' 
  | 'high_school_12' 
  | 'undergraduate' 
  | 'graduate' 
  | 'postgraduate';

// Skill Tree Types
export interface SkillNode {
  id: string;
  title: string;
  description: string;
  type: NodeType;
  category: NodeCategory;
  prerequisites: string[]; // Node IDs
  difficulty: DifficultyLevel;
  estimatedTime: string; // "6 months", "2 years"
  position: Position;
  connections: NodeConnection[];
  requirements: Requirement[];
  isLocked: boolean;
  isCompleted: boolean;
  isRecommended?: boolean;
  xpReward: number;
  icon?: string;
  color?: string;
}

export interface NodeConnection {
  targetNodeId: string;
  connectionType: ConnectionType;
  weight?: number; // For pathfinding
}

export interface Requirement {
  id: string;
  description: string;
  isCompleted: boolean;
  difficulty: DifficultyLevel;
  estimatedTime?: string;
  resources?: Resource[];
}

export interface Resource {
  title: string;
  url: string;
  type: 'course' | 'article' | 'video' | 'book' | 'certification';
}

export interface Position {
  x: number;
  y: number;
}

export type NodeType = 
  | 'skill' 
  | 'course' 
  | 'degree' 
  | 'job' 
  | 'certification' 
  | 'milestone';

export type NodeCategory = 
  | 'science' 
  | 'commerce' 
  | 'arts' 
  | 'interdisciplinary' 
  | 'foundation';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type ConnectionType = 
  | 'prerequisite' 
  | 'suggested' 
  | 'alternative' 
  | 'parallel';

// Questionnaire Types
export interface QuestionnaireResponse {
  id: string;
  userId: string;
  answers: QuestionAnswer[];
  personality: PersonalityProfile;
  recommendedPaths: string[];
  completedAt: string;
}

export interface QuestionAnswer {
  questionId: string;
  answer: string | string[] | number;
  weight: number;
}

export interface PersonalityProfile {
  analytical: number; // 0-100
  creative: number;
  social: number;
  practical: number;
  leadership: number;
  technical: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  category: string;
  weight: number;
  followUp?: string[];
}

export type QuestionType = 
  | 'multiple_choice' 
  | 'scale' 
  | 'multi_select' 
  | 'text' 
  | 'ranking';

// Achievement System
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: string;
  type: AchievementType;
}

export type AchievementType = 
  | 'first_unlock' 
  | 'path_completion' 
  | 'skill_master' 
  | 'explorer' 
  | 'dedicated_learner';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// AI Recommendation Types
export interface AIRecommendation {
  pathId: string;
  nodes: string[];
  reasoning: string;
  confidence: number; // 0-1
  estimatedDuration: string;
  difficulty: DifficultyLevel;
  matchScore: number; // 0-100
}

export interface PathExplanation {
  pathId: string;
  title: string;
  description: string;
  keyBenefits: string[];
  potentialChallenges: string[];
  careerOutcomes: string[];
  nextSteps: string[];
}

// Tree Visualization Types
export interface TreeNode {
  id: string;
  data: SkillNode;
  position: Position;
  type: string;
}

export interface TreeEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  animated?: boolean;
  style?: Record<string, any>;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  educationLevel: EducationLevel;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}