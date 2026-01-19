export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const projects = [
  {
    id: 1,
    title: 'Projek 1',
    description: 'Desk proj',
    technologies: ['React'],
    githubUrl: 'github.com',
    liveUrl: '#',
    stars: 42,
    forks: 18,
  },
];

export const skills = [
  { name: 'React', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 88, category: 'Language' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 82, category: 'Language' },
  { name: 'Tailwind CSS', level: 96, category: 'Frontend' },
  { name: 'MongoDB', level: 80, category: 'Database' },
  { name: 'PostgreSQL', level: 78, category: 'Database' },
  { name: 'AWS', level: 75, category: 'DevOps' },
  { name: 'Docker', level: 70, category: 'DevOps' },
  { name: 'GraphQL', level: 83, category: 'Backend' },
  { name: 'React Native', level: 79, category: 'Mobile' },
];

export const contributions = [
  { date: '2024-01-01', count: 5 },
  { date: '2024-01-02', count: 12 },
  { date: '2024-01-03', count: 8 },
  // Add more data for heatmap effect
];

export const socialLinks = {
  github: 'https://github.com/dhimasn15',
  linkedin: 'https://www.linkedin.com/in/dhimas-nurhidayat-4964a528a/',
  email: 'mailto:dhimasdn15@gmail.com',
};

export const getGitHubData = async () => {
  try {
    const response = await fetch('/api/github');
    if (!response.ok) {
      throw new Error('gagal fetch GitHub data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
};