'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code2 } from 'lucide-react';
import { socialLinks } from '@/app/utils/constants';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-20 flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Full Stack Developer
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Halo, Saya{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Dhimas Nurhidayat
              </motion.span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400">
              Saya tertarik membangun website dan aplikasi yang cepat, mudah digunakan, dan tampil rapi di berbagai perangkat. Fokus saya ada di pengembangan web modern, dari tampilan hingga sistem di balik layar.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-6"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium flex items-center gap-2"
              >
                Hubungi Saya
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
              >
                Lihat Proyek
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 pt-8"
            >
              <span className="text-gray-600 dark:text-gray-400">Ikuti saya:</span>
              <div className="flex gap-3">
                <motion.a
                  href={socialLinks.github}
                  whileHover={{ y: -3 }}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.linkedin}
                  whileHover={{ y: -3 }}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={socialLinks.email}
                  whileHover={{ y: -3 }}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Photo and Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Photo - Smaller Size */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative mb-6 mx-auto w-48 h-48 md:w-56 md:h-56"
            >
              {/* Outer Glow Effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(59, 130, 246, 0.4)",
                    "0 0 30px rgba(59, 130, 246, 0.6)",
                    "0 0 15px rgba(59, 130, 246, 0.4)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -inset-3 rounded-full bg-blue-500/20 blur-lg"
              />
              
              {/* Photo Container */}
              <div className="relative w-full h-full">
                {/* Floating Border */}
                <motion.div
                  className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-0.5"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-0.5">
                    {/* Photo with transparent background */}
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/pp-nobg.png"
                        alt="Dhimas Nurhidayat"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 192px, 224px"
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Elements Around Photo */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10"
                >
                  <Code2 className="w-4 h-4 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full"
                />
              </div>
              
              {/* Name Tag - Covering bottom part of photo */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <div className="text-center">
                  <div className="font-bold text-sm md:text-base">Dhimas Nurhidayat</div>
                  <div className="text-xs text-blue-100">Full Stack Developer</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Code Block */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="github-card p-6"
            >
              {/* GitHub-like header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  portfolio.js
                </span>
              </div>

              {/* Code Animation */}
              <div className="font-mono text-sm space-y-2">
                <div className="flex">
                  <span className="text-purple-600 dark:text-purple-400">const</span>
                  <span className="text-gray-900 dark:text-white ml-2">developer</span>
                  <span className="text-gray-600 dark:text-gray-400"> = </span>
                  <span className="text-yellow-600 dark:text-yellow-400">{'{'}</span>
                </div>
                <div className="ml-4">
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">nama</span>
                    <span className="text-gray-600 dark:text-gray-400">: </span>
                    <span className="text-green-600 dark:text-green-400">'Dhimas Nurhidayat'</span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">pekerjaan</span>
                    <span className="text-gray-600 dark:text-gray-400">: </span>
                    <span className="text-green-600 dark:text-green-400">'Full Stack Developer'</span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">skill</span>
                    <span className="text-gray-600 dark:text-gray-400">: [</span>
                    <span className="text-green-600 dark:text-green-400">'React'</span>
                    <span className="text-gray-600 dark:text-gray-400">, </span>
                    <span className="text-green-600 dark:text-green-400">'Next.js'</span>
                    <span className="text-gray-600 dark:text-gray-400">, </span>
                    <span className="text-green-600 dark:text-green-400">'Node.js'</span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                    <span className="text-green-600 dark:text-green-400">'Laravel'</span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                    <span className="text-green-600 dark:text-green-400">'mySQL'</span>
                    <span className="text-gray-600 dark:text-gray-400">],</span>
                  </div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">tersedia</span>
                    <span className="text-gray-600 dark:text-gray-400">: </span>
                    <span className="text-yellow-600 dark:text-yellow-400">true</span>
                    <span className="text-gray-600 dark:text-gray-400">,</span>
                  </div>
                </div>
                <div className="text-yellow-600 dark:text-yellow-400">{'}'}</div>
                
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;