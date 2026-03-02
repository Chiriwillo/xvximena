'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function VideoPlayer() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Asegúrate de que este nombre de archivo coincida con el video que subiste a la carpeta `public`
  const videoSrc = "/0302.mp4";

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto transition-all duration-700 ease-out",
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      )}
    >
      <div className="p-1">
        <div className="flex aspect-video items-center justify-center rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-background shadow-lg">
          <video
            src={videoSrc}
            controls
            className="w-full h-full object-contain"
            preload="metadata"
          >
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    </div>
  );
}
