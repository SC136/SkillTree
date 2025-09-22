import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface QuestionnaireAnswer {
  questionId: string;
  answer: string | string[];
}

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

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generatePersonalizedSkillTree(answers: QuestionnaireAnswer[]): Promise<PersonalizedSkillTree> {
    const prompt = this.buildPrompt(answers);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the JSON response from Gemini
      const skillTreeData = JSON.parse(text);
      
      // Add positions to nodes for React Flow visualization
      const nodesWithPositions = this.addPositionsToNodes(skillTreeData.nodes);
      
      return {
        ...skillTreeData,
        nodes: nodesWithPositions
      };
    } catch (error) {
      console.error('Error generating skill tree:', error);
      throw new Error('Failed to generate personalized skill tree');
    }
  }

  private buildPrompt(answers: QuestionnaireAnswer[]): string {
    const answersText = answers
      .map(a => `${a.questionId}: ${Array.isArray(a.answer) ? a.answer.join(', ') : a.answer}`)
      .join('\n');

    return `You are a career advisor AI. Based on the following questionnaire answers, create a personalized skill tree for this user's career development.

User's Questionnaire Answers:
${answersText}

Return ONLY a valid JSON object with this exact structure (no markdown, no additional text):

{
  "title": "Career Path Title",
  "description": "Brief description of the recommended career path",
  "primaryPath": "Main career focus area",
  "nodes": [
    {
      "id": "unique-node-id",
      "title": "Skill/Knowledge Title",
      "description": "Detailed description of what this covers",
      "category": "category-name",
      "level": "beginner|intermediate|advanced|expert",
      "prerequisites": ["prerequisite-node-ids"],
      "estimatedHours": 40,
      "priority": "high|medium|low"
    }
  ],
  "recommendations": [
    "Specific actionable recommendations"
  ]
}

Guidelines:
- Create 12-20 nodes representing skills, knowledge areas, or milestones
- Start with foundational skills (beginner level) and progress to advanced
- Include both technical and soft skills relevant to their interests
- Make prerequisites logical (foundational skills come first)
- Estimate realistic learning hours for each skill
- Categories should include: "foundation", "core-skills", "advanced", "specialization", "soft-skills"
- Provide 3-5 specific, actionable recommendations
- Tailor everything to their specific answers and career goals`;
  }

  private addPositionsToNodes(nodes: Omit<SkillNode, 'position'>[]): SkillNode[] {
    // Create a layered layout based on prerequisites and levels
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const categories = ['foundation', 'core-skills', 'advanced', 'specialization', 'soft-skills'];
    
    return nodes.map((node, index) => {
      const levelIndex = levels.indexOf(node.level);
      const categoryIndex = categories.indexOf(node.category);
      
      // Calculate position based on level (y-axis) and category spread (x-axis)
      const y = levelIndex * 200 + 100;
      const nodesInLevel = nodes.filter(n => n.level === node.level).length;
      const nodeIndexInLevel = nodes.filter(n => n.level === node.level).indexOf(node);
      const x = (nodeIndexInLevel * 300) + (categoryIndex * 50) + 100;
      
      return {
        ...node,
        position: { x, y }
      };
    });
  }
}

export const geminiService = new GeminiService();