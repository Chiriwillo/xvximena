'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

type RainElement = {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
};

const rainCount = 30;

export function DiamondRain() {
  const [elements, setElements] = useState<RainElement[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const generateElements = () => {
      return Array.from({ length: rainCount }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        size: Math.random() * 0.5 + 0.25, // size between 0.25rem and 0.75rem
        duration: `${Math.random() * 5 + 8}s`, // duration between 8s and 13s
        delay: `${Math.random() * 10}s`,
      }));
    };
    setElements(generateElements());
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((el) => (
        <Heart
          key={el.id}
          className="absolute top-0 -translate-y-full animate-fall text-red-500/70 fill-current"
          style={{
            left: el.left,
            width: `${el.size}rem`,
            height: `${el.size}rem`,
            animationDuration: el.duration,
            animationDelay: el.delay,
          }}
        />
      ))}
    </div>
  );
}
