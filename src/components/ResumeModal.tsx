import { useEffect } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resumeUrl = '/assets/Abhishek_Kumar_Verma_Resume.pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] flex flex-col bg-white dark:bg-dark-surface border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 mr-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 truncate">
              <h2 id="resume-modal-title" className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                {personalProfile.name} — Resume
              </h2>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                B.Tech CSE • Sarala Birla University
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Open in new tab / full screen */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open full PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Screen</span>
            </a>

            {/* Direct Download */}
            <a
              href={resumeUrl}
              download="Abhishek_Kumar_Verma_Resume.pdf"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Download</span>
              <span className="xs:hidden">PDF</span>
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Quick Tap Banner for iOS/Android PDF Viewer */}
        <div className="sm:hidden px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-mono">
          <span className="text-[11px]">Previewing on mobile</span>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline font-semibold text-emerald-600 dark:text-emerald-400"
          >
            <span>Open PDF in App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-950/60 overflow-hidden relative">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0`}
            title="Abhishek Kumar Verma Resume"
            className="w-full h-full border-none"
          />

          {/* Mobile Fallback Overlay if browser blocks iframe preview */}
          <noscript>
            <div className="p-8 text-center space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Your browser does not support embedded PDF viewing.
              </p>
              <a
                href={resumeUrl}
                download
                className="inline-block px-4 py-2 text-xs font-medium bg-emerald-600 text-white rounded-lg"
              >
                Download Resume PDF
              </a>
            </div>
          </noscript>
        </div>
      </div>
    </div>
  );
};
