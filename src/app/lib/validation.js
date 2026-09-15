import { z } from 'zod';

const emptyToUndefined = (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v);

const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());
const optionalText = (max = 2000) =>
  z.preprocess(emptyToUndefined, z.string().max(max).optional());
const optionalList = (maxItems = 20) =>
  z.preprocess(
    (v) => (Array.isArray(v) ? v.filter((i) => String(i).trim() !== '') : v),
    z.array(z.string().min(1).max(500)).max(maxItems).default([])
  );
const optionalNumber = z.preprocess((v) => (v === '' || v === null ? undefined : v), z.number().int().min(0).max(999).optional());

const enText = (max = 2000) => optionalText(max);
const enList = (maxItems = 20) => optionalList(maxItems);

export const projectSchema = z.object({
  title: z.string().min(3).max(120),
  title_en: enText(120),
  slug: z.preprocess(emptyToUndefined, z.string().min(2).max(100).optional()),
  shortDescription: z.string().min(10).max(220),
  shortDescription_en: enText(220),
  description: z.string().min(20).max(5000),
  description_en: enText(5000),
  category: z.preprocess(emptyToUndefined, z.string().min(2).max(30).default('WEB')),
  role: z.string().min(2).max(80),
  role_en: enText(80),
  technologies: optionalList(20),
  thumbnail: optionalText(300).default(''),
  images: z.preprocess(
    (v) => (Array.isArray(v) ? v.filter((i) => String(i).trim() !== '') : v),
    z.array(z.string().min(1).max(300)).max(20).default([])
  ),
  githubUrl: optionalUrl.default(''),
  liveUrl: optionalUrl.default(''),
  problem: optionalText(2000).default(''),
  problem_en: enText(2000),
  solution: optionalText(2000).default(''),
  solution_en: enText(2000),
  features: optionalList(20),
  features_en: enList(20),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  featured: z.boolean().default(false),
  order: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.number().int().min(0).max(999).default(99)),
});

export const experienceSchema = z.object({
  title: z.string().min(3).max(120),
  title_en: enText(120),
  company: z.string().min(2).max(120),
  company_en: enText(120),
  type: z.preprocess(emptyToUndefined, z.string().min(2).max(40).default('Other')),
  type_en: enText(40),
  location: optionalText(120).default(''),
  startDate: z.string().min(4).max(20),
  endDate: optionalText(20).default(''),
  current: z.boolean().default(false),
  description: z.string().min(10).max(3000),
  description_en: enText(3000),
  responsibilities: optionalList(20),
  responsibilities_en: enList(20),
  technologies: optionalList(20),
  order: optionalNumber.default(99),
  featured: z.boolean().default(false),
});

export const educationSchema = z.object({
  institution: z.string().min(2).max(140),
  degree: z.preprocess(emptyToUndefined, z.string().min(1).max(60).default('-')),
  degree_en: enText(60),
  field: z.string().min(2).max(120),
  field_en: enText(120),
  startDate: z.string().min(4).max(20),
  endDate: optionalText(20).default(''),
  current: z.boolean().default(false),
  description: optionalText(2000).default(''),
  description_en: enText(2000),
  order: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.number().int().min(0).max(999).default(99)),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(60),
  category: z.enum(['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']).default('Other'),
  description: optionalText(500).default(''),
  description_en: enText(500),
  order: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.number().int().min(0).max(999).default(99)),
  featured: z.boolean().default(false),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(120),
  shortName: z.string().min(2).max(20),
  headline: z.string().min(2).max(120),
  headline_en: enText(120),
  bio: z.string().min(10).max(2000),
  bio_en: enText(2000),
  longBio: optionalText(5000).default(''),
  longBio_en: enText(5000),
  location: optionalText(160).default(''),
  location_en: enText(160),
  availability: z.boolean().default(true),
  availabilityNote: optionalText(160).default(''),
  availabilityNote_en: enText(160),
  email: z.string().email(),
  phone: optionalText(40).default(''),
  profileImage: optionalText(300).default(''),
  resumeUrl: optionalText(300).default(''),
});

export const socialsSchema = z.object({
  github: optionalUrl.default(''),
  linkedin: optionalUrl.default(''),
  email: optionalText(160).default(''),
  instagram: optionalUrl.default(''),
  whatsapp: optionalUrl.default(''),
  website: optionalUrl.default(''),
});

export const settingsSchema = z.object({
  siteTitle: z.string().min(2).max(160),
  siteTitle_en: enText(160),
  siteDescription: z.string().min(10).max(300),
  siteDescription_en: enText(300),
  ogImage: optionalText(300).default(''),
  accent: optionalText(30).default('cobalt'),
  showGithubSection: z.boolean().default(true),
  showContactForm: z.boolean().default(true),
});

export const messageSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(2).max(140),
  message: z.string().min(10).max(3000),
});

export const schemas = {
  projects: projectSchema,
  experience: experienceSchema,
  education: educationSchema,
  skills: skillSchema,
  messages: messageSchema,
};

export const sectionSchemas = {
  profile: profileSchema,
  socials: socialsSchema,
  settings: settingsSchema,
};
