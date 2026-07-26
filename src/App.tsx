import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SongRecommendations } from './components/SongRecommendations';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { NowSection } from './components/NowSection';
import { BeyondSection } from './components/BeyondSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { IntroSplashScreen } from './components/IntroSplashScreen';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [splashFinished, setSplashFinished] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  useEffect(() => {
    // Disable browser automatic scroll restoration on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Instantly scroll to top on mount
    window.scrollTo(0, 0);

    // Also handle beforeunload/unload to ensure page resets to top on fresh reloads
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.25,
      rootMargin: '-20% 0px -40% 0px'
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sections = document.querySelectorAll('#about, #work, #now, #beyond');
    sections.forEach(sec => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-[#16130f] text-[#eae1db] font-sans-body min-h-screen selection:bg-[#f2c08d] selection:text-[#16130f]">
      {/* Intro Splash Screen */}
      <IntroSplashScreen onComplete={() => setSplashFinished(true)} />

      {/* Custom Fluid Cursor */}
      <CustomCursor />

      {/* Film grain overlay */}
      <div className="fixed inset-0 grain-overlay z-50 pointer-events-none" />

      {/* Floating navigation */}
      <Navbar
        activeSection={activeSection}
        isSplashFinished={splashFinished}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection
          isSplashFinished={splashFinished}
        />
        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />
        <SongRecommendations />
        <WorkSection onSelectProject={proj => setSelectedProject(proj)} />
        <NowSection />
        <BeyondSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project details modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume / CV modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
