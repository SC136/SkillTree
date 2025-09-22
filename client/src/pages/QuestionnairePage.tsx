import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionnaireFlow } from '../components/QuestionnaireFlow';
import { PersonalizedSkillTree } from '../services/questionnaireService';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

export const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  const handleQuestionnaireComplete = async (skillTree: PersonalizedSkillTree) => {
    try {
      // Save the skill tree to the user's profile
      if (user) {
        const updatedUser = {
          ...user,
          profile: {
            ...user.profile,
            personalizedSkillTree: skillTree,
            hasCompletedQuestionnaire: true
          }
        };
        setUser(updatedUser);
        
        // TODO: Save to backend/database
        console.log('Skill tree saved for user:', user.id, skillTree);
        
        toast.success('Your personalized skill tree has been created!');
        navigate('/skill-tree');
      }
    } catch (error) {
      console.error('Error saving skill tree:', error);
      toast.error('Failed to save your skill tree. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <QuestionnaireFlow 
      onComplete={handleQuestionnaireComplete}
      onBack={handleBack}
    />
  );
};