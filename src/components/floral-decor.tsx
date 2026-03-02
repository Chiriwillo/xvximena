'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const FlowerBranch = ({ className }: { className?: string }) => (
    <svg viewBox="-20 -20 240 240" className={cn("w-56 h-56", className)}>
        <path d="M100,0 A100,100 0 0,0 100,200" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="30" r="6" fill="currentColor" />
        <circle cx="70" cy="65" r="8" fill="currentColor" />
        <circle cx="100" cy="100" r="6" fill="currentColor" />
        <circle cx="70" cy="135" r="9" fill="currentColor" />
        <circle cx="100" cy="170" r="7" fill="currentColor" />
    </svg>
)

export function FloralDecor() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
        // Set max scroll based on the full document height
        setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial calculation after a short delay for layout to settle
    const timeoutId = setTimeout(handleResize, 100);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getOpacity = (start: number, end: number) => {
    // Return 0 if not mounted or maxScroll is not calculated yet to prevent flash of content
    if (!isMounted || !maxScroll) return 0;

    const scrollPercent = scrollY / maxScroll;
    
    if (scrollPercent < start) return 0;
    if (scrollPercent > end) return 1;
    // Linear interpolation for opacity
    return (scrollPercent - start) / (end - start);
  };

  return (
    <div className="pointer-events-none">
      {/* Top-Left Decoration */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500"
        style={{ opacity: getOpacity(0.05, 0.25) }}
      >
        <FlowerBranch className="text-primary/20 transform rotate-[135deg]" />
      </div>

      {/* Bottom-Right Decoration */}
      <div
        className="fixed bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-40 transition-opacity duration-500"
        style={{ opacity: getOpacity(0.2, 0.5) }}
      >
        <FlowerBranch className="text-muted-foreground/20 transform -rotate-[45deg]" />
      </div>

       {/* Bottom-Left Decoration */}
      <div
        className="fixed bottom-0 left-0 -translate-x-1/2 translate-y-1/2 z-40 transition-opacity duration-500"
        style={{ opacity: getOpacity(0.5, 0.8) }}
      >
        <FlowerBranch className="text-primary/30 transform rotate-[45deg]" />
      </div>

       {/* Top-Right Decoration */}
      <div
        className="fixed top-0 right-0 translate-x-1/2 -translate-y-1/2 z-40 transition-opacity duration-500"
        style={{ opacity: getOpacity(0.7, 1.0) }}
      >
        <FlowerBranch className="text-muted-foreground/30 transform -rotate-[135deg]" />
      </div>
    </div>
  );
}
