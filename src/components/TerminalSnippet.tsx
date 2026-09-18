import { useState, useRef, useEffect, type ReactNode, type FormEvent } from 'react';
import { Terminal, Copy, Check, CornerDownLeft } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

interface TerminalOutput {
  command: string;
  response: string | ReactNode;
}

export const TerminalSnippet = () => {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([
    { command: 'whoami', response: 'Abhishek Kumar Verma (B.Tech CSE @ Sarala Birla University)' },
    { command: 'location', response: 'Ranchi, India (IST / UTC+5:30)' },
    { command: 'focus', response: 'Web Development • Backend Engineering • Data & AI/ML' },
    { command: 'status', response: '● Available for software engineering internships & roles' },
  ]);
  
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let res: string | React.ReactNode = '';
    switch (cmd) {
      case 'help':
        res = 'Available commands: whoami, location, focus, status, skills, projects, contact, clear';
        break;
      case 'whoami':
        res = `${personalProfile.name} — ${personalProfile.roleTitle}`;
        break;
      case 'location':
        res = `${personalProfile.location}`;
        break;
      case 'focus':
        res = 'React • FastAPI • Python • Databases • Cloud & Vertex AI';
        break;
      case 'status':
        res = 'Open to opportunities: internships, full-time, and technical collaborations.';
        break;
      case 'skills':
        res = 'Languages: C, C++, Python, JavaScript | Tech: React.js, FastAPI, Node.js, Flask, MySQL, TensorFlow';
        break;
      case 'projects':
        res = '1. AI-Based Interview Evaluation System  2. KrishiX Precision Ag Platform  3. Umang Sports Meet';
        break;
      case 'contact':
        res = `Email: ${personalProfile.email} | Mobile: ${personalProfile.phone} | GitHub: ${personalProfile.github}`;
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        res = `command not found: "${cmd}". Type "help" for a list of commands.`;
    }

    setHistory(prev => [...prev, { command: inputVal.trim(), response: res }]);
    setInputVal('');
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const copySnippet = () => {
    const text = history.map(h => `$ ${h.command}\n${typeof h.response === 'string' ? h.response : ''}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-xl border border-slate-700/60 bg-slate-950 text-slate-200 font-mono text-xs md:text-sm shadow-2xl overflow-hidden">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="ml-2 text-slate-400 text-xs flex items-center gap-1.5 font-sans">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            abhishek@devbox:~
          </span>
        </div>
        <button
          onClick={copySnippet}
          aria-label="Copy terminal text"
          className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
          title="Copy output"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-3 max-h-72 overflow-y-auto font-mono text-slate-300">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-slate-200 font-medium">{item.command}</span>
            </div>
            <div className="text-slate-400 pl-4 border-l border-slate-800 text-xs">
              {item.response}
            </div>
          </div>
        ))}

        {/* Interactive CLI prompt */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help' or any command..."
            className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600 text-xs md:text-sm font-mono focus:ring-0 p-0"
            aria-label="Terminal input"
          />
          <button type="submit" aria-label="Run command" className="text-slate-500 hover:text-slate-300">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
};
