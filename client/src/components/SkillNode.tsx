import React from 'react';
import { Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Star, Zap } from 'lucide-react';
import { SkillNode as SkillNodeType } from '@shared/types';

interface SkillNodeProps {
  data: SkillNodeType & {
    status: 'locked' | 'available' | 'completed' | 'recommended';
    onSelect: () => void;
    onComplete: () => void;
  };
}

export const SkillNode: React.FC<SkillNodeProps> = ({ data }) => {
  const getNodeIcon = () => {
    switch (data.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6" />;
      case 'recommended':
        return <Star className="w-6 h-6" />;
      case 'available':
        return <Zap className="w-6 h-6" />;
      default:
        return <Lock className="w-6 h-6" />;
    }
  };

  const getNodeStyles = () => {
    const baseStyles = "w-20 h-20 rounded-full border-3 flex items-center justify-center cursor-pointer transition-all duration-300 relative";
    
    switch (data.status) {
      case 'completed':
        return `${baseStyles} skill-node-completed border-skill-completed bg-skill-completed/20 text-skill-completed`;
      case 'recommended':
        return `${baseStyles} skill-node-recommended border-skill-recommended bg-skill-recommended/20 text-skill-recommended`;
      case 'available':
        return `${baseStyles} skill-node-available border-skill-available bg-skill-available/20 text-skill-available`;
      default:
        return `${baseStyles} skill-node-locked border-skill-locked bg-skill-locked/20 text-skill-locked`;
    }
  };

  const getCategoryColor = () => {
    switch (data.category) {
      case 'science':
        return 'bg-node-science';
      case 'commerce':
        return 'bg-node-commerce';
      case 'arts':
        return 'bg-node-arts';
      case 'interdisciplinary':
        return 'bg-node-interdisciplinary';
      default:
        return 'bg-surface-tertiary';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: Math.random() * 0.5 // Stagger animation
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-surface-tertiary !border-surface-primary"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-surface-tertiary !border-surface-primary"
      />

      {/* Main Node */}
      <div
        onClick={data.onSelect}
        className={getNodeStyles()}
      >
        {/* Background Glow Effect */}
        {(data.status === 'available' || data.status === 'recommended') && (
          <div className="absolute inset-0 rounded-full animate-pulse opacity-50 blur-sm bg-current"></div>
        )}

        {/* Node Content */}
        <div className="relative z-10 flex flex-col items-center">
          {data.icon ? (
            <span className="text-2xl mb-1">{data.icon}</span>
          ) : (
            getNodeIcon()
          )}
        </div>

        {/* Difficulty Indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-primary border border-surface-secondary flex items-center justify-center">
          <span className="text-xs font-bold text-text-primary">{data.difficulty}</span>
        </div>

        {/* Category Indicator */}
        <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 rounded-full ${getCategoryColor()}`}></div>

        {/* XP Reward Badge */}
        {data.status !== 'locked' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-surface-primary px-2 py-1 rounded text-xs text-accent-primary font-medium border border-surface-secondary">
            +{data.xpReward} XP
          </div>
        )}
      </div>

      {/* Node Label */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-surface-primary/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-surface-secondary max-w-32">
          <p className="text-xs font-medium text-text-primary truncate">
            {data.title}
          </p>
          <p className="text-xs text-text-muted">
            {data.estimatedTime}
          </p>
        </div>
      </div>

      {/* Pulse Animation for Recommended Nodes */}
      {data.status === 'recommended' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-skill-recommended"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
};