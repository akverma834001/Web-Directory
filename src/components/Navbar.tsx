import { useState, useEffect } from 'react';
import { Sun, Moon, Search, FileDown, Menu, X } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar = ({
  theme,
  toggleTheme,
  onOpenCommandPalette,
  onOpenResume,
  activeSection
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'endorsements', label: 'Reviews' },
    { id: 'query', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a 
          href="#hero"
          className="group flex items-center gap-2.5 text-slate-900 dark:text-white font-bold tracking-tight text-sm sm:text-base font-sans"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-emerald-500/50 shadow-sm transition-transform group-hover:scale-105 shrink-0 bg-slate-100 dark:bg-slate-800">
            <img 
              src="/assets/abhishek-avatar.jpg" 
              alt={personalProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-mono text-sm tracking-tight font-bold">{personalProfile.displayName}</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Search / Command Palette trigger */}
          <button
            id="cmd-palette-btn"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette"
            title="Command Palette (Cmd/Ctrl + K)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.2 rounded">Ctrl K</kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {/* Resume View CTA */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 min-w-[42px] min-h-[42px] flex items-center justify-center md:hidden rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3.5 py-2.5 min-h-[40px] flex items-center rounded-lg text-xs font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold border border-emerald-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex items-center gap-2 text-xs text-slate-500 font-mono py-2 px-2 min-h-[40px]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Command Palette</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
