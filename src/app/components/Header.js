'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { navLinks, socialLinks } from '@/app/utils/constants';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            {/* <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <Github className="w-5 h-5 text-white dark:text-gray-900" />
            </div> */}
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Dhimas Nurhidayat
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <motion.a
                href={socialLinks.github}
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={socialLinks.linkedin} 
                target="_blank"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 px-4"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 px-4">
                <ThemeToggle />
                <div className="flex items-center space-x-3">
                  <a href={socialLinks.github}>
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.linkedin}>
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={socialLinks.email}>
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;