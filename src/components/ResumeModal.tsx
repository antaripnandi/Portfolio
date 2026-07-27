import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Antarip_Nandi_CV</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink: #14171A;
      --body-text: #3A3F44;
      --muted: #767C82;
      --paper: #FFFFFF;
      --panel: #F5F7F5;
      --accent: #1E6B54;
      --accent-soft: #E7F1EC;
      --rule: #E1E4E1;
    }

    body {
      font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--body-text);
      background: var(--paper);
      padding: 44px;
      max-width: 820px;
      margin: 0 auto;
      line-height: 1.5;
    }

    h1 {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--ink);
    }

    .tag {
      display: inline-block;
      margin-top: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--accent);
      background: var(--accent-soft);
      padding: 3px 9px;
      border-radius: 4px;
    }

    .contact-bar {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11.5px;
      color: var(--muted);
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .contact-bar a { color: var(--ink); text-decoration: none; font-weight: 600; }
    .contact-bar .sep { color: var(--rule); }

    .bio {
      margin-top: 16px;
      background: var(--panel);
      border-left: 3px solid var(--accent);
      border-radius: 0 5px 5px 0;
      padding: 12px 16px;
    }
    .bio .cmt {
      display: block;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10.5px;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .bio p {
      font-size: 12.5px;
      color: var(--body-text);
    }

    .section-title {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--accent);
      border-bottom: 1px solid var(--rule);
      padding-bottom: 5px;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .section-title .cmt { color: var(--muted); opacity: 0.7; font-weight: 500; margin-right: 4px; }

    .edu-header, .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .edu-title, .project-title {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--ink);
    }
    .date {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      color: var(--muted);
      white-space: nowrap;
    }
    .desc {
      font-size: 12px;
      color: var(--body-text);
      margin-top: 3px;
      line-height: 1.55;
    }

    .skills-wrap {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .skill-block-label {
      font-family: 'IBM Plex Mono', monospace;
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 7px;
    }
    .skill-block-label .muted-note {
      font-weight: 500;
      color: var(--muted);
      text-transform: none;
      letter-spacing: 0;
    }
    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .skill-tag {
      font-size: 11.5px;
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid var(--rule);
      background: var(--paper);
      color: var(--body-text);
    }
    .skill-tag.learning {
      border-style: dashed;
      border-color: #C9CFC9;
      background: var(--panel);
      color: var(--muted);
    }

    @media print {
      body { padding: 0; max-width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div>
    <h1>Antarip Nandi</h1>
    <div class="tag">CS Undergraduate — AI &amp; ML</div>
    <div class="contact-bar">
      <span>Siliguri / Chennai, India</span>
      <span class="sep">·</span>
      <a href="mailto:bantarip4@gmail.com">bantarip4@gmail.com</a>
      <span class="sep">·</span>
      <a href="https://github.com/antaripnandi" target="_blank">github.com/antaripnandi</a>
    </div>
    <div class="bio">
      <span class="cmt">/* about */</span>
      <p><strong style="color: var(--ink);">Self-taught builder before I took a single CS class:</strong> a multi-agent AI framework, Java Minecraft mods, and a from-scratch Sudoku solver, all written in the two years before starting my degree. Now a first-year B.Tech CS student (AI &amp; ML) at SRM, filling in the theory behind what I already know how to build.</p>
    </div>
  </div>

  <div class="section-title"><span class="cmt">//</span>Education</div>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <div>
      <div class="edu-header">
        <div class="edu-title">SRM Institute of Science and Technology</div>
        <div class="date">2026 – 2030 | Chennai, India</div>
      </div>
      <div class="desc">B.Tech in Computer Science & Engineering — specialization in Artificial Intelligence & Machine Learning</div>
    </div>
    <div>
      <div class="edu-header">
        <div class="edu-title">Birla Divya Jyoti (CBSE) &amp; Don Bosco School (ICSE), Siliguri</div>
        <div class="date">2012 – 2026</div>
      </div>
      <div class="desc">Kindergarten through Class XII</div>
    </div>
  </div>

  <div class="section-title"><span class="cmt">//</span>Technical Skills</div>
  <div class="skills-wrap">
    <div>
      <div class="skill-block-label">Core — Hands-On</div>
      <div class="skill-tags">
        <span class="skill-tag">Python</span>
        <span class="skill-tag">Java</span>
        <span class="skill-tag">C++</span>
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">HTML5 / CSS3</span>
        <span class="skill-tag">Git / GitHub</span>
        <span class="skill-tag">Linux (Bash)</span>
        <span class="skill-tag">Multi-Agent Architecture</span>
        <span class="skill-tag">Constraint Solvers</span>
        <span class="skill-tag">DaVinci Resolve</span>
        <span class="skill-tag">SQL (MySQL)</span>
        <span class="skill-tag">Tailwind CSS</span>
      </div>
    </div>
    <div>
      <div class="skill-block-label">Currently Learning <span class="muted-note">— studied, not yet used in a shipped project</span></div>
      <div class="skill-tags">
        <span class="skill-tag learning">PyTorch</span>
        <span class="skill-tag learning">TypeScript</span>
        <span class="skill-tag learning">React</span>
        <span class="skill-tag learning">Node.js</span>
        <span class="skill-tag learning">Express</span>
        <span class="skill-tag learning">Vite</span>
      </div>
    </div>
  </div>

  <div class="section-title"><span class="cmt">//</span>Featured Projects</div>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div>
      <div class="project-header">
        <div class="project-title">OpenClaw — Multi-Agent AI Framework (Personal Project)</div>
        <div class="date">2026</div>
      </div>
      <div class="desc"><strong style="color: var(--ink);">Agents that hand off work to each other.</strong> Coordinates multiple AI agents over JSON-RPC and runs their shell commands inside a sandbox, so one misbehaving agent can't touch the host system. <em>(Note: This is a personal project and will not be released.)</em></div>
    </div>

    <div>
      <div class="project-header">
        <div class="project-title">Interactive Personal Portfolio Website</div>
        <div class="date">2026</div>
      </div>
      <div class="desc"><strong style="color: var(--ink);">A project showcase with a live CV export.</strong> Personally styled portfolio site built with Tailwind CSS — featuring my work, a browser game, and a CV page that exports straight to PDF, the exact file you're reading now.</div>
    </div>

    <div>
      <div class="project-header">
        <div class="project-title">Minecraft Modding Suite (Java)</div>
        <div class="date">2026</div>
      </div>
      <div class="desc"><strong style="color: var(--ink);">4,000+ downloads across four published mods.</strong> Barrel Extender and Bigger Ender Chest expand storage, F3 Advance adds detail to the debug screen, and Veinminer Crouch mines a full connected vein when you crouch — all built and published independently.</div>
    </div>

    <div>
      <div class="project-header">
        <div class="project-title">Interactive Sudoku Engine & Solver</div>
        <div class="date">2025</div>
      </div>
      <div class="desc"><strong style="color: var(--ink);">A Sudoku engine with zero front-end dependencies.</strong> Seeded puzzle generation, live conflict checking as you type, and difficulty-scaled hints in plain JavaScript, backed by a MySQL leaderboard tracking best solve times.</div>
    </div>
  </div>

  <div class="section-title"><span class="cmt">//</span>Languages & Interests</div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 11.5px; color: var(--body-text);">
    <div>
      <strong style="color: var(--ink);">Languages Spoken:</strong><br>
      English (Fluent), Hindi (Fluent), Bengali (Native)
    </div>
    <div>
      <strong style="color: var(--ink);">Outside Class:</strong><br>
      Video editing (DaVinci Resolve), open-source AI tooling, game engine internals
    </div>
  </div>
</body>
</html>`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Prevent background scrolling & stop Lenis when Resume modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handlePrintPdf = () => {
    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.zIndex = '-9999';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(CV_HTML_CONTENT);
        doc.close();

        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch (e) {
            console.error('Print trigger error:', e);
            window.print();
          } finally {
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          }
        }, 300);
      }
    } catch {
      window.print();
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([CV_HTML_CONTENT], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Antarip_Nandi_CV.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTxt = () => {
    const cvText = `
ANTARIP NANDI
AI Systems & Software Engineer | B.Tech CSE (AI/ML)
Location: Siliguri / Chennai, India
Email: bantarip4@gmail.com
GitHub: https://github.com/antaripnandi
Portfolio: https://antarip.dev

================================================================================
EDUCATION
================================================================================
• Don Bosco School, Siliguri, India (2012 – 2024)
  Primary & Secondary Education — Kindergarten to Class X (ICSE)

• Birla Divya Jyoti, Siliguri, India (2024 – 2026)
  Higher Secondary Education — Class XI & XII (CBSE)

• SRM Institute of Science and Technology, Chennai, India (2026 – 2030)
  Bachelor of Technology (B.Tech) in Computer Science and Engineering
  Specialization: Artificial Intelligence & Machine Learning

================================================================================
TECHNICAL SKILLS
================================================================================
• Programming Languages: Python, Java, C++, TypeScript, JavaScript, SQL (MySQL)
• AI & Frameworks: PyTorch, LLM Agent Orchestration, Backtracking & Constraint Solvers
• Web Development: React, Node.js, Express, Tailwind CSS, Vite, RESTful APIs
• Tools & Systems: Linux / Bash, Git / GitHub, Minecraft Modding API (Java), DaVinci Resolve

================================================================================
FEATURED PROJECTS
================================================================================
1. OPENCLAW — AI Agent Framework (2026)
   • Multi-agent framework built for autonomous task execution and process routing.
   • Structured JSON RPC protocol handling with isolated task execution pipelines.

2. Minecraft Modding Suite (Java) (2026)
   • Java-based gameplay modification suite incorporating custom entity AI,
     item pipelines, and optimized block rendering routines.

3. Interactive Sudoku Engine & Solver (2025)
   • Web-based Sudoku puzzle generator utilizing backtracking algorithm.
   • Real-time grid validation, zero-latency cell collision checking, and hint limits.

4. Interactive Personal Portfolio Website (2026)
   • Dark editorial portfolio with custom animations, interactive mini-games,
     song recommendations, and clean CV preview and export options.

================================================================================
LANGUAGES & INTERESTS
================================================================================
• Languages: English (Fluent), Hindi (Fluent), Bengali (Native)
• Interests: Open Source AI, Game Mechanics, Video Editing & Digital Media Production
`.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Antarip_Nandi_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
        >
          {/* Print specific CSS override */}
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #printable-cv-area, #printable-cv-area * {
                visibility: visible !important;
              }
              #printable-cv-area {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                padding: 20px !important;
                background: #ffffff !important;
                color: #111111 !important;
                border: none !important;
                box-shadow: none !important;
              }
              #printable-cv-area .cv-header {
                color: #000000 !important;
                border-bottom: 2px solid #000000 !important;
              }
              #printable-cv-area .cv-text-muted {
                color: #444444 !important;
              }
              #printable-cv-area .cv-border {
                border-color: #dddddd !important;
              }
              #printable-cv-area .cv-[#f2c08d], #printable-cv-area .cv-accent {
                color: #111111 !important;
                font-weight: bold !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[-1] cursor-pointer no-print"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#1a1714] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#231f1b] border-b border-white/10 no-print flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2c08d] text-lg">description</span>
                <span className="font-mono-tech text-xs uppercase font-bold text-[#eae1db] tracking-wider">
                  Curriculum Vitae / Resume
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={handlePrintPdf}
                  className="px-3.5 py-1.5 bg-[#f2c08d] text-[#16130f] hover:bg-[#e0b07d] rounded-lg font-mono-tech text-xs font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
                  title="Print or Save CV as PDF"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>Save as PDF</span>
                </button>

                <button
                  onClick={handleDownloadHtml}
                  className="px-2.5 sm:px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-[#d4c4b7] hover:text-white rounded-lg font-mono-tech text-xs uppercase transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                  title="Download HTML CV file"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span className="hidden sm:inline">HTML CV</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="px-2.5 sm:px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-[#d4c4b7] hover:text-white rounded-lg font-mono-tech text-xs uppercase transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                  title="Download clean plain text CV"
                >
                  <span className="material-symbols-outlined text-sm">text_snippet</span>
                  <span className="hidden md:inline">Text CV</span>
                </button>

                <a
                  href="https://github.com/antaripnandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-[#d4c4b7] hover:text-white rounded-lg font-mono-tech text-xs uppercase transition flex items-center gap-1.5 cursor-pointer active:scale-95 no-underline"
                  title="View GitHub Files"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  <span className="hidden md:inline">GitHub</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 bg-white/5 hover:bg-white/15 text-[#d4c4b7] hover:text-white rounded-lg transition cursor-pointer ml-1"
                  title="Close Modal"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              className="p-5 sm:p-8 md:p-10 overflow-y-auto overscroll-contain custom-scrollbar space-y-8 text-[#eae1db] font-sans-body"
              id="printable-cv-area"
            >
              {/* CV Header */}
              <div className="border-b border-white/10 pb-6 cv-header">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-[#eae1db]">
                      ANTARIP NANDI
                    </h1>
                    <p className="font-mono-tech text-xs sm:text-sm text-[#f2c08d] uppercase tracking-wider mt-1 font-semibold cv-accent">
                      AI Systems & Software Engineer
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="font-mono-tech text-xs text-[#d4c4b7]/80 space-y-1 text-left md:text-right cv-text-muted">
                    <p className="flex items-center md:justify-end gap-1.5">
                      <span className="material-symbols-outlined text-xs text-[#f2c08d]">location_on</span>
                      <span>Siliguri / Chennai, India</span>
                    </p>
                    <p className="flex items-center md:justify-end gap-1.5">
                      <span className="material-symbols-outlined text-xs text-[#f2c08d]">mail</span>
                      <a href="mailto:bantarip4@gmail.com" className="hover:text-[#f2c08d] transition">
                        bantarip4@gmail.com
                      </a>
                    </p>
                    <p className="flex items-center md:justify-end gap-1.5">
                      <span className="material-symbols-outlined text-xs text-[#f2c08d]">code</span>
                      <a href="https://github.com/antaripnandi" target="_blank" rel="noreferrer" className="hover:text-[#f2c08d] transition">
                        github.com/antaripnandi
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#d4c4b7]/90 leading-relaxed mt-4 max-w-3xl cv-text-muted">
                  First-year Computer Science undergraduate student specializing in Artificial Intelligence and Machine Learning.
                  Passionate about building high-performance AI agent frameworks, interactive web engines, low-level solvers, and creative gameplay mechanics.
                </p>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h2 className="font-mono-tech text-xs uppercase tracking-widest text-[#f2c08d] font-bold border-b border-white/10 pb-1.5 cv-accent cv-border">
                  01 // EDUCATION
                </h2>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        Don Bosco School, Siliguri
                      </h3>
                      <p className="text-xs text-[#d4c4b7]/80 font-mono-tech cv-text-muted">
                        Primary & Secondary Education (Kindergarten to Class X) — ICSE Board
                      </p>
                    </div>
                    <span className="font-mono-tech text-xs text-[#f2c08d] font-semibold whitespace-nowrap cv-accent">
                      2012 – 2024 | Siliguri, India
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 border-t border-white/5 pt-2.5">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        Birla Divya Jyoti, Siliguri
                      </h3>
                      <p className="text-xs text-[#d4c4b7]/80 font-mono-tech cv-text-muted">
                        Higher Secondary Education (Class XI & XII) — CBSE Board
                      </p>
                    </div>
                    <span className="font-mono-tech text-xs text-[#f2c08d] font-semibold whitespace-nowrap cv-accent">
                      2024 – 2026 | Siliguri, India
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 border-t border-white/5 pt-2.5">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        SRM Institute of Science and Technology
                      </h3>
                      <p className="text-xs text-[#d4c4b7]/80 font-mono-tech cv-text-muted">
                        Bachelor of Technology (B.Tech) in Computer Science & Engineering — Specialization in AI & ML
                      </p>
                    </div>
                    <span className="font-mono-tech text-xs text-[#f2c08d] font-semibold whitespace-nowrap cv-accent">
                      2026 – 2030 | Chennai, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-3">
                <h2 className="font-mono-tech text-xs uppercase tracking-widest text-[#f2c08d] font-bold border-b border-white/10 pb-1.5 cv-accent cv-border">
                  02 // TECHNICAL SKILLS
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
                  <div className="bg-[#231f1b] border border-white/5 p-3 rounded-xl space-y-1 cv-border">
                    <span className="text-[#f2c08d] uppercase font-bold block text-[11px] cv-accent">
                      Programming Languages
                    </span>
                    <p className="text-[#d4c4b7] cv-text-muted">
                      Python, Java, C++, TypeScript, JavaScript, SQL (MySQL), HTML5 / CSS3
                    </p>
                  </div>

                  <div className="bg-[#231f1b] border border-white/5 p-3 rounded-xl space-y-1 cv-border">
                    <span className="text-[#f2c08d] uppercase font-bold block text-[11px] cv-accent">
                      AI & Systems Design
                    </span>
                    <p className="text-[#d4c4b7] cv-text-muted">
                      PyTorch, Multi-Agent Architecture, Backtracking & Constraint Validation, Grid Engines
                    </p>
                  </div>

                  <div className="bg-[#231f1b] border border-white/5 p-3 rounded-xl space-y-1 cv-border">
                    <span className="text-[#f2c08d] uppercase font-bold block text-[11px] cv-accent">
                      Web Technologies
                    </span>
                    <p className="text-[#d4c4b7] cv-text-muted">
                      React, Node.js, Express, Tailwind CSS, Vite, RESTful APIs, Single-Page Applications
                    </p>
                  </div>

                  <div className="bg-[#231f1b] border border-white/5 p-3 rounded-xl space-y-1 cv-border">
                    <span className="text-[#f2c08d] uppercase font-bold block text-[11px] cv-accent">
                      Tools & Creative Software
                    </span>
                    <p className="text-[#d4c4b7] cv-text-muted">
                      Git / GitHub, Linux (Bash), Minecraft Modding API (Java), DaVinci Resolve
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Projects */}
              <div className="space-y-4">
                <h2 className="font-mono-tech text-xs uppercase tracking-widest text-[#f2c08d] font-bold border-b border-white/10 pb-1.5 cv-accent cv-border">
                  03 // FEATURED PROJECTS
                </h2>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        OPENCLAW — Multi-Agent AI Framework
                      </h3>
                      <span className="font-mono-tech text-[11px] text-[#f2c08d] cv-accent">2026</span>
                    </div>
                    <p className="text-xs text-[#d4c4b7]/90 leading-relaxed cv-text-muted">
                      Engineered an autonomous multi-agent orchestration framework enabling AI agents to coordinate, parse JSON RPC task streams, and execute system commands safely in sandboxed environments. <em>(Note: This is a personal project and will not be released.)</em>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        Minecraft Modding Suite (Java)
                      </h3>
                      <span className="font-mono-tech text-[11px] text-[#f2c08d] cv-accent">2026</span>
                    </div>
                    <p className="text-xs text-[#d4c4b7]/90 leading-relaxed cv-text-muted">
                      Architected custom Java gameplay modifications incorporating custom mob artificial intelligence, item crafting pipelines, and custom rendering shaders.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        Interactive Sudoku Engine & Solver
                      </h3>
                      <span className="font-mono-tech text-[11px] text-[#f2c08d] cv-accent">2025</span>
                    </div>
                    <p className="text-xs text-[#d4c4b7]/90 leading-relaxed cv-text-muted">
                      Created a zero-dependency web Sudoku engine featuring fast randomized seed generation, real-time grid conflict detection, hint budget allocations based on difficulty level, and mobile touch optimization.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm sm:text-base text-[#eae1db]">
                        Interactive Personal Portfolio Website
                      </h3>
                      <span className="font-mono-tech text-[11px] text-[#f2c08d] cv-accent">2026</span>
                    </div>
                    <p className="text-xs text-[#d4c4b7]/90 leading-relaxed cv-text-muted">
                      Designed and developed a dark editorial personal website featuring interactive mini-games, dynamic music recommendations, custom animations, and clean CV preview and export options.
                    </p>
                  </div>
                </div>
              </div>

              {/* Languages & Interests */}
              <div className="space-y-3 pt-2">
                <h2 className="font-mono-tech text-xs uppercase tracking-widest text-[#f2c08d] font-bold border-b border-white/10 pb-1.5 cv-accent cv-border">
                  04 // LANGUAGES & ADDITIONAL INTERESTS
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d4c4b7]/90 font-mono-tech cv-text-muted">
                  <div>
                    <span className="text-[#eae1db] font-bold block mb-1">Languages Spoken:</span>
                    <p>English (Fluent), Hindi (Fluent), Bengali (Native)</p>
                  </div>
                  <div>
                    <span className="text-[#eae1db] font-bold block mb-1">Creative & Tech Hobbies:</span>
                    <p>Video Editing (DaVinci Resolve), Open Source AI, Game Engine Mechanics</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
