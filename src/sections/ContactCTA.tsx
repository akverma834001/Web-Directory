import { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons/SocialIcons';
import { personalProfile } from '../data/portfolioData';

interface ContactCTAProps {
  onShowToast: (msg: string) => void;
}

export const ContactCTA = ({ onShowToast }: ContactCTAProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalProfile.email);
    setCopiedEmail(true);
    onShowToast("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="space-y-3">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
            09 // Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Have a project, opportunity, or question?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            I'm always open to discussing software projects, internships, collaborations, technical ideas and interesting problems.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${personalProfile.email}`}
            className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 shadow-sm transition-opacity inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Email Abhishek</span>
          </a>

          <button
            onClick={copyEmail}
            className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Copied!' : 'Copy Email Address'}</span>
          </button>

          <a
            href={personalProfile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={personalProfile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Tasteful Phone Reveal */}
        <div className="pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          {showPhone ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>{personalProfile.phone}</span>
            </div>
          ) : (
            <button
              onClick={() => setShowPhone(true)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-4 transition-colors"
            >
              View Phone Contact for Recruiters
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
