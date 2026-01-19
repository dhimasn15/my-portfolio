'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Eye, X, Code, Image as ImageIcon, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

const fallbackImages = [
  { src: '/projects/image 16.png', alt: 'suruhleo preview' },
  { src: '/projects/image 17.png', alt: 'Clean landing page preview' },
  { src: '/projects/image 18.png', alt: 'Analytics overview preview' },
  { src: '/projects/image 19.png', alt: 'Tasku preview' },
  { src: '/projects/image 20.png', alt: 'Bantenara preview' },
  { src: '/projects/tasku/tasku1.png', alt: 'Bantenara preview' },
  { src: '/projects/tasku/tasku2.png', alt: 'Bantenara review' },
  { src: '/projects/tasku/tasku3.png', alt: 'Bantenarapreview' },
];

const fallbackProjectsData = [
  {
    id: 'demo-tasku',
    title: 'Tasku',
    description: 'A mobile-first task manager that keeps your schedule tidy with reminders and quick filters.',
    stars: 12,
    forks: 2,
    githubUrl: 'https://github.com/dhimasn15/tasku',
    liveUrl: 'https://github.com/dhimasn15/tasku',
    frameworks: ['React'],
    technologies: ['React', 'Tailwind CSS', 'API'],
    features: [
      'Kelola to-do dan jadwal harian secara mobile-first.',
      'UI bersih dengan fokus pada produktivitas.',
      'Integrasi notifikasi dan pengingat tugas.',
    ],
    language: 'JavaScript',
    updatedAt: new Date('2024-11-02').toLocaleDateString(),
    topics: ['productivity', 'mobile', 'tasks'],
    hasPages: false,
    imageUrl: fallbackImages[3].src,
    imageAlt: fallbackImages[3].alt,
  },
  {
    id: 'demo-pohon',
    title: 'Pohon Untuk Esok',
    description: 'Community-driven tree donation tracker with progress cards and shareable milestones.',
    stars: 10,
    forks: 1,
    githubUrl: 'https://github.com/dhimasn15/pohonuntukesok',
    liveUrl: 'https://github.com/dhimasn15/pohonuntukesok',
    frameworks: ['Next.js'],
    technologies: ['Next.js', 'Tailwind CSS', 'Chart.js'],
    features: [
      'Tracking donasi pohon dengan visual chart.',
      'Halaman kampanye yang mudah dibagikan.',
      'UI ramah komunitas untuk gerakan lingkungan.',
    ],
    language: 'JavaScript',
    updatedAt: new Date('2024-09-01').toLocaleDateString(),
    topics: ['environment', 'community', 'charity'],
    hasPages: true,
    imageUrl: fallbackImages[1].src,
    imageAlt: fallbackImages[1].alt,
  },
  {
    id: 'demo-ibu-hamil',
    title: 'Ibu Hamil App',
    description: 'Health companion for expecting moms with weekly tips, reminders, and appointment notes.',
    stars: 9,
    forks: 1,
    githubUrl: 'https://github.com/dhimasn15/ibu-hamil-app',
    liveUrl: 'https://github.com/dhimasn15/ibu-hamil-app',
    frameworks: ['React'],
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    features: [
      'Tips mingguan untuk ibu hamil.',
      'Pencatatan jadwal kontrol dan catatan penting.',
      'UI sederhana dan nyaman digunakan.',
    ],
    language: 'JavaScript',
    updatedAt: new Date('2024-08-18').toLocaleDateString(),
    topics: ['health', 'mobile', 'assistant'],
    hasPages: false,
    imageUrl: fallbackImages[2].src,
    imageAlt: fallbackImages[2].alt,
  },
  {
    id: 'demo-bantenara',
    title: 'Projek Bantenara',
    description: 'A sleek landing page with product highlights, CTA focus, and responsive hero imagery.',
    stars: 7,
    forks: 0,
    githubUrl: 'https://github.com/dhimasn15/projekbantenara',
    liveUrl: 'https://github.com/dhimasn15/projekbantenara',
    frameworks: ['Next.js'],
    technologies: ['Next.js', 'Tailwind CSS', 'UI'],
    features: [
      'Landing page modern dengan fokus CTA.',
      'Hero section responsif dengan visual yang kuat.',
      'Layout bersih untuk kebutuhan marketing.',
    ],
    language: 'JavaScript',
    updatedAt: new Date('2024-07-10').toLocaleDateString(),
    topics: ['landing-page', 'marketing', 'ui'],
    hasPages: true,
    imageUrl: fallbackImages[4].src,
    imageAlt: fallbackImages[4].alt,
  },
  {
    id: 'demo-suruhleov1',
    title: 'SuruhLeo V1',
    description: 'First iteration of the logistics dashboard focusing on core delivery metrics.',
    stars: 6,
    forks: 1,
    githubUrl: 'https://github.com/dhimasn15/suruhleov1',
    liveUrl: 'https://github.com/dhimasn15/suruhleov1',
    frameworks: ['React'],
    technologies: ['React', 'Tailwind CSS'],
    features: [
      'Dashboard logistik dengan metrik inti pengiriman.',
      'Tampilan data yang mudah dibaca.',
      'Struktur awal untuk pengembangan fitur lanjutan.',
    ],
    language: 'JavaScript',
    updatedAt: new Date('2024-05-22').toLocaleDateString(),
    topics: ['logistics', 'metrics'],
    hasPages: false,
    imageUrl: fallbackImages[0].src,
    imageAlt: fallbackImages[0].alt,
  },
];

const getFallbackProjects = () => fallbackProjectsData;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const getProjectImage = (projectName = '') => {
    const projectImageMap = {
      'suruhleov1': fallbackImages[0],
      'pohonuntukesok': fallbackImages[1],
      'ibu-hamil-app': fallbackImages[2],
      'projekbantenara': fallbackImages[4],
      'tasku': fallbackImages[3],
    };

    const normalizedName = projectName.toLowerCase().replace(/\s+/g, '-');

    const mappedImage = projectImageMap[normalizedName];
    if (mappedImage) return mappedImage;

    const seed = normalizedName
      ? normalizedName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
      : 0;

    return fallbackImages[seed % fallbackImages.length];
  };

  const getFeaturesFromFallbackData = (projectName) => {
    const normalizedName = projectName.toLowerCase().replace(/\s+/g, '-');
    
    const fallbackProject = fallbackProjectsData.find(project => {
      const fallbackName = project.title.toLowerCase().replace(/\s+/g, '-');
      return normalizedName.includes(fallbackName) || fallbackName.includes(normalizedName);
    });
    
    return fallbackProject?.features || [];
  };

  const inferFrameworks = (repo) => {
    const topics = (repo?.topics || []).map(t => String(t).toLowerCase());
    const name = String(repo?.name || '').toLowerCase();
    const description = String(repo?.description || '').toLowerCase();
    const language = String(repo?.language || '').toLowerCase();

    const hasAny = (...keys) =>
      keys.some(k => topics.includes(k) || name.includes(k) || description.includes(k));

    const frameworks = [];
    if (hasAny('laravel', 'php', 'blade')) frameworks.push('Laravel');
    if (hasAny('nextjs', 'next-js', 'next.js')) frameworks.push('Next.js');
    if (hasAny('nuxt', 'nuxtjs', 'nuxt.js')) frameworks.push('Nuxt');
    if (hasAny('react')) frameworks.push('React');
    if (hasAny('vue')) frameworks.push('Vue');
    if (hasAny('svelte', 'sveltekit')) frameworks.push('SvelteKit');
    if (hasAny('express')) frameworks.push('Express');
    if (hasAny('nestjs', 'nest')) frameworks.push('NestJS');
    if (hasAny('django')) frameworks.push('Django');
    if (hasAny('flask')) frameworks.push('Flask');
    if (hasAny('spring', 'spring-boot', 'springboot')) frameworks.push('Spring Boot');

    if (frameworks.length === 0) {
      if (language === 'php') frameworks.push('Laravel');
      else if (language) frameworks.push(language.charAt(0).toUpperCase() + language.slice(1));
      else frameworks.push('Web App');
    }

    return Array.from(new Set(frameworks));
  };

  const getProjectFeatures = (repo) => {
    const fallbackFeatures = getFeaturesFromFallbackData(repo.name);
    if (fallbackFeatures.length > 0) {
      return fallbackFeatures;
    }
    
    const frameworks = inferFrameworks(repo);
    const title = String(repo?.name || '').replace(/-/g, ' ');
    const description = String(repo?.description || '');
    
    const features = [];
    
    if (frameworks.includes('Laravel')) {
      features.push('Dibangun dengan Laravel framework dan praktik PHP modern.');
    }
    if (frameworks.includes('Next.js')) {
      features.push('Aplikasi Next.js yang siap untuk SSR/SSG.');
    }
    if (frameworks.includes('React')) {
      features.push('UI berbasis komponen dengan React.');
    }
    
    features.push(`Proyek open-source: ${title}`);
    if (description) {
      features.push(description);
    }
    
    if (features.length < 3) {
      features.push('Layout responsif dan UI yang bersih.');
      features.push('Kode terstruktur dan mudah dipelihara.');
      features.push('Dokumentasi yang jelas untuk pengembang.');
    }
    
    return features.slice(0, 3);
  };

  const getProjectGallery = (project) => {
    const url = project.githubUrl || '';
    const name = project.title?.toLowerCase() || '';

    // Check by project name as well as URL
    if (name.includes('tasku') || url.includes('/tasku')) {
      return [
        { src: '/projects/tasku/tasku1.png', alt: 'Tasku mobile interface' },
        { src: '/projects/tasku/tasku2.png', alt: 'Tasku dashboard view' },
        { src: '/projects/tasku/tasku3.png', alt: 'Tasku task management' },
        { src: '/projects/tasku/tasku4.png', alt: 'Tasku task management' },
      ];
    }

    if (url.includes('/pohonuntukesok') || name.includes('pohon')) {
      return [
        { src: '/projects/pohonuntukesok/pohon1.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon2.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon3.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon4.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon5.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon6.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon7.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon8.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon9.png', alt: 'Pohon Untuk Esok main page' },
        { src: '/projects/pohonuntukesok/pohon10.png', alt: 'Pohon Untuk Esok main page' },
       
      ];
    }

    if (url.includes('/ibu-hamil-app') || name.includes('ibu hamil')) {
      return [
        { src: '/projects/ibuhamilapp/ibuapp1.png', alt: 'Ibu Hamil App dashboard' },
        { src: '/projects/ibuhamilapp/ibuapp2.png', alt: 'Ibu Hamil App dashboard' },
        { src: '/projects/ibuhamilapp/ibuapp3.png', alt: 'Ibu Hamil App dashboard' },
        { src: '/projects/ibuhamilapp/ibuapp4.png', alt: 'Ibu Hamil App dashboard' },
        { src: '/projects/ibuhamilapp/ibuapp5.png', alt: 'Ibu Hamil App dashboard' },
        { src: '/projects/ibuhamilapp/ibuapp6.png', alt: 'Ibu Hamil App dashboard' },
        { src: '/projects/ibuhamilapp/ibuapp7.png', alt: 'Ibu Hamil App dashboard' },
       
      ];
    }

    if (url.includes('/projekbantenara') || name.includes('bantenara')) {
      return [
        { src: '/projects/bantenara/bantenara1.png', alt: 'Bantenara hero section' },
        { src: '/projects/bantenara/bantenara2.png', alt: 'Bantenara hero section' },
        { src: '/projects/bantenara/bantenara3.png', alt: 'Bantenara hero section' },
        { src: '/projects/bantenara/bantenara4.png', alt: 'Bantenara hero section' },
       
      ];
    }

    if (url.includes('/suruhleov1') || name.includes('suruhleo')) {
      return [
        { src: '/projects//suruhleo/suruh1.png', alt: 'SuruhLeo dashboard overview' },
        { src: '/projects//suruhleo/suruh2.png', alt: 'SuruhLeo dashboard overview' },
        { src: '/projects//suruhleo/suruh3.png', alt: 'SuruhLeo dashboard overview' },
        { src: '/projects//suruhleo/suruh4.png', alt: 'SuruhLeo dashboard overview' },
        
      ];
    }

    // Fallback to single image
    return [
      {
        src: project.imageUrl || '/projects/image 16.png',
        alt: project.imageAlt || 'Project preview',
      },
    ];
  };

  const getActiveImage = (project, index) => {
    const gallery = getProjectGallery(project);
    return gallery[index] || gallery[0];
  };

  const nextImage = () => {
    if (selectedProject) {
      const gallery = getProjectGallery(selectedProject);
      setSelectedImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      const gallery = getProjectGallery(selectedProject);
      setSelectedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const username = 'dhimasn15';

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App',
          },
        }
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      const formattedProjects = repos
        .filter(repo => !repo.fork && !repo.archived && repo.stargazers_count > 0)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo) => {
          const { src: imageUrl, alt: imageAlt } = getProjectImage(repo.name);
          const frameworks = inferFrameworks(repo);
          const features = getProjectFeatures(repo);

          return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || 'No description available.',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || repo.html_url,
            frameworks,
            technologies: repo.language ? [repo.language] : ['Code'],
            features,
            language: repo.language || 'Unknown',
            updatedAt: new Date(repo.updated_at).toLocaleDateString(),
            topics: repo.topics || [],
            hasPages: repo.has_pages,
            imageUrl,
            imageAlt: imageAlt || `${repo.name} project screenshot`,
          };
        });

      setProjects(formattedProjects);

    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      setError(error.message);
      setProjects(getFallbackProjects());
    } finally {
      setLoading(false);
    }
  };

  const renderTechBadge = (tech) => {
    const colorMap = {
      'Next.js': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'React': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'Tailwind CSS': 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      'JavaScript': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      'TypeScript': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'Node.js': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'MongoDB': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'Firebase': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      'React Native': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'Vue.js': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'Express': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      'API': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      'Chart.js': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
      'Material-UI': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'D3.js': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
      'Redux': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      'Code': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      'Laravel': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      'PHP': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      'UI': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
    };

    const colorClass = colorMap[tech] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    
    return (
      <span
        key={tech}
        className={`px-3 py-1 ${colorClass} text-sm rounded-full`}
      >
        {tech}
      </span>
    );
  };

  const handleImageError = (e, fallbackSrc = fallbackImages[1].src) => {
    e.target.onerror = null;
    e.target.src = fallbackSrc;
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills and expertise in web development.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
          >
            <p className="text-yellow-700 dark:text-yellow-400">
              <strong>Note:</strong> Using demo data. {error}
            </p>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading projects from GitHub...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 5).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="github-card overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <motion.img
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={handleImageError}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 text-sm rounded-full backdrop-blur-sm">
                        {project.technologies[0]}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg font-medium flex items-center gap-2 shadow-lg"
                        onClick={() => {
                          setSelectedProject(project);
                          setSelectedImageIndex(0);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Quick View
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {project.language}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <GitFork className="w-4 h-4" />
                        <span className="font-medium">{project.forks}</span>
                      </div>
                      {project.hasPages && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                          Live Demo
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map(renderTechBadge)}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.topics.slice(0, 3).map(topic => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-500">
                        Updated {project.updatedAt}
                      </span>
                      <div className="flex gap-2">
                        {project.hasPages && (
                          <motion.a
                            href={project.liveUrl}
                            whileHover={{ scale: 1.05 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Live Demo
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href="https://github.com/dhimasn15?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Lihat Semua GitHub Saya
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </>
        )}

        {/* Project Modal dengan Multiple Image Preview */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-gray-100/60 dark:ring-gray-800 max-w-5xl w-full max-h-[92vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-0">
                  {/* Main Image Carousel */}
                  <div className="relative h-auto md:h-[420px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                    <div className="relative h-full flex items-center justify-center">
                      <motion.div
                        key={`main-${selectedImageIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={getActiveImage(selectedProject, selectedImageIndex).src}
                          alt={getActiveImage(selectedProject, selectedImageIndex).alt}
                          width={800}
                          height={600}
                          className="max-h-[420px] w-auto max-w-full object-contain"
                          onError={(e) => handleImageError(e)}
                          priority
                        />
                      </motion.div>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                      {selectedImageIndex + 1} / {getProjectGallery(selectedProject).length}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      <span className="px-3 py-1 bg-white/85 dark:bg-gray-900/85 text-gray-800 dark:text-gray-200 rounded-full text-sm shadow-sm">
                        {selectedProject.language}
                      </span>
                      <span className="px-3 py-1 bg-gray-900/80 text-white rounded-full text-sm backdrop-blur-sm border border-white/10">
                        Updated {selectedProject.updatedAt}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      {selectedProject.hasPages && (
                        <span className="px-3 py-1 bg-green-500/90 text-white rounded-full text-sm shadow-sm">
                          Live ready
                        </span>
                      )}
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="p-2 bg-white/90 dark:bg-gray-900/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm"
                        aria-label="Close project details"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pointer-events-none">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {selectedProject.title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base">
                          {selectedProject.topics?.[0]
                            ? `Fokus: ${selectedProject.topics[0]}`
                            : 'Curated from recent work'}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 rounded-full text-sm flex items-center gap-2 shadow-sm">
                          <Sparkles className="w-4 h-4" />
                          Multiple Previews
                        </span>
                        <span className="px-3 py-1 bg-amber-500/90 text-white rounded-full text-sm flex items-center gap-2 shadow-sm">
                          <Star className="w-4 h-4" />
                          {selectedProject.stars} stars
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8 space-y-8">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium">
                          Terakhir diperbarui {selectedProject.updatedAt}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-xs font-medium">
                          {selectedProject.language}
                        </span>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                        {selectedProject.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="github-card p-4 text-center bg-gradient-to-b from-white/40 dark:from-gray-800/50 to-transparent">
                          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                            <Star className="w-4 h-4" />
                            <span>Stars</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                            {selectedProject.stars}
                          </div>
                        </div>
                        <div className="github-card p-4 text-center bg-gradient-to-b from-white/40 dark:from-gray-800/50 to-transparent">
                          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                            <GitFork className="w-4 h-4" />
                            <span>Forks</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                            {selectedProject.forks}
                          </div>
                        </div>
                        <div className="github-card p-4 text-center bg-gradient-to-b from-white/40 dark:from-gray-800/50 to-transparent">
                          <div className="text-gray-600 dark:text-gray-400">
                            Bahasa
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                            {selectedProject.language}
                          </div>
                        </div>
                        <div className="github-card p-4 text-center bg-gradient-to-b from-white/40 dark:from-gray-800/50 to-transparent">
                          <div className="text-gray-600 dark:text-gray-400">
                            Status
                          </div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                            {selectedProject.hasPages ? 'Live' : 'Active'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {(selectedProject.frameworks && selectedProject.frameworks.length > 0
                            ? selectedProject.frameworks
                            : selectedProject.technologies
                          ).map(tech => renderTechBadge(tech))}
                        </div>
                      </div>

                      {/* Image Preview Gallery */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                          Project Gallery ({getProjectGallery(selectedProject).length} images)
                        </h4>
                        <div className="flex gap-3 overflow-x-auto pb-4 px-1">
                          {getProjectGallery(selectedProject).map((img, idx) => (
                            <button
                              key={`thumb-${idx}`}
                              type="button"
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`relative h-20 w-32 flex-shrink-0 rounded-lg overflow-hidden border transition-all duration-200
                                ${idx === selectedImageIndex
                                  ? 'border-blue-500 ring-2 ring-blue-400/60 scale-105'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:scale-102'
                                }`}
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="h-full w-full object-cover"
                                onError={handleImageError}
                              />
                              <div className={`absolute inset-0 transition-opacity duration-200 ${
                                idx === selectedImageIndex 
                                  ? 'bg-blue-500/20' 
                                  : 'bg-black/0 hover:bg-black/10'
                              }`} />
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Klik thumbnail untuk melihat preview yang berbeda
                        </p>
                      </div>

                      {/* Fitur Utama */}
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                          Key Features
                        </h4>
                        {selectedProject.features && selectedProject.features.length > 0 ? (
                          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            {selectedProject.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 mr-3 mt-0.5 flex-shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-600 dark:text-gray-400 italic">
                            Fitur detail akan segera ditambahkan.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <motion.a
                        href={selectedProject.githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100"
                      >
                        <Github className="w-5 h-5" />
                        View on GitHub
                      </motion.a>
                      {selectedProject.hasPages && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;