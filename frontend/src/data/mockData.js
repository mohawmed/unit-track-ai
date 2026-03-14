// Mock data for UniTrack AI Platform
export const MOCK_USERS = {
  student: {
    id: 'stu-001',
    name: 'Ahmed Mohamed',
    email: 'ahmed@university.edu',
    role: 'student',
    avatar: null,
    teamId: 'team-001',
    score: 88,
    rank: 2,
  },
  professor: {
    id: 'prof-001',
    name: 'Dr. Hassan Ibrahim',
    email: 'hassan@university.edu',
    role: 'professor',
    avatar: null,
    rating: 4.8,
    teams: ['team-001', 'team-002', 'team-003'],
  },
  assistant: {
    id: 'ta-001',
    name: 'Eng. Sara Khaled',
    email: 'sara@university.edu',
    role: 'assistant',
    avatar: null,
    teams: ['team-001', 'team-002'],
  },
  admin: {
    id: 'admin-001',
    name: 'Administration',
    email: 'admin@university.edu',
    role: 'admin',
    avatar: null,
  },
};

export const MOCK_TEAMS = [
  {
    id: 'team-001',
    name: 'Team Alpha',
    projectTitle: 'AI-Powered Library System',
    professorId: 'prof-001',
    professorName: 'Dr. Hassan Ibrahim',
    assistantId: 'ta-001',
    assistantName: 'Eng. Sara Khaled',
    progress: 68,
    color: '#3b82f6',
    emoji: '🚀',
    students: [
      { id: 'stu-001', name: 'Ahmed Mohamed', score: 88, rank: 2, avatar: null, tasksCompleted: 8, tasksTotal: 12 },
      { id: 'stu-002', name: 'Hossam Dagaks', score: 92, rank: 1, avatar: null, tasksCompleted: 10, tasksTotal: 12 },
      { id: 'stu-003', name: 'Sara Khaledf', score: 81, rank: 3, avatar: null, tasksCompleted: 7, tasksTotal: 12 },
      { id: 'stu-004', name: 'Ali Hassan', score: 70, rank: 4, avatar: null, tasksCompleted: 5, tasksTotal: 12 },
    ],
  },
  {
    id: 'team-002',
    name: 'Team Beta',
    projectTitle: 'E-Learning Platform',
    professorId: 'prof-001',
    professorName: 'Dr. Hassan Ibrahim',
    assistantId: 'ta-001',
    assistantName: 'Eng. Sara Khaled',
    progress: 45,
    color: '#8b5cf6',
    emoji: '📚',
    students: [
      { id: 'stu-005', name: 'Omar Said', score: 75, rank: 1, avatar: null, tasksCompleted: 5, tasksTotal: 11 },
      { id: 'stu-006', name: 'Nada Fouad', score: 68, rank: 2, avatar: null, tasksCompleted: 4, tasksTotal: 11 },
    ],
  },
  {
    id: 'team-003',
    name: 'Team Gamma',
    projectTitle: 'Hospital Management System',
    professorId: 'prof-001',
    professorName: 'Dr. Hassan Ibrahim',
    assistantId: 'ta-002',
    assistantName: 'Eng. Karim Mostafa',
    progress: 82,
    color: '#10b981',
    emoji: '🏥',
    students: [
      { id: 'stu-007', name: 'Mona Elsayed', score: 95, rank: 1, avatar: null, tasksCompleted: 9, tasksTotal: 10 },
      { id: 'stu-008', name: 'Youssef Ahmed', score: 88, rank: 2, avatar: null, tasksCompleted: 8, tasksTotal: 10 },
    ],
  },
];

export const MOCK_TASKS = [
  { id: 'task-001', teamId: 'team-001', title: 'Research & Analysis', description: 'Study existing library systems and document findings.', deadline: '2026-03-20', status: 'completed', filesRequired: true, score: 90, feedback: 'Excellent research! Well structured.', color: '#10b981' },
  { id: 'task-002', teamId: 'team-001', title: 'System Design', description: 'Design the database schema and system architecture.', deadline: '2026-03-28', status: 'completed', filesRequired: true, score: 85, feedback: 'Good design. Consider adding caching layer.', color: '#10b981' },
  { id: 'task-003', teamId: 'team-001', title: 'UI/UX Prototype', description: 'Build Figma prototype for all screens.', deadline: '2026-04-05', status: 'in_progress', filesRequired: true, score: null, feedback: null, color: '#f59e0b' },
  { id: 'task-004', teamId: 'team-001', title: 'Backend Development', description: 'Implement the core API endpoints.', deadline: '2026-04-20', status: 'in_progress', filesRequired: true, score: null, feedback: null, color: '#f59e0b' },
  { id: 'task-005', teamId: 'team-001', title: 'Frontend Development', description: 'Build the user interface.', deadline: '2026-05-01', status: 'todo', filesRequired: true, score: null, feedback: null, color: '#94a3b8' },
  { id: 'task-006', teamId: 'team-001', title: 'Integration & Testing', description: 'Integrate all components and run full tests.', deadline: '2026-05-15', status: 'todo', filesRequired: true, score: null, feedback: null, color: '#94a3b8' },
];

export const MOCK_MESSAGES = [
  { id: 1, sender: 'Dr. Hassan Ibrahim', role: 'professor', text: 'Great progress on the research phase! Make sure to cover the AI recommendation engine.', time: '10:30 AM', isOwn: false },
  { id: 2, sender: 'Ahmed Mohamed', role: 'student', text: 'Yes Dr., we\'re planning to use collaborative filtering. Should I share the draft?', time: '10:35 AM', isOwn: true },
  { id: 3, sender: 'Dr. Hassan Ibrahim', role: 'professor', text: 'Please do! Also check with Sara about the UI mockups.', time: '10:37 AM', isOwn: false },
  { id: 4, sender: 'Eng. Sara Khaled', role: 'assistant', text: 'I\'ll review the mockups today and give feedback.', time: '10:45 AM', isOwn: false },
  { id: 5, sender: 'Ahmed Mohamed', role: 'student', text: 'Thank you both! Draft sent to Google Drive.', time: '11:00 AM', isOwn: true },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'feedback', title: 'New Feedback', message: 'Dr. Hassan left feedback on "System Design" task.', time: '5 min ago', read: false },
  { id: 2, type: 'deadline', title: 'Deadline Approaching', message: 'UI/UX Prototype is due in 3 days!', time: '1 hr ago', read: false },
  { id: 3, type: 'task', title: 'New Task Assigned', message: 'Backend Development task has been added.', time: '2 hrs ago', read: true },
  { id: 4, type: 'score', title: 'Score Updated', message: 'You scored 90/100 on Research & Analysis!', time: '1 day ago', read: true },
];

export const MOCK_PROFESSORS = [
  { id: 'prof-001', name: 'Dr. Hassan Ibrahim', email: 'hassan@university.edu', assistantName: 'Eng. Sara Khaled', rating: 4.8, teams: 3, avatar: null, color: '#3b82f6' },
  { id: 'prof-002', name: 'Dr. Ahmed Salam', email: 'asalam@university.edu', assistantName: 'Eng. Omar Farid', rating: 4.5, teams: 4, avatar: null, color: '#8b5cf6' },
  { id: 'prof-003', name: 'Dr. Nadia Mostafa', email: 'nmostafa@university.edu', assistantName: 'Eng. Laila Said', rating: 4.9, teams: 2, avatar: null, color: '#10b981' },
  { id: 'prof-004', name: 'Dr. Walid Kamal', email: 'wkamal@university.edu', assistantName: 'Eng. Kareem Ali', rating: 4.3, teams: 5, avatar: null, color: '#f59e0b' },
];

export const PROGRESS_HISTORY = [
  { week: 'W1', progress: 10, tasks: 1 },
  { week: 'W2', progress: 22, tasks: 2 },
  { week: 'W3', progress: 38, tasks: 3 },
  { week: 'W4', progress: 50, tasks: 4 },
  { week: 'W5', progress: 60, tasks: 5 },
  { week: 'W6', progress: 68, tasks: 5 },
];
