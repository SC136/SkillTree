import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, TreePine, Home, UserCircle } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/skill-tree', icon: TreePine, label: 'Skill Tree' },
    { path: '/profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface-primary/90 backdrop-blur-md border-b border-surface-secondary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <TreePine className="w-8 h-8 text-accent-primary" />
            <span className="text-xl font-bold text-gradient">SkillTree</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-primary/20 text-accent-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  {user?.profile.name || 'User'}
                </span>
              </div>
              
              {/* Level Badge */}
              <div className="bg-accent-primary/20 text-accent-primary px-2 py-1 rounded-md text-xs font-medium">
                Level {user?.progress.level || 1}
              </div>
              
              {/* XP Bar */}
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-20 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((user?.progress.totalXP || 0) % 1000) / 10}%` 
                    }}
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                  />
                </div>
                <span className="text-xs text-text-muted">
                  {user?.progress.totalXP || 0} XP
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-surface-secondary hover:bg-surface-tertiary text-text-secondary hover:text-text-primary transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-surface-secondary text-text-secondary"
            >
              <User className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};