// Portfolio content. Edit these values to match the real facts about you.
// Keep every claim true: the assignment marks "genuine" content.

export const IDENTITY = {
  fullName: 'Dominic Onen',
  regNo: '25/28259',
  appName: 'DOPortfolio',
  verificationCode: 'MOB-A2-8259',
};

export const DEFAULT_PROFILE = {
  headline: 'Software engineering student building mobile apps',
  bio: 'I study software engineering at INES-Ruhengeri. I build React Native apps and the small web services behind them, and I like shipping something people can install and test.',
  primarySkill: 'React Native',
  availability: 'Open to internships' as Availability,
};

export type Availability = 'Open to internships' | 'Open to projects' | 'Not available';
export const AVAILABILITY_OPTIONS: Availability[] = [
  'Open to internships',
  'Open to projects',
  'Not available',
];

export type Skill = { name: string; level: 'Learning' | 'Comfortable' | 'Confident'; note: string };

export const SKILLS: Skill[] = [
  { name: 'React Native & Expo', level: 'Comfortable', note: 'Screens, navigation, forms, APK builds' },
  { name: 'JavaScript / TypeScript', level: 'Comfortable', note: 'Hooks, typed components' },
  { name: 'Python & FastAPI', level: 'Learning', note: 'REST endpoints, validation, SQLite' },
  { name: 'Git & GitHub', level: 'Comfortable', note: 'Repositories, commits, GitHub Actions' },
  { name: 'REST APIs', level: 'Comfortable', note: 'Calling and designing JSON endpoints' },
  { name: 'Deploying services', level: 'Learning', note: 'Render, build logs, fixing deploy errors' },
];

export type TimelineItem = { period: string; title: string; place: string; detail: string };

export const TIMELINE: TimelineItem[] = [
  {
    period: '2026',
    title: 'Mobile Application Development (SWE 3409)',
    place: 'INES-Ruhengeri',
    detail: 'React Native and Expo practicals, individual assignments and group work.',
  },
  {
    period: '2026',
    title: 'Applied AI (SWE 3513)',
    place: 'INES-Ruhengeri',
    detail: 'Data cleaning, models and serving results through an API.',
  },
  {
    period: 'In progress',
    title: 'Software Engineering studies',
    place: 'INES-Ruhengeri, Musanze, Rwanda',
    detail: 'Registration number 25/28259.',
  },
];

export type Project = {
  id: string;
  title: string;
  problem: string;
  contribution: string;
  tech: string[];
  link?: { label: string; url: string };
};

export const PROJECTS: Project[] = [
  {
    id: 'scholarship-hub',
    title: 'Global Scholarship Hub (mobile app)',
    problem:
      'Students find scholarship offers in many places and cannot easily see deadlines, eligibility and open slots together.',
    contribution:
      'I set up the Expo app, connected it to a backend, built the Offers, Details, Registration and Pending screens, and produced the installable APK with GitHub Actions. The code was written with AI assistance (see evidence/AI_USE.md) and I tested and deployed it myself.',
    tech: ['React Native', 'Expo', 'GitHub Actions'],
    link: { label: 'View code on GitHub (needs internet)', url: 'https://github.com/DominicOnen/scholarship-app' },
  },
  {
    id: 'scholarship-api',
    title: 'Scholarship Hub API (backend)',
    problem:
      'The app needed shared data: the list of offers, live slots left, and saved applications with a status.',
    contribution:
      'I put the FastAPI service on GitHub, deployed it on Render, fixed the deploy errors (wrong folder path), and pointed the app at it. It stores applications in SQLite and refuses bad input and full scholarships.',
    tech: ['Python', 'FastAPI', 'SQLite', 'Render'],
    link: { label: 'View code on GitHub (needs internet)', url: 'https://github.com/DominicOnen/scholarship-hub-backend' },
  },
  {
    id: 'doportfolio',
    title: 'DOPortfolio (this app)',
    problem: 'A recruiter should understand who I am and what I can build within two minutes, even offline.',
    contribution:
      'I chose the content, ran the build and tests on my phone, and recorded the demonstration. The structure uses tabs, a project stack, an editable profile saved with AsyncStorage and a profile picture picker.',
    tech: ['React Native', 'TypeScript', 'React Navigation', 'AsyncStorage'],
  },
];
