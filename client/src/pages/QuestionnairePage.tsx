import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, Target, Users } from 'lucide-react';

export const QuestionnairePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-primary px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Brain className="w-16 h-16 text-accent-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Career Discovery Questionnaire
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Answer psychology-based questions to discover your ideal career path. 
            Our AI will analyze your responses and recommend personalized routes through the skill tree.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-8 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <Lightbulb className="w-12 h-12 text-accent-primary mx-auto" />
              <h3 className="text-lg font-semibold text-text-primary">Personality Analysis</h3>
              <p className="text-text-secondary text-sm">
                Discover your work style, preferences, and natural inclinations
              </p>
            </div>
            
            <div className="space-y-4">
              <Target className="w-12 h-12 text-accent-secondary mx-auto" />
              <h3 className="text-lg font-semibold text-text-primary">Skill Assessment</h3>
              <p className="text-text-secondary text-sm">
                Evaluate your current abilities and identify areas for growth
              </p>
            </div>
            
            <div className="space-y-4">
              <Users className="w-12 h-12 text-accent-tertiary mx-auto" />
              <h3 className="text-lg font-semibold text-text-primary">Interest Mapping</h3>
              <p className="text-text-secondary text-sm">
                Match your passions with viable career opportunities
              </p>
            </div>
          </div>

          <div className="bg-surface-secondary/50 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-text-primary mb-2">Coming Soon!</h4>
            <p className="text-text-secondary">
              The AI-powered questionnaire system is under development. 
              Soon you'll be able to discover your perfect career path through personalized questions.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
            disabled
          >
            Start Questionnaire (Coming Soon)
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};