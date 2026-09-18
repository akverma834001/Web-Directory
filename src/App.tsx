import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CommandPalette } from './components/CommandPalette';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { QuickStats } from './sections/QuickStats';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Achievements } from './sections/Achievements';
import { Certifications } from './sections/Certifications';
import { Community } from './sections/Community';
import { Endorsements } from './sections/Endorsements';
import { QueryForm } from './sections/QueryForm';
import { ContactCTA } from './sections/ContactCTA';
import { EndorsementModal } from './components/EndorsementModal';
import { BackgroundEffect } from './components/BackgroundEffect';

import type { Project, Endorsement } from './types';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [endorsementModalOpen, setEndorsementModalOpen] = useState(false);
  const [latestEndorsement, setLatestEndorsement] = useState<Endorsement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const sectionIds = ['hero', 'about', 'experience', 'projects', 'skills', 'achievements', 'certifications', 'community', 'endorsements', 'query'];
  const activeSection = useScrollSpy(sectionIds, 150);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const openResume = () => setResumeModalOpen(true);

  return (
    <div className="relative min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-200 selection:bg-emerald-500/20">
      {/* Precision Developer Cursor */}
      <CustomCursor />

      {/* Dynamic Architectural Grid & Ambient Light Background */}
      <BackgroundEffect />

      {/* Scroll Reading Bar */}
      <ScrollProgress />

      {/* Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={openResume}
        activeSection={activeSection}
      />

      {/* Main Content Sections in strict specified order */}
      <main className="relative z-10 flex-grow">
        {/* HERO */}
        <Hero onShowToast={showToast} onOpenResume={openResume} />

        {/* ABOUT */}
        <About />

        {/* ENGINEERING PROFILE / QUICK STATS */}
        <QuickStats />

        {/* EXPERIENCE */}
        <Experience />

        {/* PROJECTS */}
        <Projects onSelectProject={setSelectedProject} />

        {/* SKILLS */}
        <Skills />

        {/* ACHIEVEMENTS */}
        <Achievements />

        {/* CERTIFICATIONS */}
        <Certifications />

        {/* COMMUNITY */}
        <Community />

        {/* PUBLIC VERIFIED ENDORSEMENTS */}
        <Endorsements
          onOpenModal={() => setEndorsementModalOpen(true)}
          newEndorsement={latestEndorsement}
        />

        {/* RAISE A QUERY */}
        <QueryForm onShowToast={showToast} />

        {/* CONTACT CTA */}
        <ContactCTA onShowToast={showToast} />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* In-Page Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Verified Endorsement Modal */}
      <EndorsementModal
        isOpen={endorsementModalOpen}
        onClose={() => setEndorsementModalOpen(false)}
        onEndorsementAdded={(newEndorsement) => {
          setLatestEndorsement(newEndorsement);
        }}
        onShowToast={showToast}
      />

      {/* Command Palette (Cmd/Ctrl + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        toggleTheme={toggleTheme}
        theme={theme}
        onShowToast={showToast}
        onOpenResume={openResume}
      />

      {/* Notification Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
