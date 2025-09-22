import { Router } from 'express';
import { geminiService, QuestionnaireAnswer } from '../services/geminiService';

const router = Router();

// Generate personalized skill tree based on questionnaire answers
router.post('/generate-skill-tree', async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        error: 'Invalid request body. Expected answers object.'
      });
    }

    // Convert answers object to array format expected by GeminiService
    const answersArray: QuestionnaireAnswer[] = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer: answer as string | string[]
    }));

    // Generate personalized skill tree using Gemini AI
    const skillTree = await geminiService.generatePersonalizedSkillTree(answersArray);

    res.json({
      success: true,
      skillTree
    });

  } catch (error) {
    console.error('Error generating skill tree:', error);
    res.status(500).json({
      error: 'Failed to generate personalized skill tree',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Save user profile with personalized skill tree
router.post('/save-profile', async (req, res) => {
  try {
    const { skillTree, userId } = req.body;

    if (!skillTree || !userId) {
      return res.status(400).json({
        error: 'Missing required fields: skillTree and userId'
      });
    }

    // TODO: Implement saving to Supabase database
    // For now, just log and return success
    console.log('Saving skill tree for user:', userId, skillTree.title);

    res.json({
      success: true,
      message: 'Profile saved successfully'
    });

  } catch (error) {
    console.error('Error saving user profile:', error);
    res.status(500).json({
      error: 'Failed to save user profile',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get user's saved skill tree
router.get('/skill-tree/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    // TODO: Implement retrieval from Supabase database
    // For now, return a placeholder response
    res.json({
      success: true,
      skillTree: null,
      message: 'No skill tree found for this user'
    });

  } catch (error) {
    console.error('Error retrieving skill tree:', error);
    res.status(500).json({
      error: 'Failed to retrieve skill tree',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;