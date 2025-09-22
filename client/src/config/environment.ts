// Environment configuration for different deployment environments

// Helper to safely access environment variables
const getEnv = (key: string, defaultValue: string = '') => {
  try {
    return (import.meta as any).env?.[key] || defaultValue;
  } catch {
    return defaultValue;
  }
};

const isDev = getEnv('MODE') === 'development' || !getEnv('PROD');

export const config = {
  // API Base URL - use environment variable or fallback to localhost for development
  apiUrl: getEnv('VITE_API_URL') || 'http://localhost:5001',
  
  // Supabase Configuration
  supabase: {
    url: getEnv('VITE_SUPABASE_URL') || 'https://your-project.supabase.co',
    anonKey: getEnv('VITE_SUPABASE_ANON_KEY') || 'your_supabase_anon_key_here',
  },
  
  // App Configuration
  app: {
    name: 'SkillTree Career Advisor',
    version: '1.0.0',
    environment: getEnv('MODE') || 'development',
  },
  
  // Feature Flags
  features: {
    enableMockAuth: getEnv('VITE_ENABLE_MOCK_AUTH') === 'true' || isDev,
    enableAnalytics: getEnv('VITE_ENABLE_ANALYTICS') === 'true',
  }
};

// Validate required environment variables in production
if (getEnv('PROD') === 'true') {
  const requiredEnvVars = [
    'VITE_API_URL',
    'VITE_SUPABASE_URL', 
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  const missing = requiredEnvVars.filter(varName => !getEnv(varName));
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
  }
}

export default config;