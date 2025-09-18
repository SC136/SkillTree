// Temporary copy of skill tree data for server use
export const skillTreeData = [
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
  // Add more nodes as needed - simplified for now
];