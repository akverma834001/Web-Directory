import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  Lock, 
  Star,
  Sparkles
} from 'lucide-react';
import { 
  sendVerificationOtp, 
  confirmVerificationOtp, 
  submitVerifiedEndorsement 
} from '../utils/endorsementsApi';
import type { Endorsement } from '../types';

interface EndorsementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndorsementAdded: (newEndorsement: Endorsement) => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

type Step = 'IDENTITY' | 'OTP_CHALLENGE' | 'COMPOSE' | 'SUCCESS';

export const EndorsementModal: React.FC<EndorsementModalProps> = ({
  isOpen,
  onClose,
  onEndorsementAdded,
  onShowToast
}) => {
  const [step, setStep] = useState<Step>('IDENTITY');

  // Step 1 Form
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [relationship, setRelationship] = useState('Project Collaborator');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 OTP
  const [sessionId, setSessionId] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [devHint, setDevHint] = useState<{ emailOtp: string; phoneOtp: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(600);

  // Step 3 Review
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [verificationTicket, setVerificationTicket] = useState('');

  // State flags
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if (step === 'OTP_CHALLENGE' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  if (!isOpen) return null;

  // Step 1: Send OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) return setErrorMsg('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) return setErrorMsg('Please enter a valid Gmail / email address.');
    if (!phone.trim() || phone.trim().length < 10) return setErrorMsg('Please enter a valid 10-digit mobile number.');

    setLoading(true);
    try {
      const res = await sendVerificationOtp(name, email, phone);
      if (res.success && res.sessionId) {
        setSessionId(res.sessionId);
        setDevHint(res.devHint || null);
        setTimeLeft(res.expiresInSeconds || 600);
        setStep('OTP_CHALLENGE');
        onShowToast('Verification OTPs sent to your Gmail and Phone!', 'success');
      } else {
        setErrorMsg(res.message || 'Failed to initiate verification.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Confirm OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!emailOtp.trim() || emailOtp.trim().length !== 6) {
      return setErrorMsg('Please enter the 6-digit Gmail verification code.');
    }
    if (!phoneOtp.trim() || phoneOtp.trim().length !== 6) {
      return setErrorMsg('Please enter the 6-digit Mobile verification code.');
    }

    setLoading(true);
    try {
      const res = await confirmVerificationOtp(sessionId, emailOtp, phoneOtp);
      if (res.success && res.verificationTicket) {
        setVerificationTicket(res.verificationTicket);
        setStep('COMPOSE');
        onShowToast('Gmail & Mobile verified successfully!', 'success');
      } else {
        setErrorMsg(res.message || 'Verification failed. Please check the codes.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Submit Endorsement
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!comment.trim() || comment.trim().length < 15) {
      return setErrorMsg('Please write an endorsement of at least 15 characters.');
    }

    setLoading(true);
    try {
      const res = await submitVerifiedEndorsement(verificationTicket, {
        role: role.trim() || 'Software Engineer',
        organization: organization.trim() || 'Tech Collaborator',
        relationship: relationship.trim(),
        comment: comment.trim(),
        rating
      });

      if (res.success && res.endorsement) {
        onEndorsementAdded(res.endorsement);
        setStep('SUCCESS');
        onShowToast('Your verified endorsement is now published live!', 'success');
      } else {
        setErrorMsg(res.message || 'Failed to publish review. Verification ticket may have expired.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('IDENTITY');
    setName('');
    setRole('');
    setOrganization('');
    setEmail('');
    setPhone('');
    setEmailOtp('');
    setPhoneOtp('');
    setComment('');
    setVerificationTicket('');
    onClose();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="endorsement-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92dvh] flex flex-col bg-white dark:bg-dark-surface border-2 border-slate-300 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 mr-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 id="endorsement-modal-title" className="text-xs sm:text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                Verified Peer Endorsement
              </h2>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                Strict 2-Step Gmail & Mobile Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps Header */}
        <div className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-100/70 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] sm:text-xs font-mono shrink-0">
          <div className={`flex items-center gap-1.5 ${step === 'IDENTITY' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
            <span>1. Identity</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step === 'OTP_CHALLENGE' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
            <span>2. Strict OTP</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <div className={`flex items-center gap-1.5 ${step === 'COMPOSE' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-400'}`}>
            <span>3. Review</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto space-y-5 sm:space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: IDENTITY */}
          {step === 'IDENTITY' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-mono">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  Anti-Impersonation & Authenticity Protocol
                </div>
                <p>
                  To ensure all reviews on Abhishek's portfolio are genuine, you must verify your Gmail and Mobile Number with a 6-digit one-time passcode (OTP) before posting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sanya Malhotra"
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Your Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Backend Engineer / Tech Lead"
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Company / College <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Sarala Birla University / Tech Corp"
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  >
                    <option value="Hackathon Teammate">Hackathon Teammate (SIH / Regional)</option>
                    <option value="Project Collaborator">Project Collaborator / Open Source</option>
                    <option value="Internship Colleague / Mentor">Internship Colleague / Mentor</option>
                    <option value="GDG / Student Community Peer">GDG / Student Community Peer</option>
                    <option value="Recruiter / Hiring Manager">Recruiter / Hiring Manager</option>
                    <option value="Academic Faculty / Guide">Academic Faculty / Guide</option>
                  </select>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" />
                    Gmail / Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sanya@gmail.com"
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    Mobile Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91-XXXXXXXXXX"
                    className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating Secure OTPs...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification OTPs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP CHALLENGE */}
          {step === 'OTP_CHALLENGE' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Verify Contact Details
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                    Expires in: <strong className="text-slate-900 dark:text-white">{formatTimer(timeLeft)}</strong>
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Two 6-digit confirmation codes were sent: one to <strong>{email}</strong> and one to <strong>{phone}</strong> to prevent spam.
                </p>
                {devHint && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/60 dark:border-slate-800/80">
                    <span>Testing environment simulation active</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailOtp(devHint.emailOtp);
                        setPhoneOtp(devHint.phoneOtp);
                      }}
                      className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                    >
                      Fill demo codes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Gmail OTP */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-500" />
                    Gmail 6-Digit OTP <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 847291"
                    className="w-full text-center tracking-widest text-lg font-mono font-bold px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center">
                    Check your inbox or spam
                  </p>
                </div>

                {/* Mobile Phone OTP */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    Mobile Phone 6-Digit OTP <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={phoneOtp}
                    onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 592810"
                    className="w-full text-center tracking-widest text-lg font-mono font-bold px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400 font-mono text-center">
                    Sent via verification SMS
                  </p>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('IDENTITY')}
                  className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  ← Edit Contact Info
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Validating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify Credentials &amp; Proceed</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: COMPOSE ENDORSEMENT */}
          {step === 'COMPOSE' && (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Verified Badge Header */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Identity: <strong>{name}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20">Gmail ✓</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20">Mobile ✓</span>
                </div>
              </div>

              {/* Rating Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  Rating / Endorsement Level
                </label>
                <div className="flex items-center gap-2">
                  {[5, 4, 3].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-colors ${
                        rating === val
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${rating >= val ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                      <span>{val} / 5 Stars</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment / Endorsement */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  Your Views &amp; Perspective on Abhishek <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details regarding your technical collaboration, problem solving experience, or project work with Abhishek..."
                  className="w-full px-3.5 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg text-xs font-mono font-medium bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm transition-colors flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing Review...</span>
                    </>
                  ) : (
                    <>
                      <span>Publish Verified Endorsement</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* SUCCESS */}
          {step === 'SUCCESS' && (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Endorsement Published Successfully!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>! Your views have been verified and added to the public wall with your verified credentials badge.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 text-xs font-mono font-medium rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                >
                  Close &amp; View Wall
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
