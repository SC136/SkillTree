import { SkillNode } from '../../shared/types';

export const skillTreeData: SkillNode[] = [
  // Foundation Nodes
  {
    id: 'foundation-basics',
    title: 'Basic Education',
    description: 'Complete high school education with strong foundation in core subjects',
    type: 'milestone',
    category: 'foundation',
    prerequisites: [],
    difficulty: 1,
    estimatedTime: '2 years',
    position: { x: 0, y: 0 },
    connections: [
      { targetNodeId: 'science-gateway', connectionType: 'suggested' },
      { targetNodeId: 'commerce-gateway', connectionType: 'suggested' },
      { targetNodeId: 'arts-gateway', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-1',
        description: 'Complete Class 10 with 60%+ marks',
        isCompleted: false,
        difficulty: 2,
        estimatedTime: '1 year'
      },
      {
        id: 'req-2',
        description: 'Complete Class 12 with 70%+ marks',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '1 year'
      }
    ],
    isLocked: false,
    isCompleted: false,
    xpReward: 100,
    icon: '🎓',
    color: '#10b981'
  },

  // Science Branch Gateway
  {
    id: 'science-gateway',
    title: 'Science Stream',
    description: 'Choose science stream focusing on Physics, Chemistry, Mathematics/Biology',
    type: 'course',
    category: 'science',
    prerequisites: ['foundation-basics'],
    difficulty: 2,
    estimatedTime: '2 years',
    position: { x: -300, y: 200 },
    connections: [
      { targetNodeId: 'engineering-path', connectionType: 'suggested' },
      { targetNodeId: 'medical-path', connectionType: 'suggested' },
      { targetNodeId: 'research-path', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-3',
        description: 'Complete PCM/PCB with 75%+ marks',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '2 years',
        resources: [
          { title: 'NCERT Science Books', url: '#', type: 'book' },
          { title: 'Khan Academy Science', url: '#', type: 'course' }
        ]
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 150,
    icon: '🔬',
    color: '#06b6d4'
  },

  // Commerce Branch Gateway
  {
    id: 'commerce-gateway',
    title: 'Commerce Stream',
    description: 'Choose commerce stream focusing on Business, Economics, and Accounting',
    type: 'course',
    category: 'commerce',
    prerequisites: ['foundation-basics'],
    difficulty: 2,
    estimatedTime: '2 years',
    position: { x: 0, y: 200 },
    connections: [
      { targetNodeId: 'business-path', connectionType: 'suggested' },
      { targetNodeId: 'finance-path', connectionType: 'suggested' },
      { targetNodeId: 'economics-path', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-4',
        description: 'Complete Commerce subjects with 70%+ marks',
        isCompleted: false,
        difficulty: 2,
        estimatedTime: '2 years'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 150,
    icon: '💼',
    color: '#f59e0b'
  },

  // Arts Branch Gateway
  {
    id: 'arts-gateway',
    title: 'Arts/Humanities Stream',
    description: 'Choose arts stream focusing on Literature, History, Psychology, and Social Sciences',
    type: 'course',
    category: 'arts',
    prerequisites: ['foundation-basics'],
    difficulty: 2,
    estimatedTime: '2 years',
    position: { x: 300, y: 200 },
    connections: [
      { targetNodeId: 'literature-path', connectionType: 'suggested' },
      { targetNodeId: 'psychology-path', connectionType: 'suggested' },
      { targetNodeId: 'design-path', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-5',
        description: 'Complete Arts subjects with 65%+ marks',
        isCompleted: false,
        difficulty: 2,
        estimatedTime: '2 years'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 150,
    icon: '🎨',
    color: '#ec4899'
  },

  // Engineering Path
  {
    id: 'engineering-path',
    title: 'Engineering Entrance',
    description: 'Prepare for and clear JEE/NEET or state engineering entrance exams',
    type: 'certification',
    category: 'science',
    prerequisites: ['science-gateway'],
    difficulty: 4,
    estimatedTime: '1-2 years',
    position: { x: -500, y: 400 },
    connections: [
      { targetNodeId: 'cs-engineering', connectionType: 'suggested' },
      { targetNodeId: 'mechanical-engineering', connectionType: 'suggested' },
      { targetNodeId: 'electrical-engineering', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-6',
        description: 'Clear JEE Main with good rank',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '1 year'
      },
      {
        id: 'req-7',
        description: 'Optional: Clear JEE Advanced for IIT',
        isCompleted: false,
        difficulty: 5,
        estimatedTime: '1 year'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 300,
    icon: '⚙️',
    color: '#3b82f6'
  },

  // Computer Science Engineering
  {
    id: 'cs-engineering',
    title: 'Computer Science Engineering',
    description: 'Bachelor\'s degree in Computer Science with programming and software development focus',
    type: 'degree',
    category: 'science',
    prerequisites: ['engineering-path'],
    difficulty: 4,
    estimatedTime: '4 years',
    position: { x: -700, y: 600 },
    connections: [
      { targetNodeId: 'software-developer', connectionType: 'suggested' },
      { targetNodeId: 'data-scientist', connectionType: 'suggested' },
      { targetNodeId: 'ai-engineer', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-8',
        description: 'Complete B.Tech CSE with 7+ CGPA',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '4 years'
      },
      {
        id: 'req-9',
        description: 'Build 3+ software projects',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '2 years'
      },
      {
        id: 'req-10',
        description: 'Complete internship at tech company',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '3 months'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 500,
    icon: '💻',
    color: '#06b6d4'
  },

  // Software Developer Job
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Full-time software development role building applications and systems',
    type: 'job',
    category: 'science',
    prerequisites: ['cs-engineering'],
    difficulty: 3,
    estimatedTime: 'Career',
    position: { x: -900, y: 800 },
    connections: [
      { targetNodeId: 'senior-developer', connectionType: 'suggested' },
      { targetNodeId: 'tech-lead', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-11',
        description: 'Master programming languages (Python, JavaScript, Java)',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '1 year'
      },
      {
        id: 'req-12',
        description: 'Learn frameworks and tools',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '6 months'
      },
      {
        id: 'req-13',
        description: 'Clear technical interviews',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '3 months'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 400,
    icon: '🚀',
    color: '#10b981'
  },

  // Medical Path
  {
    id: 'medical-path',
    title: 'Medical Entrance',
    description: 'Prepare for and clear NEET for medical college admission',
    type: 'certification',
    category: 'science',
    prerequisites: ['science-gateway'],
    difficulty: 5,
    estimatedTime: '1-2 years',
    position: { x: -300, y: 400 },
    connections: [
      { targetNodeId: 'mbbs-degree', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-14',
        description: 'Clear NEET with qualifying score',
        isCompleted: false,
        difficulty: 5,
        estimatedTime: '1 year'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 400,
    icon: '🏥',
    color: '#ef4444'
  },

  // Business Path
  {
    id: 'business-path',
    title: 'Business Studies',
    description: 'Bachelor\'s in Business Administration or Commerce',
    type: 'degree',
    category: 'commerce',
    prerequisites: ['commerce-gateway'],
    difficulty: 3,
    estimatedTime: '3 years',
    position: { x: -200, y: 400 },
    connections: [
      { targetNodeId: 'mba-path', connectionType: 'suggested' },
      { targetNodeId: 'marketing-specialist', connectionType: 'suggested' },
      { targetNodeId: 'business-analyst', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-15',
        description: 'Complete BBA/B.Com with 70%+ marks',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '3 years'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 300,
    icon: '📊',
    color: '#f59e0b'
  },

  // Psychology Path
  {
    id: 'psychology-path',
    title: 'Psychology Degree',
    description: 'Bachelor\'s in Psychology understanding human behavior and mental processes',
    type: 'degree',
    category: 'arts',
    prerequisites: ['arts-gateway'],
    difficulty: 3,
    estimatedTime: '3 years',
    position: { x: 500, y: 400 },
    connections: [
      { targetNodeId: 'clinical-psychologist', connectionType: 'suggested' },
      { targetNodeId: 'counselor', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-16',
        description: 'Complete B.A./B.Sc. Psychology with 65%+ marks',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '3 years'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 300,
    icon: '🧠',
    color: '#8b5cf6'
  },

  // Design Path
  {
    id: 'design-path',
    title: 'Design Studies',
    description: 'Creative design education in graphics, UI/UX, or product design',
    type: 'degree',
    category: 'arts',
    prerequisites: ['arts-gateway'],
    difficulty: 3,
    estimatedTime: '3-4 years',
    position: { x: 300, y: 400 },
    connections: [
      { targetNodeId: 'ui-designer', connectionType: 'suggested' },
      { targetNodeId: 'graphic-designer', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-17',
        description: 'Complete design portfolio',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '1 year'
      },
      {
        id: 'req-18',
        description: 'Master design software (Figma, Photoshop, Illustrator)',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '6 months'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 350,
    icon: '🎨',
    color: '#ec4899'
  },

  // Interdisciplinary Nodes
  {
    id: 'ai-engineer',
    title: 'AI/ML Engineer',
    description: 'Specialized role in artificial intelligence and machine learning development',
    type: 'job',
    category: 'interdisciplinary',
    prerequisites: ['cs-engineering', 'data-scientist'],
    difficulty: 5,
    estimatedTime: 'Career',
    position: { x: -500, y: 800 },
    connections: [],
    requirements: [
      {
        id: 'req-19',
        description: 'Master ML frameworks (TensorFlow, PyTorch)',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '1 year'
      },
      {
        id: 'req-20',
        description: 'Complete AI/ML projects',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '8 months'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 600,
    icon: '🤖',
    color: '#8b5cf6'
  },

  // Data Scientist
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to extract insights and drive business decisions',
    type: 'job',
    category: 'interdisciplinary',
    prerequisites: ['cs-engineering'],
    difficulty: 4,
    estimatedTime: 'Career',
    position: { x: -700, y: 1000 },
    connections: [
      { targetNodeId: 'ai-engineer', connectionType: 'suggested' }
    ],
    requirements: [
      {
        id: 'req-21',
        description: 'Master statistics and data analysis',
        isCompleted: false,
        difficulty: 4,
        estimatedTime: '8 months'
      },
      {
        id: 'req-22',
        description: 'Learn data visualization tools',
        isCompleted: false,
        difficulty: 3,
        estimatedTime: '4 months'
      }
    ],
    isLocked: true,
    isCompleted: false,
    xpReward: 500,
    icon: '📈',
    color: '#06b6d4'
  }
];

// Helper function to get nodes by category
export const getNodesByCategory = (category: string): SkillNode[] => {
  return skillTreeData.filter(node => node.category === category);
};

// Helper function to get node by ID
export const getNodeById = (id: string): SkillNode | undefined => {
  return skillTreeData.find(node => node.id === id);
};

// Helper function to get prerequisites for a node
export const getPrerequisites = (nodeId: string): SkillNode[] => {
  const node = getNodeById(nodeId);
  if (!node) return [];
  
  return node.prerequisites.map(prereqId => getNodeById(prereqId)).filter(Boolean) as SkillNode[];
};

// Helper function to check if a node can be unlocked
export const canUnlockNode = (nodeId: string, completedNodes: string[]): boolean => {
  const node = getNodeById(nodeId);
  if (!node) return false;
  
  // Check if all prerequisites are completed
  return node.prerequisites.every(prereqId => completedNodes.includes(prereqId));
};