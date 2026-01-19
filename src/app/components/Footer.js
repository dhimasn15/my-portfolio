'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Heart, Code } from 'lucide-react';
import { socialLinks } from '@/app/utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-semibold">
                Dhimas Nurhidayat
              </span>
            </div>
            <p className="text-sm mt-2">
              Built with <Heart className="w-3 h-3 inline text-red-500" /> using Next.js & Tailwind
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center items-center gap-6"
          >
            { [
              { icon: <Github className="w-5 h-5" />, href: socialLinks.github },
              { icon: <Linkedin className="w-5 h-5" />, href: socialLinks.linkedin },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ y: -3, scale: 1.1 }}
                className="p-3 bg-muted dark:bg-muted rounded-lg hover:bg-muted-foreground dark:hover:bg-muted-foreground transition-colors flex items-center justify-center"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Back to Top */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 border border-muted dark:border-muted-foreground rounded-lg hover:bg-muted transition-colors"
          >
            Back to Top
          </motion.button>
        </div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <motion.a 
              href="#home" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </motion.a>
            <motion.a 
              href="#about" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </motion.a>
            <motion.a 
              href="#projects" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Projects
            </motion.a>
            <motion.a 
              href="#skills" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Skills
            </motion.a>
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
            © {currentYear} Dhimas Nurhidayat. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;