import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TreePine, Target, BookOpen, Zap, Trophy, Users } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const progress = user?.progress;

  const stats = [
    {
      label: 'Nodes Completed',
      value: progress?.completedNodes.length || 0,
      icon: Trophy,
      color: 'text-skill-completed',
      bgColor: 'bg-skill-completed/20',
    },
    {
      label: 'Current Level',
      value: progress?.level || 1,
      icon: Zap,
      color: 'text-accent-primary',
      bgColor: 'bg-accent-primary/20',
    },
    {
      label: 'Total XP',
      value: progress?.totalXP || 0,
      icon: Target,
      color: 'text-accent-secondary',
      bgColor: 'bg-accent-secondary/20',
    },
    {
      label: 'Achievements',
      value: progress?.achievements.length || 0,
      icon: Users,
      color: 'text-skill-available',
      bgColor: 'bg-skill-available/20',
    },
  ];

  const quickActions = [
    {
      title: 'Explore Skill Tree',
      description: 'Navigate your career paths and unlock new opportunities',
      icon: TreePine,
      link: '/skill-tree',
      color: 'bg-accent-primary',
    },
    {
      title: 'Take Questionnaire',
      description: 'Get AI-powered career recommendations',
      icon: BookOpen,
      link: '/questionnaire',
      color: 'bg-accent-secondary',
    },
    {
      title: 'View Profile',
      description: 'Manage your preferences and track progress',
      icon: Target,
      link: '/profile',
      color: 'bg-accent-tertiary',
    },
  ];

  return (
    <div className="min-h-screen bg-background-primary px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Welcome back, {user?.profile.name}!
          </h1>
          <p className="text-text-secondary text-lg">
            Continue your career adventure and unlock new paths to success.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Level Progress */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-text-primary">Level Progress</h3>
              <span className="text-sm text-text-muted">
                Level {progress?.level || 1}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Experience Points</span>
                <span className="text-text-primary">
                  {(progress?.totalXP || 0) % 1000} / 1000 XP
                </span>
              </div>
              <div className="w-full h-3 bg-surface-tertiary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((progress?.totalXP || 0) % 1000) / 10}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                />
              </div>
              <p className="text-sm text-text-muted">
                {1000 - ((progress?.totalXP || 0) % 1000)} XP to next level
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Recent Activity</h3>
            
            {progress?.completedNodes.length ? (
              <div className="space-y-3">
                {progress.completedNodes.slice(-3).map((nodeId, index) => (
                  <div key={nodeId} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-skill-completed rounded-full" />
                    <span className="text-text-secondary text-sm">
                      Completed: {nodeId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TreePine className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-muted">No activity yet</p>
                <p className="text-sm text-text-muted">Start exploring the skill tree!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    to={action.link}
                    className="card p-6 block hover:scale-105 transition-transform duration-200 group"
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {action.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {action.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-8 text-center bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10"
        >
          <blockquote className="text-xl font-medium text-text-primary mb-4">
            "The future belongs to those who learn more skills and combine them in creative ways."
          </blockquote>
          <cite className="text-text-muted">— Robert Greene</cite>
        </motion.div>
      </div>
    </div>
  );
};