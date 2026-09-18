import { Calendar, MapPin, Heart } from 'lucide-react';
import { communityData } from '../data/portfolioData';

export const Community = () => {
  return (
    <section id="community" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
            07 // Community
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Community & Campus Leadership
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Mentoring fellow students, organizing tech workshops, and contributing to regional community initiatives.
          </p>
        </div>

        {/* Community Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityData.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                    {item.role}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.organization}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                <Heart className="w-3.5 h-3.5 fill-emerald-500/20" />
                <span>Active Volunteer Contribution</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
