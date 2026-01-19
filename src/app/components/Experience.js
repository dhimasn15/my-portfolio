'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Users, Calendar, MapPin, Award } from 'lucide-react';

const Experience = () => {
  const [experienceData] = useState([
    {
      id: 1,
      title: 'Pemateri HTML Course',
      organization: 'B3 (Belajar Bareng BASIC)',
      type: 'Teaching',
      description: 'Mengajar materi HTML dasar kepada peserta, membantu mereka memahami struktur dan semantik HTML dengan praktik langsung.',
      skills: ['HTML', 'Teaching', 'Curriculum Design'],
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      startDate: '2023',
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Pemateri HTML, CSS & JavaScript',
      organization: 'FORKABES',
      type: 'Teaching',
      description: 'Menjadi pemateri untuk course lengkap mencakup HTML, CSS, dan JavaScript. Membimbing peserta dari basic hingga implementasi interaktif.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Mentoring'],
      icon: <Code className="w-6 h-6" />,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      startDate: '2024',
      status: 'Ongoing',
    },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Teaching
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pengalaman saya dalam mengembangkan aplikasi dan berbagi ilmu kepada developer lain
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="github-card p-6 border-l-4 border-blue-500 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-lg ${exp.color} flex-shrink-0`}>
                  {exp.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      exp.type === 'Teaching' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    }`}>
                      {exp.type}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      exp.status === 'Ongoing'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}>
                      {exp.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{exp.organization}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.startDate}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="github-card p-6 text-center">
            <Award className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              2+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Course Diajarkan
            </div>
          </div>

          <div className="github-card p-6 text-center">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              100+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Peserta Didik
            </div>
          </div>

          <div className="github-card p-6 text-center">
            <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              3+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Tahun Pengalaman
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
