import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, TreePine } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { QuestionnaireResults } from './QuestionnaireResults';
import { ProgressBar } from './ProgressBar';
import { questionnaireQuestions, QuestionnaireAnswers } from '../../../shared/questionnaireData';
import { PersonalizedSkillTree } from '../services/questionnaireService';
import toast from 'react-hot-toast';

interface QuestionnaireFlowProps {
  onComplete: (skillTree: PersonalizedSkillTree) => void;
  onBack?: () => void;
}

export const QuestionnaireFlow: React.FC<QuestionnaireFlowProps> = ({ onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillTree, setSkillTree] = useState<PersonalizedSkillTree | null>(null);
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questionnaireQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: string, answer: string | string[] | number) => {
    setAnswers((prev: QuestionnaireAnswers) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const canProceed = () => {
    const question = questionnaireQuestions[currentQuestion];
    if (!question.required) return true;
    
    const answer = answers[question.id];
    if (!answer) return false;
    
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    
    return answer !== '' && answer !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/questionnaire/generate-skill-tree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate skill tree');
      }

      const result = await response.json();
      setSkillTree(result.skillTree);
      setShowResults(true);
      toast.success('Your personalized skill tree is ready!');
    } catch (error) {
      console.error('Error generating skill tree:', error);
      toast.error('Failed to generate your skill tree. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResultsComplete = () => {
    if (skillTree) {
      onComplete(skillTree);
    }
  };

  if (showResults && skillTree) {
    return (
      <QuestionnaireResults
        skillTree={skillTree}
        onComplete={handleResultsComplete}
        onRetake={() => {
          setShowResults(false);
          setCurrentQuestion(0);
          setAnswers({});
          setSkillTree(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TreePine className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-white">Career Discovery Questionnaire</h1>
          </div>
          <p className="text-slate-300 text-lg">
            Help us create your personalized skill tree for career success
          </p>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar 
          current={currentQuestion + 1} 
          total={totalQuestions} 
          className="mb-8"
        />

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={questionnaireQuestions[currentQuestion]}
              answer={answers[questionnaireQuestions[currentQuestion].id]}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onBack && currentQuestion === 0 ? onBack : handlePrevious}
            disabled={currentQuestion === 0 && !onBack}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            {currentQuestion === 0 && onBack ? 'Back to Signup' : 'Previous'}
          </button>

          <span className="text-slate-400">
            {currentQuestion + 1} of {totalQuestions}
          </span>

          <button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : currentQuestion === totalQuestions - 1 ? (
              <>
                Generate My Skill Tree
                <CheckCircle className="w-5 h-5" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};