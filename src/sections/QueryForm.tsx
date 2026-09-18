import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactQuery, type QueryFormData } from '../utils/contactApi';
import { personalProfile } from '../data/portfolioData';

interface QueryFormProps {
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const QueryForm = ({ onShowToast }: QueryFormProps) => {
  const [formData, setFormData] = useState<QueryFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Client validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage("Please enter a subject.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setErrorMessage("Query / message must be at least 10 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await submitContactQuery(formData);
      if (response.success) {
        setSubmitted(true);
        onShowToast("Message sent successfully. Thanks for reaching out!", 'success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          honeypot: '',
        });
      } else {
        setErrorMessage(response.message || "Something went wrong. Please try again or email me directly.");
        onShowToast("Submission failed. Please check the form.", 'error');
      }
    } catch (err: any) {
      setErrorMessage("Network error. Please try again or email me directly.");
      onShowToast("Network error. Please try again.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="query" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase font-bold">
            09 // Direct Communication
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Raise a Direct Query
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Have an internship opening, software project collaboration, or technical question? Submit a query and I'll respond directly to your email.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-surface p-4 sm:p-10 shadow-sm transition-colors">
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Message sent successfully.
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thanks for reaching out! Your message was delivered to {personalProfile.email} with your reply-to address preserved. I'll get back to you as soon as possible.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Anti-spam Honeypot (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="bot_field">Leave this field blank</label>
                <input
                  type="text"
                  id="bot_field"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div 
                  role="alert"
                  className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-sans"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. priya@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-sans"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineering Opportunity / Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-sans"
                  />
                </div>

                {/* Optional Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Phone Number <span className="text-slate-400 text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91-XXXXX XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Query / Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  Query / Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about your project, query, or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-sans"
                />
              </div>

              {/* Submit Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Direct recipient: <span className="text-slate-800 dark:text-slate-200 font-medium">{personalProfile.email}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Query</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
