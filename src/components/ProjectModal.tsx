import { useEffect } from 'react';
import { X, ExternalLink, Layers, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { GithubIcon } from './icons/SocialIcons';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4 sm:pb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {project.date}
              </span>
            </div>
            <h2 id="modal-title" className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> The Problem
            </span>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.problem}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> The Solution
            </span>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.solution}
            </p>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>System Architecture & Pipeline</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {project.architecture.overview}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {project.architecture.diagramSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs space-y-1"
              >
                <div className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  {step.step}
                </div>
                <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-sm">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span>Key Engineering Capabilities</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-emerald-500 font-bold shrink-0">›</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Technologies Applied
          </span>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Repository</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <GithubIcon className="w-3.5 h-3.5 opacity-60" />
              <span>Repository coming soon</span>
            </div>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Live Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
