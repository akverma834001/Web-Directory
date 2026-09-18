import { Calendar, MapPin, Building2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const Experience = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
            02 // Experience
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Industry & Technical Experience
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Hands-on software development, database engineering, and automation in enterprise and production environments.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 sm:ml-6 space-y-12">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-10">
              {/* Timeline node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-dark-bg border-2 border-emerald-500 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>

              {/* Experience Card */}
              <div className="solid-frame p-4 sm:p-7 space-y-4 sm:space-y-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {exp.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.duration}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location} ({exp.mode})</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Responsibilities */}
                <div className="space-y-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="space-y-1">
                      <div className="text-xs font-mono font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{resp.heading}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-3.5 leading-relaxed">
                        {resp.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {exp.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
