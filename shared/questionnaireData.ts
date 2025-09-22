export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'text' | 'scale';
  category: 'interests' | 'experience' | 'goals' | 'personality' | 'background';
  question: string;
  description?: string;
  options?: string[];
  required: boolean;
}

export const questionnaireQuestions: Question[] = [
  // Background & Education
  {
    id: 'education-level',
    type: 'single',
    category: 'background',
    question: 'What is your current education level?',
    options: [
      'High School Student',
      'High School Graduate',
      'Currently in College',
      'College Graduate',
      'Graduate Degree',
      'Professional Certification'
    ],
    required: true
  },
  {
    id: 'experience-level',
    type: 'single',
    category: 'experience',
    question: 'How would you describe your professional experience?',
    options: [
      'No work experience',
      '0-2 years experience',
      '2-5 years experience',
      '5-10 years experience',
      '10+ years experience',
      'Changing careers'
    ],
    required: true
  },

  // Career Interests
  {
    id: 'career-interests',
    type: 'multiple',
    category: 'interests',
    question: 'Which career areas interest you most? (Select all that apply)',
    options: [
      'Technology & Software Development',
      'Data Science & Analytics',
      'Digital Marketing',
      'Design & Creative',
      'Business & Management',
      'Healthcare',
      'Education & Training',
      'Finance & Accounting',
      'Sales & Customer Service',
      'Engineering',
      'Research & Development',
      'Entrepreneurship'
    ],
    required: true
  },
  {
    id: 'work-environment',
    type: 'single',
    category: 'interests',
    question: 'What type of work environment do you prefer?',
    options: [
      'Remote work',
      'Office-based',
      'Hybrid (remote + office)',
      'Freelance/Contract',
      'Startup environment',
      'Large corporation'
    ],
    required: true
  },

  // Skills & Strengths
  {
    id: 'current-skills',
    type: 'multiple',
    category: 'experience',
    question: 'What skills do you currently have? (Select all that apply)',
    options: [
      'Programming/Coding',
      'Data Analysis',
      'Project Management',
      'Communication',
      'Leadership',
      'Creative Writing',
      'Graphic Design',
      'Social Media',
      'Sales',
      'Research',
      'Problem Solving',
      'Public Speaking'
    ],
    required: false
  },
  {
    id: 'learning-preference',
    type: 'single',
    category: 'personality',
    question: 'How do you prefer to learn new skills?',
    options: [
      'Hands-on projects',
      'Online courses',
      'Reading books/articles',
      'Mentorship',
      'Workshops/seminars',
      'Trial and error'
    ],
    required: true
  },

  // Goals & Motivation
  {
    id: 'career-goals',
    type: 'single',
    category: 'goals',
    question: 'What is your primary career goal?',
    options: [
      'Get my first job',
      'Switch to a new career',
      'Advance in my current field',
      'Develop specific skills',
      'Start my own business',
      'Increase my salary',
      'Find better work-life balance'
    ],
    required: true
  },
  {
    id: 'timeline',
    type: 'single',
    category: 'goals',
    question: 'What is your timeline for achieving your career goals?',
    options: [
      '3-6 months',
      '6-12 months',
      '1-2 years',
      '2-5 years',
      '5+ years'
    ],
    required: true
  },
  {
    id: 'time-commitment',
    type: 'single',
    category: 'goals',
    question: 'How much time can you dedicate to skill development per week?',
    options: [
      '1-3 hours',
      '4-7 hours',
      '8-15 hours',
      '15-25 hours',
      '25+ hours'
    ],
    required: true
  },

  // Personality & Working Style
  {
    id: 'work-style',
    type: 'single',
    category: 'personality',
    question: 'Which describes your preferred working style?',
    options: [
      'I prefer working independently',
      'I work best in small teams',
      'I thrive in large collaborative groups',
      'I like a mix of solo and team work',
      'I prefer leading others',
      'I like being guided by others'
    ],
    required: true
  },
  {
    id: 'challenge-level',
    type: 'scale',
    category: 'personality',
    question: 'How do you feel about taking on challenging tasks?',
    description: '1 = Prefer easy, comfortable tasks | 5 = Love difficult, complex challenges',
    required: true
  },

  // Additional Context
  {
    id: 'specific-interests',
    type: 'text',
    category: 'interests',
    question: 'Are there any specific technologies, tools, or subjects you\'re particularly interested in learning?',
    description: 'Optional: Help us personalize your skill tree even more',
    required: false
  },
  {
    id: 'biggest-challenge',
    type: 'text',
    category: 'goals',
    question: 'What is the biggest challenge you face in your career development?',
    description: 'Optional: This helps us focus on areas where you need the most support',
    required: false
  }
];

export type QuestionnaireAnswers = Record<string, string | string[] | number>;