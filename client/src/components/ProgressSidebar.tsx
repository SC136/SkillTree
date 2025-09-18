import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, TrendingUp, Star, BookOpen } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const ProgressSidebar: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) return null;

  const progress = user.progress;
  const nextLevelXP = (progress.level * 1000) - progress.totalXP;
  const currentLevelProgress = (progress.totalXP % 1000) / 1000 * 100;

  const recentAchievements = progress.achievements.slice(-3);
  const recommendedPath = progress.aiRecommendedPath.slice(0, 3);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-16 bottom-0 w-80 bg-surface-primary/95 backdrop-blur-md border-r border-surface-secondary overflow-y-auto z-40"
    >
      <div className="p-6 space-y-6">
        {/* User Progress Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-text-primary">{user.profile.name}</h2>
          <p className="text-text-secondary">Level {progress.level} Adventurer</p>
        </div>

        {/* XP Progress */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-secondary">Experience</span>
            <span className="text-sm text-text-primary">
              {progress.totalXP % 1000} / 1000 XP
            </span>
          </div>
          
          <div className="w-full h-3 bg-surface-tertiary rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentLevelProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>{nextLevelXP} XP to next level</span>
            <Zap className="w-4 h-4" />
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 text-center">
            <Target className="w-6 h-6 text-skill-completed mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{progress.completedNodes.length}</p>
            <p className="text-xs text-text-muted">Completed</p>
          </div>
          
          <div className="card p-4 text-center">
            <TrendingUp className="w-6 h-6 text-accent-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text-primary">{progress.achievements.length}</p>
            <p className="text-xs text-text-muted">Achievements</p>
          </div>
        </div>

        {/* AI Recommended Path */}
        {recommendedPath.length > 0 && (
          <div className="card p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2 text-skill-recommended" />
              AI Recommended
            </h3>
            
            <div className="space-y-3">
              {recommendedPath.map((nodeId, index) => (
                <div key={nodeId} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-skill-recommended/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-skill-recommended">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {nodeId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className="text-xs text-text-muted">Next recommended step</p>
                  </div>
                </div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 btn-secondary text-sm"
            >
              View Full Path
            </motion.button>
          </div>
        )}

        {/* Recent Achievements */}
        {recentAchievements.length > 0 ? (
          <div className="card p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-skill-available" />
              Recent Achievements
            </h3>
            
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-3">
                  <div className="text-xl">{achievement.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{achievement.title}</p>
                    <p className="text-xs text-text-muted">{achievement.description}</p>
                    <div className="flex items-center mt-1">
                      <Zap className="w-3 h-3 text-accent-primary mr-1" />
                      <span className="text-xs text-accent-primary">+{achievement.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-4 text-center">
            <Trophy className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted text-sm">No achievements yet</p>
            <p className="text-text-muted text-xs">Complete nodes to earn achievements!</p>
          </div>
        )}

        {/* Current Focus */}
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-accent-tertiary" />
            Current Focus
          </h3>
          
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Education Level:</p>
            <p className="text-sm font-medium text-text-primary mb-3">
              {user.profile.educationLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
            
            {user.profile.interests.length > 0 ? (
              <>
                <p className="text-sm text-text-secondary">Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {user.profile.interests.slice(0, 3).map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-xs text-text-muted italic">
                Take the questionnaire to discover your interests!
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-primary text-sm"
          >
            Take Questionnaire
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-secondary text-sm"
          >
            View All Achievements
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};