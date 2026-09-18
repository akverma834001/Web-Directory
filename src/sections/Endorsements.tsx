import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MessageSquarePlus, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Users2,
  Lock
} from 'lucide-react';
import { fetchEndorsements } from '../utils/endorsementsApi';
import type { Endorsement } from '../types';

interface EndorsementsProps {
  onOpenModal: () => void;
  newEndorsement: Endorsement | null;
}

export const Endorsements: React.FC<EndorsementsProps> = ({ onOpenModal, newEndorsement }) => {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEndorsements().then(data => {
      setEndorsements(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (newEndorsement) {
      setEndorsements(prev => [newEndorsement, ...prev.filter(e => e.id !== newEndorsement.id)]);
    }
  }, [newEndorsement]);

  return (
    <section id="endorsements" className="py-16 sm:py-20 border-t-2 border-slate-300 dark:border-slate-800/90 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading & Verification CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>08 // Verified Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Endorsements & Recommendations
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Authentic notes and reviews from hackathon teammates, college peers, and mentors. Each review is strictly verified via dual OTP (Gmail & Phone).
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenModal}
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-all flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Note / Review</span>
            </button>
          </div>
        </div>

        {/* Community Note */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Spam-protected: Submissions are verified via Gmail & mobile confirmation to keep recommendations authentic.</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Peer Notes</span>
          </div>
        </div>

        {/* Endorsements Grid or Empty State */}
        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-slate-400">
            Loading peer reviews...
          </div>
        ) : endorsements.length === 0 ? (
          <div className="p-6 sm:p-12 text-center space-y-4 max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                No Reviews Posted Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
                No sample views are shown. If you've worked with Abhishek on a project, hackathon, or at university, be the first to share your thoughts!
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenModal}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-sm"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write the First Review</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endorsements.map((item) => (
              <div
                key={item.id}
                className="solid-frame p-4 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-emerald-500 dark:hover:border-emerald-500/80 transition-all"
              >
                <div className="space-y-4">
                  {/* Card Top: Avatar, Name, Stars */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        {item.avatarInitial}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                          {item.name}
                        </h3>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {item.role} • {item.organization}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>
                  </div>

                  {/* Relationship Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    <Users2 className="w-3 h-3 text-emerald-500" />
                    <span>{item.relationship}</span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal italic">
                    "{item.comment}"
                  </p>
                </div>

                {/* Card Footer: Solid Verification Badges & Date */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      ✓ Gmail ({item.verifiedEmail})
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                      ✓ Mobile ({item.verifiedPhone})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{item.verifiedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
