export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl?: string;
  spotifyUrl?: string;
  duration: string;
  genre: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
  longDescription?: string;
  features?: string[];
  architecture?: string;
  githubUrl?: string;
  modrinthUrl?: string;
  demoType?: 'interactive-sudoku' | 'openclaw-agent' | 'minecraft-mod';
}

export interface Interest {
  id: string;
  title: string;
  description: string;
  tag: string;
  highlight?: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  tag: string;
}

export interface NowTopic {
  title: string;
  items: {
    icon: string;
    text: string;
    detail?: string;
  }[];
}
