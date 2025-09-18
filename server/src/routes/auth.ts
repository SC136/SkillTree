import { Router } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, educationLevel } = req.body;
    
    // TODO: Implement actual Supabase registration
    logger.info('User registration attempt', { email });
    
    res.json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: Date.now().toString(),
          email,
          name,
          educationLevel,
        }
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Implement actual Supabase authentication
    logger.info('User login attempt', { email });
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: '1',
          email,
          name: 'Demo User',
        },
        token: 'mock-jwt-token'
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

export { router as authRoutes };