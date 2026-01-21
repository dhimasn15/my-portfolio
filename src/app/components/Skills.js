'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Palette, Smartphone, Terminal } from 'lucide-react';

const Skills = () => {
  
  const [skills] = useState([
    // Frontend Skills
    { name: 'HTML/CSS', level: 85, category: 'Frontend' },
    { name: 'JavaScript', level: 78, category: 'Frontend' },
    { name: 'React', level: 70, category: 'Frontend' },
    { name: 'Next.js', level: 75, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 70, category: 'Frontend' },
    { name: 'Bootstrap', level: 75, category: 'Frontend' },
    
    // Backend Skills
    { name: 'Laravel', level: 80, category: 'Backend' },
    { name: 'Node.js', level: 75,    category: 'Backend' },
    { name: 'REST APIs', level: 70, category: 'Backend' },
    
    // Database Skills
    { name: 'MySQL', level: 80, category: 'Database' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    
    // Tools & Others
    { name: 'Git/GitHub', level: 75, category: 'Tools' },
    { name: 'VS Code', level: 85, category: 'Tools' },
    { name: 'Figma', level: 70, category: 'Tools' },
  ]);

  const categories = [
    { 
      icon: <Code className="w-5 h-5" />, 
      name: 'Frontend', 
      color: 'text-blue-500',
      description: 'Client-side development'
    },
    { 
      icon: <Server className="w-5 h-5" />, 
      name: 'Backend', 
      color: 'text-green-500',
      description: 'Server-side development'
    },
    { 
      icon: <Database className="w-5 h-5" />, 
      name: 'Database', 
      color: 'text-yellow-500',
      description: 'Data management'
    },
    { 
      icon: <Terminal className="w-5 h-5" />, 
      name: 'Tools', 
      color: 'text-purple-500',
      description: 'Development tools'
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Full Stack Development expertise with focus on modern web technologies
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="github-card p-4 text-center"
            >
              <div className={`${category.color} mb-2 flex justify-center`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="github-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg ${category.color.replace('text-', 'bg-')} bg-opacity-20`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
              
              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category.name)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            category.name === 'Frontend' ? 'bg-blue-500' :
                            category.name === 'Backend' ? 'bg-green-500' :
                            category.name === 'Database' ? 'bg-yellow-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Stack Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="github-card p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Full Stack Development Focus
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 className="font-medium text-gray-900 dark:text-white">Frontend</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Membuat tampilan website yang responsif dan nyaman digunakan di berbagai perangkat.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="font-medium text-gray-900 dark:text-white">Backend</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mengembangkan sistem backend, API, dan logika aplikasi agar berjalan dengan baik.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h4 className="font-medium text-gray-900 dark:text-white">Database</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mengelola dan merancang database supaya data tersimpan rapi dan mudah diakses.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="github-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Currently Learning & Improving
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              Blockchain Fundamentals
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              WEB3
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              Advanced React Patterns
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full">
              GraphQL
            </span>
            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-sm rounded-full">
              Testing (Jest, Cypress)
            </span>
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-full">
              AWS Basics
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;