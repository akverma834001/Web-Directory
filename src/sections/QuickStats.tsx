import React from 'react';
import { statsData } from '../data/portfolioData';

export const QuickStats: React.FC = () => {
  return (
    <section className="py-10 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="p-3.5 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-dark-surface hover:border-emerald-500/40 transition-colors space-y-1.5 shadow-sm"
            >
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {stat.index}
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {stat.subtitle}
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono pt-1">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
