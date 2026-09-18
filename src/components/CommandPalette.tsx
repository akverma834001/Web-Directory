import { useState, useEffect, useRef, type ReactNode } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sun, 
  Moon, 
  FileText, 
  Mail, 
  Briefcase, 
  Layers, 
  Award, 
  Sparkles, 
  HelpCircle,
  Home,
  UserCheck,
  MessageSquareQuote,
  X
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { personalProfile } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  theme: 'dark' | 'light';
  onShowToast: (msg: string) => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Action' | 'External';
  icon: ReactNode;
  action: () => void;
}

export const CommandPalette = ({
  isOpen,
  onClose,
  toggleTheme,
  theme,
  onShowToast,
  onOpenResume
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Go to Home',
      category: 'Navigation',
      icon: <Home className="w-4 h-4" />,
      action: () => scrollTo('hero')
    },
    {
      id: 'nav-about',
      title: 'Go to About Me & Academics',
      category: 'Navigation',
      icon: <UserCheck className="w-4 h-4" />,
      action: () => scrollTo('about')
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience & Internships',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => scrollTo('experience')
    },
    {
      id: 'nav-projects',
      title: 'Go to Engineering Projects',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4" />,
      action: () => scrollTo('projects')
    },
    {
      id: 'nav-skills',
      title: 'Go to Technical Skills',
      category: 'Navigation',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => scrollTo('skills')
    },
    {
      id: 'nav-achievements',
      title: 'Go to Achievements & SIH 2024',
      category: 'Navigation',
      icon: <Award className="w-4 h-4" />,
      action: () => scrollTo('achievements')
    },
    {
      id: 'nav-certifications',
      title: 'Go to Certifications',
      category: 'Navigation',
      icon: <FileText className="w-4 h-4" />,
      action: () => scrollTo('certifications')
    },
    {
      id: 'nav-endorsements',
      title: 'Go to Peer Endorsements & Reviews',
      category: 'Navigation',
      icon: <MessageSquareQuote className="w-4 h-4" />,
      action: () => scrollTo('endorsements')
    },
    {
      id: 'nav-query',
      title: 'Raise a Query / Contact Me',
      category: 'Navigation',
      icon: <HelpCircle className="w-4 h-4" />,
      action: () => scrollTo('query')
    },
    {
      id: 'act-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Action',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'act-view-resume',
      title: 'View Resume (In-Page Preview)',
      category: 'Action',
      icon: <FileText className="w-4 h-4 text-emerald-500" />,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: 'act-resume',
      title: 'Download Resume (PDF)',
      category: 'Action',
      icon: <FileText className="w-4 h-4 text-slate-400" />,
      action: () => {
        window.open('/assets/Abhishek_Kumar_Verma_Resume.pdf', '_blank');
        onClose();
      }
    },
    {
      id: 'act-copy-email',
      title: `Copy Email (${personalProfile.email})`,
      category: 'Action',
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        navigator.clipboard.writeText(personalProfile.email);
        onShowToast('Email copied to clipboard!');
        onClose();
      }
    },
    {
      id: 'ext-github',
      title: 'Open GitHub Profile',
      category: 'External',
      icon: <GithubIcon className="w-4 h-4" />,
      action: () => {
        window.open(personalProfile.github, '_blank');
        onClose();
      }
    },
    {
      id: 'ext-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: <LinkedinIcon className="w-4 h-4" />,
      action: () => {
        window.open(personalProfile.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent
          const btn = document.getElementById('cmd-palette-btn');
          btn?.click();
        }
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 p-0"
            aria-label="Command palette input"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="sm:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {cmd.icon}
                    </span>
                    <span className="font-medium">{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {cmd.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>•</span>
            <span>↵ Select</span>
          </div>
          <span>Cmd / Ctrl + K</span>
        </div>
      </div>
    </div>
  );
};
