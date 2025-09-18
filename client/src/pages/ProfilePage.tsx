import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Target, Settings } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      fields: [
        { label: 'Name', value: user.profile.name },
        { label: 'Email', value: user.email },
        { label: 'Education Level', value: user.profile.educationLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
      ]
    },
    {
      title: 'Progress Summary',
      icon: Target,
      fields: [
        { label: 'Current Level', value: user.progress.level },
        { label: 'Total XP', value: user.progress.totalXP },
        { label: 'Nodes Completed', value: user.progress.completedNodes.length },
        { label: 'Achievements', value: user.progress.achievements.length },
      ]
    },
    {
      title: 'Interests & Goals',
      icon: GraduationCap,
      fields: [
        { label: 'Interests', value: user.profile.interests.length > 0 ? user.profile.interests.join(', ') : 'Not set' },
        { label: 'Career Goals', value: user.profile.careerGoals.length > 0 ? user.profile.careerGoals.join(', ') : 'Not set' },
        { label: 'Skills Completed', value: user.profile.skillsCompleted.length > 0 ? user.profile.skillsCompleted.join(', ') : 'None yet' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background-primary px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">{user.profile.name}</h1>
              <p className="text-text-secondary">Level {user.progress.level} Adventurer</p>
            </div>
          </div>
          
          {/* XP Progress Bar */}
          <div className="bg-surface-primary p-4 rounded-lg">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Experience Progress</span>
              <span className="text-text-primary">
                {(user.progress.totalXP % 1000)} / 1000 XP
              </span>
            </div>
            <div className="w-full h-2 bg-surface-tertiary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((user.progress.totalXP % 1000) / 1000) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
              />
            </div>
          </div>
        </motion.div>

        {/* Profile Sections */}
        <div className="space-y-6">
          {profileSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Icon className="w-6 h-6 text-accent-primary" />
                  <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field) => (
                    <div key={field.label} className="space-y-1">
                      <label className="text-sm font-medium text-text-muted">
                        {field.label}
                      </label>
                      <p className="text-text-primary">
                        {field.value || 'Not set'}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-6 mt-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-6 h-6 text-accent-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Account Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-surface-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Profile Management</h4>
              <p className="text-text-secondary text-sm mb-4">
                Update your personal information, interests, and career goals.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                disabled
              >
                Edit Profile (Coming Soon)
              </motion.button>
            </div>

            <div className="bg-surface-secondary/50 p-4 rounded-lg">
              <h4 className="font-medium text-text-primary mb-2">Progress Reset</h4>
              <p className="text-text-secondary text-sm mb-4">
                Reset your skill tree progress and start fresh on your career journey.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                disabled
              >
                Reset Progress (Coming Soon)
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Account Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        >
          <div className="card p-6 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Account Created</h3>
            <p className="text-text-secondary">
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Last Updated</h3>
            <p className="text-text-secondary">
              {new Date(user.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};