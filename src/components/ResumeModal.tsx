import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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

  const handleDownloadPdf = () => {
    // 1. First attempt native print if allowed
    try {
      window.print();
    } catch {
      // ignore fallback below
    }

    // 2. Open standalone print-friendly window with auto-print for iframe environments
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Antarip_Nandi_CV</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #111111;
      background: #ffffff;
      padding: 40px;
      max-width: 850px;
      margin: 0 auto;
      line-height: 1.5;
    }
    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      color: #000000;
    }
    .subtitle {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #d97706;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }
    .contact-bar {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 12px;
      color: #555555;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .contact-bar a { color: #111111; text-decoration: none; font-weight: 600; }
    .bio {
      font-size: 13px;
      color: #444444;
      margin-top: 12px;
      border-bottom: 1.5px solid #111111;
      padding-bottom: 14px;
    }
    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #111111;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .edu-header, .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .edu-title, .project-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #111111;
    }
    .date {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11.5px;
      font-weight: 600;
      color: #d97706;
    }
    .desc {
      font-size: 12px;
      color: #444444;
      margin-top: 3px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .skill-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      background: #f9fafb;
    }
    .skill-type {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 10.5px;
      font-weight: 700;
      color: #d97706;
      text-transform: uppercase;
    }
    .skill-val {
      font-size: 11.5px;
      color: #333333;
      margin-top: 2px;
    }
    @media print {
      body { padding: 0; max-width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; padding: 12px 16px; background: #fffbe0; border: 1px solid #fcd34d; border-radius: 8px; font-family: sans-serif; font-size: 13px; display: flex; justify-content: space-between; align-items: center;">
    <span>📄 <strong>Print & PDF Mode:</strong> Select <strong>"Save as PDF"</strong> in your browser's print menu to save this CV as a PDF file.</span>
    <button onclick="window.print()" style="padding: 6px 14px; background: #111; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Save as PDF</button>
  </div>

  <div>
    <h1>ANTARIP NANDI</h1>
    <div class="subtitle">AI Systems & Software Engineer</div>
    <div class="contact-bar">
      <span>📍 Siliguri / Chennai, India</span>
      <span>✉️ <a href="mailto:bantarip4@gmail.com">bantarip4@gmail.com</a></span>
      <span>💻 <a href="https://github.com/antaripnandi" target="_blank">github.com/antaripnandi</a></span>
    </div>
    <div class="bio">
      First-year Computer Science undergraduate student specializing in Artificial Intelligence and Machine Learning. Passionate about building high-performance AI agent frameworks, interactive web engines, low-level solvers, and creative gameplay mechanics.
    </div>
  </div>

  <div class="section-title">01 // EDUCATION</div>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <div>
      <div class="edu-header">
        <div class="edu-title">Don Bosco School, Siliguri</div>
        <div class="date">2012 – 2024 | Siliguri, India</div>
      </div>
      <div class="desc">Primary & Secondary Education (Kindergarten to Class X) — ICSE Board</div>
    </div>
    <div>
      <div class="edu-header">
        <div class="edu-title">Birla Divya Jyoti, Siliguri</div>
        <div class="date">2024 – 2026 | Siliguri, India</div>
      </div>
      <div class="desc">Higher Secondary Education (Class XI & XII) — CBSE Board</div>
    </div>
    <div>
      <div class="edu-header">
        <div class="edu-title">SRM Institute of Science and Technology</div>
        <div class="date">2026 – 2030 | Chennai, India</div>
      </div>
      <div class="desc">Bachelor of Technology (B.Tech) in Computer Science & Engineering — Specialization in Artificial Intelligence & Machine Learning</div>
    </div>
  </div>

  <div class="section-title">02 // TECHNICAL SKILLS</div>
  <div class="skills-grid">
    <div class="skill-card">
      <div class="skill-type">Programming Languages</div>
      <div class="skill-val">Python, Java, C++, TypeScript, JavaScript, SQL (MySQL), HTML5/CSS3</div>
    </div>
    <div class="skill-card">
      <div class="skill-type">AI & Systems Design</div>
      <div class="skill-val">PyTorch, Multi-Agent Architecture, Backtracking & Constraint Solvers</div>
    </div>
    <div class="skill-card">
      <div class="skill-type">Web Technologies</div>
      <div class="skill-val">React, Node.js, Express, Tailwind CSS, Vite, RESTful APIs</div>
    </div>
    <div class="skill-card">
      <div class="skill-type">Tools & Creative Software</div>
      <div class="skill-val">Git / GitHub, Linux (Bash), Minecraft Modding API (Java), DaVinci Resolve</div>
    </div>
  </div>

  <div class="section-title">03 // FEATURED PROJECTS</div>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div>
      <div class="project-header">
        <div class="project-title">OPENCLAW — Multi-Agent AI Framework</div>
        <div class="date">2026</div>
      </div>
      <div class="desc">Engineered an autonomous multi-agent orchestration framework enabling AI agents to coordinate, parse JSON RPC task streams, and execute system commands safely in sandboxed environments.</div>
    </div>

    <div>
      <div class="project-header">
        <div class="project-title">Minecraft Modding Suite (Java)</div>
        <div class="date">2026</div>
      </div>
      <div class="desc">Architected custom Java gameplay modifications incorporating custom mob artificial intelligence, item crafting pipelines, and custom rendering shaders.</div>
    </div>

    <div>
      <div class="project-header">
        <div class="project-title">Interactive Sudoku Engine & Solver</div>
        <div class="date">2025</div>
      </div>
      <div class="desc">Created a zero-dependency web Sudoku engine featuring fast randomized seed generation, real-time grid conflict detection, hint budget allocations based on difficulty level, and mobile touch optimization.</div>
    </div>

    <div>
      <div class="project-header">
        <div class="project-title">Interactive Personal Portfolio Website</div>
        <div class="date">2026</div>
      </div>
      <div class="desc">Designed and developed a dark editorial personal website featuring interactive mini-games, dynamic music recommendations, custom animations, and clean CV preview and export options.</div>
    </div>
  </div>

  <div class="section-title">04 // LANGUAGES & ADDITIONAL INTERESTS</div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-size: 11.5px; color: #444;">
    <div>
      <strong>Languages Spoken:</strong><br>
      English (Fluent), Hindi (Fluent), Bengali (Native)
    </div>
    <div>
      <strong>Creative & Tech Hobbies:</strong><br>
      Video Editing (DaVinci Resolve), Open Source AI, Game Engine Mechanics
    </div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl, '_blank');
    if (!printWindow) {
      // Fallback download HTML file if popup is blocked
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Antarip_Nandi_CV.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
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
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  className="px-3.5 py-1.5 bg-[#f2c08d] text-[#16130f] hover:bg-[#e0b07d] rounded-lg font-mono-tech text-xs font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
                  title="Save or Download PDF"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Save as PDF</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/10 text-[#d4c4b7] hover:text-white rounded-lg font-mono-tech text-xs uppercase transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                  title="Download clean plain text CV"
                >
                  <span className="material-symbols-outlined text-sm">text_snippet</span>
                  <span className="hidden sm:inline">Text CV</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 bg-white/5 hover:bg-white/15 text-[#d4c4b7] hover:text-white rounded-lg transition cursor-pointer"
                  title="Close Modal"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>

            {/* Resume Content Body */}
            <div className="p-5 sm:p-8 md:p-10 overflow-y-auto space-y-8 text-[#eae1db] font-sans-body" id="printable-cv-area">
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
                      Engineered an autonomous multi-agent orchestration framework enabling AI agents to coordinate, parse JSON RPC task streams, and execute system commands safely in sandboxed environments.
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
