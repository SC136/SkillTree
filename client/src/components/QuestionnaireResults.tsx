import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Clock, Target, Lightbulb, CheckCircle } from 'lucide-react';
import { PersonalizedSkillTree } from '../services/questionnaireService';

interface QuestionnaireResultsProps {
  skillTree: PersonalizedSkillTree;
  onComplete: () => void;
  onRetake: () => void;
}

export const QuestionnaireResults: React.FC<QuestionnaireResultsProps> = ({
  skillTree,
  onComplete,
  onRetake
}) => {
  const totalHours = skillTree.nodes.reduce((sum, node) => sum + node.estimatedHours, 0);
  const highPriorityNodes = skillTree.nodes.filter(node => node.priority === 'high').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TreePine className="w-10 h-10 text-green-400" />
            <h1 className="text-4xl font-bold text-white">Your Personalized Skill Tree</h1>
          </div>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Based on your responses, we've created a custom learning path tailored to your goals and interests
          </p>
        </motion.div>

        {/* Main Results Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{skillTree.title}</h2>
          <p className="text-slate-300 text-lg mb-6">{skillTree.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{skillTree.nodes.length}</div>
              <div className="text-slate-400">Skills to Master</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalHours}h</div>
              <div className="text-slate-400">Estimated Time</div>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <Lightbulb className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{highPriorityNodes}</div>
              <div className="text-slate-400">Priority Skills</div>
            </div>
          </div>

          {/* Primary Path */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-green-400" />
              Your Primary Path: {skillTree.primaryPath}
            </h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-300">
                This learning path has been specifically designed based on your interests, experience level, and career goals. 
                Each skill builds upon the previous ones to create a comprehensive foundation for your success.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Personalized Recommendations
          </h3>
          <div className="space-y-4">
            {skillTree.recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">{recommendation}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skill Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Skills Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillTree.nodes.slice(0, 6).map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-slate-700/30 rounded-lg p-4 border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{node.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    node.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    node.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {node.priority}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{node.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 capitalize">{node.level}</span>
                  <span className="text-slate-500">{node.estimatedHours}h</span>
                </div>
              </motion.div>
            ))}
          </div>
          {skillTree.nodes.length > 6 && (
            <p className="text-center text-slate-400 mt-4">
              And {skillTree.nodes.length - 6} more skills in your complete tree...
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <TreePine className="w-5 h-5" />
            View My Interactive Skill Tree
          </button>
          <button
            onClick={onRetake}
            className="px-8 py-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            Retake Questionnaire
          </button>
        </motion.div>
      </div>
    </div>
  );
};