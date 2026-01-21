'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, ExternalLink, Star, GitFork, Users, Code, Zap, BookOpen } from 'lucide-react';

const About = () => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contributionData, setContributionData] = useState([]);

  const education = [
    {
      degree: 'SMK Letris Indonesia 1',
      school: 'Multimedia',
      year: '2021 - 2023',
    },
    {
      degree: 'Universitas Pembangunan Jaya',
      school: 'Informatika',
      year: '2023 - 2027',
    },
  ];

  // Fetch GitHub data
  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'dhimasn15';
  

      // Get user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();

      // Get repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposData = await reposResponse.json();

      // Calculate stats
      const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);

      // Get popular repositories (sorted by stars)
      const popularRepos = reposData
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3);

      // Fetch real contribution data
      const contributions = await fetchContributionData(username);

      setGithubData({
        user: userData,
        stats: {
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          totalForks,
        },
        popularRepos,
      });

      setContributionData(contributions);
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      
      setGithubData(getMockGitHubData());
      setContributionData(generateContributionData());
    } finally {
      setLoading(false);
    }
  };

  const fetchContributionData = async (username) => {
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    if (!token) {
      console.warn('GitHub token not found. Using mock contribution data.');
      return generateContributionData();
    }

    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('GitHub GraphQL error:', result.errors);
        return generateContributionData();
      }

      // Extract and flatten the contribution data
      const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks;
      const contributions = weeks.flatMap(week => week.contributionDays.map(day => ({
        date: day.date,
        count: day.contributionCount,
      })));

      return contributions;
    } catch (error) {
      console.error('Error fetching contributions:', error);
      return generateContributionData();
    }
  };

  // Generate mock contribution data
  const generateContributionData = () => {
    return Array.from({ length: 100 }).map(() => {
      const rand = Math.random();
      if (rand > 0.8) return 4; // High activity
      if (rand > 0.6) return 3;
      if (rand > 0.4) return 2;
      if (rand > 0.2) return 1;
      return 0; // No activity
    });
  };

  // Mock data for fallback
  const getMockGitHubData = () => ({
    user: {
      login: 'dhimasn15',
      name: 'Dhimas N',
      avatar_url: 'https://github.com/dhimasn15.png',
    },
    stats: {
      publicRepos: 24,
      followers: 12,
      following: 18,
      totalStars: 45,
      totalForks: 15,
    },
    popularRepos: [
      { name: 'portfolio-website', stargazers_count: 8, forks_count: 3, html_url: 'https://github.com/dhimasn15' },
      { name: 'ecommerce-app', stargazers_count: 6, forks_count: 2, html_url: 'https://github.com/dhimasn15' },
      { name: 'weather-dashboard', stargazers_count: 4, forks_count: 1, html_url: 'https://github.com/dhimasn15' },
    ],
  });

  // Get color class based on contribution count
  const getContributionColor = (count) => {
    if (count >= 4) return 'bg-green-600 dark:bg-green-500';
    if (count === 3) return 'bg-green-500 dark:bg-green-600';
    if (count === 2) return 'bg-green-400 dark:bg-green-700';
    if (count === 1) return 'bg-green-300 dark:bg-green-800';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate Informatics student with expertise in modern web development technologies 
            and a strong foundation in multimedia design from vocational school.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Personal Info Card */}
            <div className="github-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Personal Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Student:</strong> Informatics, Universitas Pembangunan Jaya
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Location:</strong> Tangerang Selatan, Banten
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Status:</strong> Active Student & Freelancer
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Focus:</strong> Full Stack Development
                  </span>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="github-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Teaching Experience Card */}
            <div className="github-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Teaching Experience
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      HTML Course
                    </h4>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                     Agustus 2025
                    </span>
                  </div>
                  <p className="text-gray-600 font-extrabold dark:text-white text-xs">
                    B3 (Belajar Bareng BASIC)
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Menjadi pemateri dan pengajar mengenai materi HTML.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      HTML, CSS & JavaScript
                    </h4>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                     November - Desember 2025
                    </span>
                  </div>
                  <p className="text-gray-600 font-extrabold dark:text-white text-xs">
                    FORKABES
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    Menjadi pemateri dalam proker FORKABES dengan materi HTML, CSS, dan JavaScript.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* GitHub Stats Card */}
            <div className="github-card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                GitHub Statistics
              </h3>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData?.stats.publicRepos || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Public Repos</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData?.stats.followers || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Followers</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData?.stats.totalStars || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Total Stars</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {githubData?.stats.totalForks || 0}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">Total Forks</div>
                    </div>
                  </div>

                  {/* Top Repositories */}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Top Repositories
                    </h4>
                    <div className="space-y-3">
                      {githubData?.popularRepos.map((repo, index) => (
                        <a
                          key={index}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {repo.name}
                            </span>
                            <div className="flex gap-3 text-sm">
                              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <Star className="w-3 h-3" />
                                {repo.stargazers_count}
                              </span>
                              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <GitFork className="w-3 h-3" />
                                {repo.forks_count}
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* GitHub Activity Card */}
            <div className="github-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  GitHub Activity
                </h3>
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
              
              <div className="space-y-4">
                {/* Contribution Graph */}
                <div className="flex flex-wrap gap-1">
                  {contributionData.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.002 }}
                      className={`w-3 h-3 rounded ${getContributionColor(day.count)}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded ${getContributionColor(level)}`}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                  
                  <a
                    href={`https://github.com/${githubData?.user?.login || 'dhimasn15'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Profile
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* GitHub Profile Link */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={`https://github.com/${githubData?.user?.login || 'dhimasn15'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Visit GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;