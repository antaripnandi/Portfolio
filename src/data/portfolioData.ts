import { Project, Interest, SkillCategory, NowTopic, SongTrack } from '../types';

export const SONGS_DATA: SongTrack[] = [
  {
    id: 'song-1',
    title: 'Paparazzi (Dubstep)',
    artist: 'Kim',
    album: 'Single',
    genre: 'Dubstep',
    year: '2024',
    duration: '2:45',
    coverUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02271b99db98cf2b320be5d6f6',
    spotifyUrl: 'https://open.spotify.com/track/5PXHWb7plr43VDkPdX4djf?si=b3c7b32a6d944723'
  },
  {
    id: 'song-2',
    title: 'Die Young',
    artist: 'LIL TEXAS',
    album: 'Die Young',
    genre: 'Hardcore',
    year: '2023',
    duration: '2:15',
    coverUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026f1917a8f429cd2e25ff9673',
    spotifyUrl: 'https://open.spotify.com/track/0ya5O7wsLk1gGemufeGvrA?si=779877202c5c49cf'
  },
  {
    id: 'song-3',
    title: 'MY JEALOUSY HARDTEKK',
    artist: 'Draculaura',
    album: 'MY JEALOUSY HARDTEKK',
    genre: 'Hardtekk',
    year: '2024',
    duration: '2:10',
    coverUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022bb50e684bd3ae4ba93fa0b5',
    spotifyUrl: 'https://open.spotify.com/track/6vVeTcmRlskF5ShcFyCmrN?si=d10463e83d7945b3'
  },
  {
    id: 'song-4',
    title: 'Dark Beach',
    artist: 'PASTEL GHOST',
    album: 'Abyss',
    genre: 'Dark Wave',
    year: '2015',
    duration: '3:43',
    coverUrl: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e026bbea59f1d07d69f8ca5350b',
    spotifyUrl: 'https://open.spotify.com/track/7fqjWHXf330QwnfaAWB2Dr?si=a13afb2a0b654045'
  },
  {
    id: 'song-5',
    title: 'Suffocation',
    artist: 'Crystal Castles',
    album: 'Crystal Castles (II)',
    genre: 'Electronic',
    year: '2010',
    duration: '4:02',
    coverUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e022acf8c820a360269715b2d6e',
    spotifyUrl: 'https://open.spotify.com/track/12oxsGACfwMozi4nK9noGQ?si=1d61f65be7cd49b2'
  },
  {
    id: 'song-6',
    title: 'Vanished',
    artist: 'Crystal Castles',
    album: 'Crystal Castles',
    genre: 'Electronic',
    year: '2008',
    duration: '4:02',
    coverUrl: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02379438a3e296d1d19bf8515f',
    spotifyUrl: 'https://open.spotify.com/track/4bQ7mjty0UVlKRalhizpGT?si=ab5fa873193f4665'
  }
];

export const HERO_DATA = {
  nameFirst: 'ANTARIP',
  nameLast: 'NANDI',
  location: 'Siliguri, India',
  age: '17 Years Old',
  specialization: 'AI · Advanced Web Design · Systems',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ph1aUBLx03spHIW-mTilL10YVHgWq6NfWqePnyZ3QR5CkCfwiPKHszy7hCFhchLiGfSe-guin6XZVhhlUPBQvjXnIRv-AurxBdWB2AC8OBMc-Eh4lk6Q4_Nsd03sXs8ZvUBoqqeV6xTwQzz5GaQo8qcCUfxgKyYd6zfoXq7C4dl9ysb-I5dEcIKqkyAy5zT2BxpEj-OFfWRYlqlqLplaXF47rBBlvKOiLl6i-1eWGlNexyCcqsJrXjJFokMEmAI7KQZsdULmugW3',
  bgHeroUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCscLaIaKHKFYYnohawIk1fvObNG74L7Ff9hzq-goJgIB1ozz3l_JFaeX1TvuL5R5Wqf2XIOf8zzfAGFo9ggymxb2MVI-EJ9SrXx5QVMm8sIq0NMq_U1wHzpS0pv-qT3o-rfXOWvtfjhnqRxlrtIcwMNXr0cM3TIridX11Np9Ha7CUO1D6pn0_5THVOcsh37YjUIwxVwQ2BiPiZbAzoTk3g-EyiDFq4TkSkejeAqnBgIcwAz__Dx5-id8mia8c1ajfEKDuefpCg1nig'
};

export const ABOUT_DATA = {
  sectionLabel: '01 — ABOUT',
  bioPrimary: `I am Antarip Nandi, a developer deeply focused on AI Systems & Agents, Advanced Web Design, Minecraft modding, and creative digital engineering. Currently a first year CSE student specializing in AI/ML, based in Siliguri, West Bengal.`,
  bioSecondary: `From engineering multi-agent ecosystems to crafting immersive web interfaces with smooth micro-interactions, fluid layout math, and 3D dynamics, I build software that balances technical performance with exceptional design.`,
  skills: [
    { title: 'AI Systems & Agents', subtitle: 'Python / LLMs', tag: 'AI/ML' },
    { title: 'Advanced Web Design', subtitle: 'UI/UX & Interactive Design', tag: 'React / TS' },
    { title: 'Minecraft Modding', subtitle: 'Java / Modding API', tag: 'Java' },
    { title: 'Video Editing', subtitle: 'DaVinci Resolve', tag: 'Creative' }
  ] as SkillCategory[]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'openclaw',
    title: 'OPENCLAW',
    year: '2026',
    category: 'AI AGENT ECOSYSTEM',
    description: 'A multi-agent system with 100+ specialized agents designed for LLM orchestration and autonomous task execution.',
    tags: ['Python', 'Multi-Agent', 'LLM'],
    longDescription: 'OpenClaw is an architecture engineered for scalable LLM agent collaboration. It coordinates 100+ specialized micro-agents across autonomous reasoning loops, dynamic tool calling, memory synthesis, and self-correcting execution paths.',
    features: [
      '100+ specialized domain agents operating in async pipelines',
      'Contextual long-term memory graph with vector storage',
      'Self-healing code execution and automated unit testing',
      'Streamed agent thoughts and real-time execution feedback'
    ],
    architecture: 'Python 3.12 · Asyncio · Vector Store · LLM Orchestration Engine',
    demoType: 'openclaw-agent'
  },
  {
    id: 'sudoku',
    title: 'SUDOKU',
    year: '2025',
    category: 'FULL STACK GAME',
    description: 'A full-featured Sudoku engine with 5 difficulty levels, random puzzle generation, move validation, and MySQL leaderboard tracking.',
    tags: ['Python', 'MySQL', 'Sudoku Engine', 'Algorithms'],
    longDescription: 'A complete full-stack Sudoku application engineered with algorithmic puzzle generation, constraint satisfaction, and a relational MySQL backend. Features 5 distinct difficulty levels, full grid move validation, completion timers, and persistent leaderboard and solved board histories.',
    features: [
      '5 Difficulty Levels: Very Easy, Easy, Mid, Hard, and Very Very Hard',
      'Random puzzle generation every game with fixed, unchangeable starting clues',
      'Full real-time move validation (rows, columns, and 3x3 sub-grids)',
      'Built-in timer tracking exact time taken to solve each puzzle',
      'MySQL-backed leaderboard with top scores sorted by fastest completion time',
      'Database persistence for solved boards and player history'
    ],
    architecture: 'Python · MySQL Database · Backtracking & Validation Engine',
    githubUrl: 'https://github.com/antaripnandi/Sudoku'
  },
  {
    id: 'minecraft-mods',
    title: 'MINECRAFT MODS',
    year: '2026',
    category: 'GAME DEV',
    description: 'Technical gameplay and debug HUD enhancements including F3 Advance, VeinMiner, Ender Chest Extender, and Barrel Extender.',
    tags: ['Java', 'Minecraft Fabric / Forge', 'HUD & UI', 'Modding'],
    longDescription: 'A collection of technical gameplay & HUD enhancement mods created to improve quality of life, performance diagnostics, and game mechanics in Minecraft. Built with Java and modern modding APIs (Fabric/Forge), focusing on low memory overhead, customizable F3 debug widgets, and seamless vanilla integration.',
    features: [
      'F3 Advance: Advanced customizable debug HUD with real-time FPS graphs, chunk diagnostics, and modular telemetry panels',
      'VeinMiner: Recursive connected-block mining with configurable energy and tool wear',
      'Ender Chest Extender: Expanded multi-tab dimensionally linked inventory storage',
      'Barrel Extender: Modular storage tile entities with custom NBT synchronization',
      'High efficiency event listeners and lightweight hooks ensuring 60+ FPS server and client tick rates'
    ],
    architecture: 'Java 17/21 · Fabric API / Minecraft Forge · Bytecode Mixins & OpenGL HUD Rendering',
    modrinthUrl: 'https://modrinth.com/user/antarip',
    demoType: 'minecraft-mod'
  },
  {
    id: 'advanced-web-design',
    title: 'ADVANCED WEB ARCHITECTURE',
    year: '2026',
    category: 'CREATIVE WEB & UI/UX',
    description: 'Immersive, ultra-responsive web experiences with fluid motion and bespoke design systems. Example: This Portfolio.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    longDescription: 'A showcase of modern advanced web design & UI/UX architecture — exemplified directly by this portfolio website. Features dark dynamic typography, mathematical layout scaling, subtle micro-interactions, hardware-accelerated tilt dynamics, and infinite marquee streams.',
    features: [
      'Featured Example: This personal portfolio website platform',
      'Refined 3D tilt cards with gentle cursor tracking & ambient spotlight effects',
      'Seamless endless music marquee stream with hover pause & smooth physics',
      'Modal frame focus management & backdrop scroll locking',
      'Adaptable responsive layout engineering tuned across all device viewports'
    ],
    architecture: 'React 18 · TypeScript · Motion · Tailwind CSS',
    githubUrl: 'https://github.com/antaripnandi'
  }
];

export const NOW_DATA = {
  sectionLabel: '03 — NOW',
  learning: {
    title: 'Learning',
    items: [
      { icon: 'bolt', text: 'Advanced Agent Design', detail: 'Exploring multi-agent swarms and function orchestration.' },
      { icon: 'design_services', text: 'Advanced Web Design & UI/UX', detail: 'Mastering micro-interactions, responsive architecture, and fluid motion.' },
      { icon: 'palette', text: 'Blender & Video Editing', detail: '3D motion graphics and DaVinci Resolve color grading.' }
    ]
  },
  building: {
    title: 'Building',
    items: [
      { icon: 'layers', text: 'More Minecraft Mods', detail: 'New inventory mechanics and custom dimension utilities.' },
      { icon: 'hub', text: 'Expanding AI Agents', detail: 'Enhancing OpenClaw agent tool-call reliability.' },
      { icon: 'code', text: 'Bespoke Web Experiences', detail: 'Crafting high-precision, interactive web apps and portfolio platforms.' }
    ]
  }
};

export const BEYOND_DATA: Interest[] = [
  {
    id: 'chess',
    title: 'CHESS',
    description: '1500–1600 ELO rating. Strategic thinker on and off the board.',
    tag: 'CHESS',
    highlight: '1500-1600 ELO'
  },
  {
    id: 'fitness',
    title: 'FITNESS',
    description: 'Daily discipline and physical conditioning.',
    tag: 'FITNESS',
    highlight: 'Daily Discipline'
  },
  {
    id: 'gaming',
    title: 'GAMING',
    description: 'Deep systems and strategy-focused games.',
    tag: 'GAMING',
    highlight: 'Systems & RPGs'
  },
  {
    id: 'youtube',
    title: 'YOUTUBE',
    description: 'Creating high-energy gaming montages.',
    tag: 'YOUTUBE',
    highlight: '@TITANANTARIP'
  },
  {
    id: 'sports',
    title: 'SPORTS',
    description: 'Competitive play and team dynamics.',
    tag: 'SPORTS',
    highlight: 'Team Play'
  },
  {
    id: 'reading',
    title: 'READING',
    description: 'Deep dives into AI research papers.',
    tag: 'READING',
    highlight: 'AI Papers'
  }
];

export const FOOTER_DATA = {
  copyright: '© 2026 ANTARIP NANDI. ALL RIGHTS RESERVED.',
  socials: [
    { name: 'Github', url: 'https://github.com/antaripnandi' },
    { name: 'Instagram', url: 'https://www.instagram.com/antaripbozoo/' },
    { name: 'Email', url: 'mailto:bantarip4@gmail.com' },
    { name: 'YouTube', url: 'https://youtube.com/@TITANANTARIP' },
    { name: 'Modrinth', url: 'https://modrinth.com/user/antarip' },
    { name: 'Discord: e5g._', isDiscord: true, discordHandle: 'e5g._' }
  ]
};
