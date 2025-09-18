import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Eye, RotateCcw, Zap } from 'lucide-react';
import { useSkillTreeStore } from '../stores/skillTreeStore';

export const TreeControls: React.FC = () => {
  const { filter, setFilter, showOnlyAvailable, setShowOnlyAvailable } = useSkillTreeStore();

  const categories = [
    { value: null, label: 'All Categories', color: 'bg-surface-tertiary' },
    { value: 'foundation', label: 'Foundation', color: 'bg-surface-tertiary' },
    { value: 'science', label: 'Science', color: 'bg-node-science' },
    { value: 'commerce', label: 'Commerce', color: 'bg-node-commerce' },
    { value: 'arts', label: 'Arts', color: 'bg-node-arts' },
    { value: 'interdisciplinary', label: 'Interdisciplinary', color: 'bg-node-interdisciplinary' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect p-4 rounded-lg space-y-4 min-w-64"
    >
      <h3 className="text-lg font-semibold text-text-primary flex items-center">
        <Filter className="w-5 h-5 mr-2" />
        Tree Controls
      </h3>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Category Filter</label>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category.value || 'all'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFilter(category.value)}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg border transition-all ${
                filter === category.value
                  ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                  : 'border-surface-tertiary bg-surface-secondary hover:bg-surface-tertiary text-text-secondary'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium">{category.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Show Only Available Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-secondary">Visibility</label>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
          className={`w-full flex items-center space-x-3 p-2 rounded-lg border transition-all ${
            showOnlyAvailable
              ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
              : 'border-surface-tertiary bg-surface-secondary hover:bg-surface-tertiary text-text-secondary'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">Show Only Available</span>
        </motion.button>
      </div>

      {/* Reset Filters */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setFilter(null);
          setShowOnlyAvailable(false);
        }}
        className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg border border-surface-tertiary bg-surface-secondary hover:bg-surface-tertiary text-text-secondary transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="text-sm font-medium">Reset Filters</span>
      </motion.button>

      {/* Quick Stats */}
      <div className="pt-4 border-t border-surface-tertiary space-y-3">
        <h4 className="text-sm font-medium text-text-secondary">Quick Stats</h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Available Nodes:</span>
            <span className="text-skill-available font-medium">5</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-text-muted">Completed:</span>
            <span className="text-skill-completed font-medium">1</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-text-muted">Locked:</span>
            <span className="text-skill-locked font-medium">14</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-surface-tertiary space-y-3">
        <h4 className="text-sm font-medium text-text-secondary">Node Types</h4>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-skill-locked"></div>
            <span className="text-text-muted">Locked (prerequisites needed)</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-skill-available animate-glow"></div>
            <span className="text-text-muted">Available (can be unlocked)</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-skill-completed"></div>
            <span className="text-text-muted">Completed</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-skill-recommended animate-pulse"></div>
            <span className="text-text-muted">AI Recommended</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};