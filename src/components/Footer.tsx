import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';
import { personalProfile } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-dark-bg/60 py-12 font-sans transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                AV
              </span>
              <span className="font-bold tracking-tight text-slate-900 dark:text-white font-mono text-sm uppercase">
                {personalProfile.displayName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              Software Engineer • CSE Student • Builder • Ranchi, India
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <a
              href={personalProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalProfile.email}`}
              className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Email Abhishek"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div>
            © 2026 {personalProfile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with React & TypeScript</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400">Restrained Engineering Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
