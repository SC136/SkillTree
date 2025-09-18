import { Router } from 'express';
import { skillTreeData } from '../data/skillTreeData';
import { logger } from '../utils/logger';

const router = Router();

// GET /api/skill-tree
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: skillTreeData,
      message: 'Skill tree data retrieved successfully'
    });
  } catch (error) {
    logger.error('Get skill tree error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skill tree data'
    });
  }
});

// GET /api/skill-tree/node/:id
router.get('/node/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const node = skillTreeData.find(node => node.id === id);
    
    if (!node) {
      return res.status(404).json({
        success: false,
        message: 'Node not found'
      });
    }
    
    res.json({
      success: true,
      data: node,
      message: 'Node data retrieved successfully'
    });
  } catch (error) {
    logger.error('Get node error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch node data'
    });
  }
});

// POST /api/skill-tree/validate-unlock
router.post('/validate-unlock', async (req, res) => {
  try {
    const { nodeId, completedNodes } = req.body;
    
    const node = skillTreeData.find(n => n.id === nodeId);
    if (!node) {
      return res.status(404).json({
        success: false,
        message: 'Node not found'
      });
    }
    
    const canUnlock = node.prerequisites.every(prereqId => 
      completedNodes.includes(prereqId)
    );
    
    res.json({
      success: true,
      data: {
        canUnlock,
        missingPrerequisites: node.prerequisites.filter(prereqId => 
          !completedNodes.includes(prereqId)
        )
      }
    });
  } catch (error) {
    logger.error('Validate unlock error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate unlock'
    });
  }
});

export { router as skillTreeRoutes };