import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Zap, Target, CheckCircle, ExternalLink } from 'lucide-react';
import { SkillNode } from '@shared/types';

interface SkillNodeModalProps {
  node: SkillNode;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SkillNodeModal: React.FC<SkillNodeModalProps> = ({
  node,
  isOpen,
  onClose,
  onComplete,
}) => {
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'text-green-400';
      case 2:
        return 'text-yellow-400';
      case 3:
        return 'text-orange-400';
      case 4:
        return 'text-red-400';
      case 5:
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Easy';
      case 3:
        return 'Moderate';
      case 4:
        return 'Hard';
      case 5:
        return 'Expert';
      default:
        return 'Unknown';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'science':
        return 'bg-node-science/20 text-node-science border-node-science/30';
      case 'commerce':
        return 'bg-node-commerce/20 text-node-commerce border-node-commerce/30';
      case 'arts':
        return 'bg-node-arts/20 text-node-arts border-node-arts/30';
      case 'interdisciplinary':
        return 'bg-node-interdisciplinary/20 text-node-interdisciplinary border-node-interdisciplinary/30';
      default:
        return 'bg-surface-tertiary/20 text-text-secondary border-surface-tertiary/30';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-surface-primary border border-surface-secondary rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-surface-secondary">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{node.icon || '🎯'}</div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-text-primary">{node.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(node.category)}`}>
                      {node.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <p className="text-text-secondary">{node.description}</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            {/* Stats */}
            <div className="p-6 border-b border-surface-secondary">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getDifficultyColor(node.difficulty)}`}>
                    {node.difficulty}/5
                  </div>
                  <div className="text-sm text-text-muted">
                    {getDifficultyLabel(node.difficulty)}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-primary flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-1" />
                    {node.estimatedTime}
                  </div>
                  <div className="text-sm text-text-muted">Duration</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-secondary flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-1" />
                    {node.xpReward}
                  </div>
                  <div className="text-sm text-text-muted">XP Reward</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">{node.type}</div>
                  <div className="text-sm text-text-muted">Type</div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="p-6 border-b border-surface-secondary">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Requirements
              </h3>
              
              {node.requirements.length > 0 ? (
                <div className="space-y-3">
                  {node.requirements.map((requirement) => (
                    <div
                      key={requirement.id}
                      className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg"
                    >
                      <div className="mt-0.5">
                        {requirement.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-skill-completed" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-surface-tertiary rounded"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-medium ${requirement.isCompleted ? 'text-skill-completed' : 'text-text-primary'}`}>
                          {requirement.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`text-sm ${getDifficultyColor(requirement.difficulty)}`}>
                            Difficulty: {getDifficultyLabel(requirement.difficulty)}
                          </span>
                          
                          {requirement.estimatedTime && (
                            <span className="text-sm text-text-muted">
                              Time: {requirement.estimatedTime}
                            </span>
                          )}
                        </div>

                        {/* Resources */}
                        {requirement.resources && requirement.resources.length > 0 && (
                          <div className="mt-3 space-y-1">
                            <p className="text-sm font-medium text-text-secondary">Resources:</p>
                            {requirement.resources.map((resource, index) => (
                              <a
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-accent-primary hover:text-accent-secondary mr-4"
                              >
                                {resource.title}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-muted italic">No specific requirements listed.</p>
              )}
            </div>

            {/* Prerequisites */}
            {node.prerequisites.length > 0 && (
              <div className="p-6 border-b border-surface-secondary">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Prerequisites</h3>
                <div className="space-y-2">
                  {node.prerequisites.map((prereqId) => (
                    <div key={prereqId} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
                      <span className="text-text-secondary">
                        {prereqId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-6 flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="btn-secondary"
              >
                Close
              </motion.button>
              
              {!node.isCompleted && !node.isLocked && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="btn-primary"
                >
                  Mark as Complete
                </motion.button>
              )}
              
              {node.isCompleted && (
                <div className="flex items-center text-skill-completed">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Completed!</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};