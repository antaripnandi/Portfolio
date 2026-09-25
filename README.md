# Antarip Nandi — Portfolio

Personal developer portfolio showcasing work in AI systems, student productivity tooling, and game engine modding. Built with an editorial dark aesthetic, smooth inertia scrolling, and micro-interactions.

## Tech Stack

- **Framework:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS v4, custom grain & cursor shaders
- **Animation & Motion:** Motion (`motion/react`)
- **Scroll Physics:** Lenis smooth vertical inertia scroll
- **Icons & Fonts:** Lucide React, Google Fonts (*Anton*, *Inter*, *JetBrains Mono*, *IBM Plex Mono*)
- **Analytics & Hosting:** Vercel Analytics, deployed on Vercel

## Key Sections & Features

- **Hero & Editorial Splash:** Branded intro animation with location, specialization, and quick navigation.
- **Projects Showcase:**
  - **Sakido:** Unified student academic portal featuring 2-way Google Calendar synchronization, hourly timetables, and distraction-free study video playback.
  - **Minecraft Modding Suite:** Custom Fabric and Forge mods built in Java (F3 Advance, VeinMiner, Ender Chest Extender, Barrel Extender) with 4,000+ community downloads.
  - **OpenClaw & Research:** Sandboxed multi-agent orchestration architecture over JSON-RPC.
- **Interactive Resume / CV:** Monospace-styled modal detailing education (SRM B.Tech CSE AI/ML), hands-on technical skills, and projects, formatted for direct print/PDF export.
- **Music & Interests:** Curated rotating tracklist with direct Spotify links, along with personal pursuits across chess (1500–1600 ELO), fitness, and video editing (DaVinci Resolve).

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/antaripnandi/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in the root directory if configuring server-side Gemini integration:

```env
GEMINI_API_KEY="your_api_key_here"
```

### Development

Start the local Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Build & Production

```bash
# Type-check
npm run lint

# Compile production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```text
portfolio/
├── public/              # Static assets & favicon
├── src/
│   ├── components/      # UI components (Hero, Navbar, Work, ResumeModal, etc.)
│   ├── data/            # Portfolio metadata, project list, music tracks
│   ├── types.ts         # TypeScript interfaces
│   ├── App.tsx          # Root layout & scroll management
│   ├── main.tsx         # React root entry
│   └── index.css        # Global CSS & typography definitions
├── .env.example         # Example environment configuration
├── vite.config.ts       # Vite + Tailwind v4 configuration
└── package.json
```

## License

Personal project of [Antarip Nandi](https://github.com/antaripnandi). All rights reserved.
