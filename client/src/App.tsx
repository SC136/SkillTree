import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from './stores/authStore';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { SkillTreePage } from './pages/SkillTreePage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { ProfilePage } from './pages/ProfilePage';
import { Navbar } from './components/Navbar';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

function App() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {user && <Navbar />}
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={user ? 'pt-16' : ''}
      >
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <SignupPage /> : <Navigate to="/dashboard" replace />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={user ? <DashboardPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/skill-tree" 
            element={user ? <SkillTreePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/questionnaire" 
            element={user ? <QuestionnairePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/login" replace />} 
          />
          
          {/* Default Route */}
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
          />
          
          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
                  <p className="text-text-secondary mb-8">Page not found</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.history.back()}
                    className="btn-primary"
                  >
                    Go Back
                  </motion.button>
                </div>
              </div>
            } 
          />
        </Routes>
      </motion.main>
    </div>
  );
}

export default App;