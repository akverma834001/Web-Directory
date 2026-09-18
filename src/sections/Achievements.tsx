import { Trophy, Calendar } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

export const Achievements = () => {
  return (
    <section id="achievements" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
            05 // Achievements
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Honors & Recognitions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            National hackathons, student exchange selections, and community contributions.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface shadow-sm hover:border-emerald-500/40 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {item.organization}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
