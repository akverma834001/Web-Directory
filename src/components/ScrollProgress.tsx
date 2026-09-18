import { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className="h-full bg-emerald-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(16,185,129,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
