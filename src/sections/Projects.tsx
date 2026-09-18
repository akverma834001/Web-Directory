import { useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../components/icons/SocialIcons';
import { projectsData } from '../data/portfolioData';
import type { Project, ProjectCategory } from '../types';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects = ({ onSelectProject }: ProjectsProps) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = ['All', 'AI / ML', 'Full Stack', 'Cloud & Systems'];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
              03 // Projects
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Systems & Applications
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Selected works spanning artificial intelligence, deep learning, computer vision, precision agriculture (KrishiX), and web engineering.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-white dark:bg-dark-surface text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group solid-frame p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500/80 dark:hover:border-emerald-500/80 transition-all space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{project.category}</span>
                  <span>{project.date}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Problem Highlight Box */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-1">
                  <div className="text-[10px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400">
                    Problem Solved:
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                    {project.problem}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded">
                      Repo Soon
                    </span>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
