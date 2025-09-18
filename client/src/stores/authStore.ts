import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserProgress } from '@shared/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => 
        set({ user, isAuthenticated: !!user }),

      setLoading: (isLoading) => 
        set({ isLoading }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // TODO: Implement actual authentication with Supabase
          console.log('Login attempt:', { email, password });
          
          // Mock user for development
          const mockUser: User = {
            id: '1',
            email,
            profile: {
              name: 'Demo User',
              educationLevel: 'high_school_12',
              interests: [],
              skillsCompleted: [],
              careerGoals: [],
            },
            progress: {
              completedNodes: ['foundation-basics'],
              inProgressNodes: [],
              unlockedPaths: [],
              aiRecommendedPath: [],
              totalXP: 100,
              level: 1,
              achievements: [],
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true });
        try {
          // TODO: Implement actual signup with Supabase
          console.log('Signup attempt:', userData);
          
          // Mock successful signup
          const mockUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            profile: {
              name: userData.name,
              educationLevel: userData.educationLevel,
              interests: [],
              skillsCompleted: [],
              careerGoals: [],
            },
            progress: {
              completedNodes: [],
              inProgressNodes: [],
              unlockedPaths: [],
              aiRecommendedPath: [],
              totalXP: 0,
              level: 1,
              achievements: [],
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error('Signup error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUserProgress: (progressUpdate) => {
        const { user } = get();
        if (user) {
          const updatedUser = {
            ...user,
            progress: {
              ...user.progress,
              ...progressUpdate,
            },
            updatedAt: new Date().toISOString(),
          };
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);