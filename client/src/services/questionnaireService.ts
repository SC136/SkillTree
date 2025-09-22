import config from '../config/environment';

export interface PersonalizedSkillTree {
  title: string;
  description: string;
  primaryPath: string;
  nodes: SkillNode[];
  recommendations: string[];
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string[];
  estimatedHours: number;
  priority: 'high' | 'medium' | 'low';
  position: { x: number; y: number };
}

export interface QuestionnaireAnswer {
  questionId: string;
  answer: string | string[] | number;
}

export class QuestionnaireService {
  private baseUrl = config.apiUrl;

  async generateSkillTree(answers: Record<string, string | string[] | number>): Promise<PersonalizedSkillTree> {
    const response = await fetch(`${this.baseUrl}/api/questionnaire/generate-skill-tree`, {
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
    return result.skillTree;
  }

  async saveUserProfile(skillTree: PersonalizedSkillTree, userId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/questionnaire/save-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skillTree, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to save user profile');
    }
  }
}

export const questionnaireService = new QuestionnaireService();