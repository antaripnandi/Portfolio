import { PROJECTS_DATA, SONGS_DATA, ABOUT_DATA, HERO_DATA, NOW_DATA, BEYOND_DATA, FOOTER_DATA } from '../data/portfolioData';
import { Project, SongTrack } from '../types';

/**
 * API Service Layer
 * Abstracts data retrieval to allow seamless integration with future database/backend 
 * (e.g., Next.js API routes, Supabase, Firestore, Prisma, or PostgreSQL).
 */

export async function fetchProjects(): Promise<Project[]> {
  // Replace with API endpoint (e.g., fetch('/api/projects')) when database is connected
  return PROJECTS_DATA;
}

export async function fetchSongs(): Promise<SongTrack[]> {
  // Replace with API endpoint (e.g., fetch('/api/songs')) when database is connected
  return SONGS_DATA;
}

export async function fetchHeroData() {
  return HERO_DATA;
}

export async function fetchAboutData() {
  return ABOUT_DATA;
}

export async function fetchNowData() {
  return NOW_DATA;
}

export async function fetchBeyondData() {
  return BEYOND_DATA;
}

export async function fetchFooterData() {
  return FOOTER_DATA;
}
