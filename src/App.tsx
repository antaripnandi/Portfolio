import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
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

  // Initialize Lenis smooth inertia scrolling across desktop, mobile, tablet, laptop, etc.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      prevent: (node) => {
        return (
          node.hasAttribute('data-lenis-prevent') ||
          node.closest('[data-lenis-prevent]') !== null ||
          node.classList.contains('overflow-y-auto')
        );
      },
    });

    // Attach to window so components/navbars can trigger lenis.scrollTo()
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

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
    const handleScroll = () => {
      const sectionIds = ['about', 'work', 'now', 'beyond'];
      const viewportMid = window.innerHeight * 0.35; // 35% from top of viewport
      let currentSection = 'about';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
            currentSection = id;
            break;
          }
        }
      }

      // Special check if user is at the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        currentSection = 'beyond';
      }

      setActiveSection(currentSection);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
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

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
