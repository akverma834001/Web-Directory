import { useEffect, useState, useRef } from 'react';

export const BackgroundEffect = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        if (!isHovering) setIsHovering(true);
      });
    };

    const handlePointerLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [isHovering]);

  return (
    <div 
      aria-hidden="true" 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Realistic Tactile Material Grain / Paper Texture */}
      <div 
        className="absolute inset-0 opacity-[0.032] dark:opacity-[0.045] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/assets/noise.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* 2. Soft Natural Overhead Atmospheric Ambient Light (Realistic studio falloff, zero neon blobs) */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1300px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.12) 0%, rgba(148, 163, 184, 0.05) 50%, transparent 75%)'
        }}
      />

      {/* 3. Ultra-Subtle Architectural Drafting Grid (Faint, natural, non-distracting) */}
      <div className="absolute inset-0 engineering-grid mask-radial-vignette opacity-60 dark:opacity-35" />

      {/* 4. Natural Soft Ambient Reflection (Follows cursor like subtle physical light bouncing off matte paper/slate) */}
      <div
        className="absolute rounded-full pointer-events-none transition-opacity duration-300 blur-[110px]"
        style={{
          width: '420px',
          height: '420px',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.28 : 0,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(16, 185, 129, 0.03) 40%, transparent 70%)'
        }}
      />

      {/* 5. Realistic Edge Perimeter Vignette (Creates tangible physical depth) */}
      <div 
        className="absolute inset-0 pointer-events-none hidden dark:block opacity-40"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 60%, rgba(6, 9, 14, 0.7) 100%)'
        }}
      />
    </div>
  );
};
