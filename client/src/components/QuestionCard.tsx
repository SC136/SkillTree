import React from 'react';
import { motion } from 'framer-motion';
import { Question, QuestionnaireAnswers } from '../../../shared/questionnaireData';

interface QuestionCardProps {
  question: Question;
  answer: string | string[] | number | undefined;
  onAnswer: (questionId: string, answer: string | string[] | number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, onAnswer }) => {
  const renderInput = () => {
    switch (question.type) {
      case 'single':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.label
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 rounded-lg border border-slate-600 hover:border-purple-500 cursor-pointer transition-colors group"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswer(question.id, e.target.value)}
                  className="w-4 h-4 text-purple-600 border-slate-400 focus:ring-purple-500"
                />
                <span className="text-slate-200 group-hover:text-white transition-colors">
                  {option}
                </span>
              </motion.label>
            ))}
          </div>
        );

      case 'multiple':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.label
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 rounded-lg border border-slate-600 hover:border-purple-500 cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(answer) && answer.includes(option)}
                  onChange={(e) => {
                    const currentAnswers = Array.isArray(answer) ? answer : [];
                    if (e.target.checked) {
                      onAnswer(question.id, [...currentAnswers, option]);
                    } else {
                      onAnswer(question.id, currentAnswers.filter(a => a !== option));
                    }
                  }}
                  className="w-4 h-4 text-purple-600 border-slate-400 focus:ring-purple-500 rounded"
                />
                <span className="text-slate-200 group-hover:text-white transition-colors">
                  {option}
                </span>
              </motion.label>
            ))}
          </div>
        );

      case 'text':
        return (
          <textarea
            value={typeof answer === 'string' ? answer : ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none h-32"
          />
        );

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-400">
              <span>1 - Strongly Disagree</span>
              <span>5 - Strongly Agree</span>
            </div>
            <div className="flex justify-center space-x-8">
              {[1, 2, 3, 4, 5].map((value) => (
                <motion.label
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: value * 0.1 }}
                  className="flex flex-col items-center space-y-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={value}
                    checked={answer === value}
                    onChange={(e) => onAnswer(question.id, parseInt(e.target.value))}
                    className="w-6 h-6 text-purple-600 border-slate-400 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 text-lg font-medium">{value}</span>
                </motion.label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-slate-400">
            {question.description}
          </p>
        )}
        {question.required && (
          <span className="inline-block mt-2 text-red-400 text-sm">
            * Required
          </span>
        )}
      </div>

      {renderInput()}
    </motion.div>
  );
};