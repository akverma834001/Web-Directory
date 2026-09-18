import { Award, Calendar, CheckCircle, ExternalLink } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export const Certifications = () => {
  return (
    <section id="certifications" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
            06 // Certifications
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Verified Credentials & Accreditations
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Specialized training in algorithms, AI foundations, Databricks SQL, and cybersecurity simulations.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface shadow-sm hover:border-emerald-500/40 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {cert.issuer}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </div>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">ID on file</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
