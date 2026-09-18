import { useState } from 'react';
import { GraduationCap, BookOpen, Check } from 'lucide-react';
import { personalProfile, educationData } from '../data/portfolioData';

export const About = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>(educationData.coursework[0].name);

  const activeCourseData = educationData.coursework.find(c => c.name === selectedCourse) || educationData.coursework[0];

  return (
    <section id="about" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Heading */}
        <div className="space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
            01 // Profile & Background
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            About Me
          </h2>
        </div>

        {/* Grid: Story on Left, Academic Timeline & Coursework on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <p>
                {personalProfile.bioNarrative}
              </p>
              <p>
                Whether it is engineering automated data processing pipelines in Python, optimizing enterprise REST endpoints with SQL databases, or deploying machine learning evaluation systems, I prioritize robust system design, clean API contracts, and high reliability over superficial complexity.
              </p>
            </div>

            {/* Academic Card */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {educationData.degree}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {educationData.institution} • {educationData.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <span>Timeline: {educationData.duration}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  GPA: {educationData.gpa} / 10.0
                </span>
              </div>
            </div>
          </div>

          {/* Coursework & Technical Foundation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Foundational CS Coursework</span>
            </div>

            {/* Course Selector Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {educationData.coursework.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCourse(c.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    selectedCourse === c.name
                      ? 'bg-emerald-600 text-white font-medium shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Course Concept Explorer */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {activeCourseData.name}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  {activeCourseData.code}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core theoretical principles and software paradigms mastered:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeCourseData.concepts.map((concept, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
