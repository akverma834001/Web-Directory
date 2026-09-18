import { useEffect, useState, useRef } from 'react';

type CursorMode = 'default' | 'pointer' | 'code' | 'text';

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [hoverText, setHoverText] = useState<string | null>(null);

  // Direct mouse positions (immediate)
  const dotPos = useRef({ x: -100, y: -100 });
  // Lerp positions (smooth follower)
  const ringPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handlePointerMove = (e: PointerEvent) => {
      dotPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Immediately update center dot for zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check text inputs
      if (target.closest('input, textarea')) {
        setMode('text');
        setHoverText('TYPE');
        return;
      }

      // Check code or terminal
      if (target.closest('pre, code, .terminal-window, [data-cursor="code"]')) {
        setMode('code');
        setHoverText('TERMINAL');
        return;
      }

      // Check interactive links, buttons, or clickable elements
      const clickable = target.closest('button, a, [role="button"], summary, input[type="submit"], input[type="button"], .clickable');
      if (clickable) {
        setMode('pointer');
        const text = clickable.getAttribute('data-cursor-text') || 
                     (clickable.tagName === 'A' ? 'OPEN' : 'EXEC');
        setHoverText(text);
        return;
      }

      setMode('default');
      setHoverText(null);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    // Animation frame loop for smooth trailing ring physics (LERP)
    const animate = () => {
      const lerpFactor = 0.22;
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Precision Center Dot (Zero-latency direct tracker) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-transform duration-75 ease-out ${
          clicking ? 'scale-75' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="relative flex items-center justify-center">
          {/* Glowing center laser dot */}
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
        </div>
      </div>

      {/* 2. Trailing Developer Precision Reticle (Smooth LERP Physics) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none transition-all duration-150 ease-out flex items-center justify-center ${
          clicking ? 'scale-90' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* DEFAULT MODE: Precision Crosshair Reticle with Corner Ticks */}
        {mode === 'default' && (
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Outer precision ring */}
            <div className="w-7 h-7 rounded-full border border-emerald-500/40 dark:border-emerald-400/50 bg-emerald-500/5" />
            {/* Precision crosshair axes */}
            <div className="absolute top-0 w-[1px] h-1.5 bg-emerald-500/60" />
            <div className="absolute bottom-0 w-[1px] h-1.5 bg-emerald-500/60" />
            <div className="absolute left-0 h-[1px] w-1.5 bg-emerald-500/60" />
            <div className="absolute right-0 h-[1px] w-1.5 bg-emerald-500/60" />
          </div>
        )}

        {/* POINTER / CLICKABLE MODE: Engineering Code Brackets [ • ] */}
        {mode === 'pointer' && (
          <div className="relative w-12 h-12 flex items-center justify-center animate-in fade-in zoom-in-90 duration-150">
            {/* Expanding target ring */}
            <div className="w-11 h-11 rounded-xl border border-emerald-500 dark:border-emerald-400 bg-emerald-500/10 shadow-[0_0_16px_rgba(16,185,129,0.25)] flex items-center justify-between px-1 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold select-none">
              <span>[</span>
              <span>]</span>
            </div>

            {/* Corner Bracket Reticle */}
            <span className="absolute -top-1 -left-1 font-mono text-[9px] text-emerald-500 font-bold">⌜</span>
            <span className="absolute -top-1 -right-1 font-mono text-[9px] text-emerald-500 font-bold">⌝</span>
            <span className="absolute -bottom-1 -left-1 font-mono text-[9px] text-emerald-500 font-bold">⌞</span>
            <span className="absolute -bottom-1 -right-1 font-mono text-[9px] text-emerald-500 font-bold">⌟</span>

            {/* Mini Developer Action Badge */}
            {hoverText && (
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-slate-900/90 dark:bg-slate-800/90 text-emerald-400 border border-emerald-500/30 text-[8px] font-mono tracking-wider font-semibold shadow-sm whitespace-nowrap">
                {hoverText}
              </span>
            )}
          </div>
        )}

        {/* CODE / TERMINAL MODE: Interactive Terminal Prompt Caret */}
        {mode === 'code' && (
          <div className="relative w-10 h-10 flex items-center justify-center animate-in fade-in zoom-in-90 duration-150">
            <div className="w-10 h-10 rounded-lg border border-cyan-500/60 dark:border-cyan-400 bg-cyan-500/10 shadow-[0_0_14px_rgba(6,182,212,0.3)] flex items-center justify-center font-mono text-[10px] text-cyan-500 font-bold">
              <span>&gt;_</span>
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-cyan-500/30 text-[8px] font-mono tracking-wider font-semibold whitespace-nowrap">
              CLI
            </span>
          </div>
        )}

        {/* TEXT INPUT MODE: Developer Insertion Caret [ | ] */}
        {mode === 'text' && (
          <div className="relative w-7 h-7 flex items-center justify-center animate-in fade-in duration-150">
            <div className="w-5 h-7 rounded border border-emerald-500/70 bg-emerald-500/5 flex items-center justify-center">
              <div className="w-[1.5px] h-4 bg-emerald-500 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
