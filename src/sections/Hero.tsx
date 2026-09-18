import { ArrowDown, Mail, FileDown, MapPin, GitBranch } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/icons/SocialIcons';
import { personalProfile, educationData } from '../data/portfolioData';
import { StatusBadge } from '../components/StatusBadge';
import { TerminalSnippet } from '../components/TerminalSnippet';

interface HeroProps {
  onShowToast: (msg: string) => void;
  onOpenResume: () => void;
}

export const Hero = ({ onShowToast, onOpenResume }: HeroProps) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalProfile.email);
    onShowToast(`Copied ${personalProfile.email} to clipboard!`);
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Column: Core Positioning & Identity */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status & Availability Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <StatusBadge statusText="OPEN FOR OPPORTUNITIES" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>{personalProfile.location}</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
                <GitBranch className="w-3.5 h-3.5 text-cyan-500" />
                <span>SIH '24 Finalist</span>
              </div>
            </div>

            {/* Profile Avatar + Highlighted Name Row */}
            <div className="flex items-center gap-4 sm:gap-5 pt-1">
              {/* Photo Frame */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-500/80 shadow-lg dark:shadow-[0_0_24px_rgba(16,185,129,0.25)] bg-slate-100 dark:bg-slate-900 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/assets/abhishek-verma.jpg"
                    alt={personalProfile.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/abhishek-avatar.jpg';
                    }}
                  />
                </div>

                {/* Live Verified Engineering Badge */}
                <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-bold border-2 border-white dark:border-dark-bg flex items-center gap-1 shadow-md select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Highlighted Name & Role */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">
                  <span>👋 Hi, I am</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                    {personalProfile.name}
                  </span>
                </h1>
                <div className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">
                  {personalProfile.roleTitle} • {educationData.institution}
                </div>
              </div>
            </div>

            {/* Main Positioning Headline */}
            <div className="space-y-2.5 pt-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                Building practical software with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 font-extrabold">
                  code, data & AI.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                {personalProfile.bioHeadline}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-colors flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('query')}
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Let's Connect
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 inline-flex items-center gap-2 transition-colors"
              >
                <FileDown className="w-4 h-4 text-emerald-500" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Developer Channels (Verified) */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <a
                href={personalProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span>{personalProfile.githubHandle}</span>
              </a>

              <a
                href={personalProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span>{personalProfile.linkedinHandle}</span>
              </a>

              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                <span>{personalProfile.email}</span>
              </button>
            </div>
          </div>

          {/* Hero Right Column: Developer Terminal & Solid System HUD */}
          <div className="lg:col-span-5 w-full space-y-4">
            {/* Solid System Diagnostics HUD */}
            <div className="solid-hud p-3.5 border-2 border-slate-300 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
                  Engineering Workstation
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">● ONLINE</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="space-y-0.5">
                  <span className="text-slate-400">Core Runtime</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">React 19 • Vite 8 • TS</div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400">Backend / Cloud</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">FastAPI • Node • Firebase</div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400">AI / ML Focus</span>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">TF-IDF • Gemini • Vision</div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400">Security Grade</span>
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400">Dual-OTP Verified</div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal */}
            <TerminalSnippet />
          </div>
        </div>
      </div>
    </section>
  );
};
