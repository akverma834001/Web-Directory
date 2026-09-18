import { Code2, Cpu, Cloud, Users } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export const Skills = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2': return <Code2 className="w-4 h-4 text-emerald-500" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-emerald-500" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-emerald-500" />;
      case 'Users': return <Users className="w-4 h-4 text-emerald-500" />;
      default: return <Code2 className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
            04 // Skills & Technologies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Technical Arsenal
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            The programming languages, frameworks, databases, and developer tools I use regularly to build software.
          </p>
        </div>

        {/* Categorized Skills Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((group) => (
            <div
              key={group.category}
              className="p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  {getIcon(group.iconName)}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  {group.category}
                </h3>
              </div>

              {/* Tag Badges (No fake % bars) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/40 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
