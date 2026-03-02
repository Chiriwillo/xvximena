'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type TimeUnitProps = {
  value: number;
  label: string;
  isVisible: boolean;
  delay: string;
};

const TimeUnit = ({ value, label, isVisible, delay }: TimeUnitProps) => (
  <div 
    className={cn(
      "flex flex-col items-center justify-center bg-secondary/70 rounded-2xl p-4 md:p-8 w-24 h-24 md:w-32 md:h-32 shadow-lg transition-all duration-500 ease-out transform hover:scale-105",
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    )}
    style={{ transitionDelay: delay }}
  >
    <span className="text-4xl md:text-6xl font-bold text-primary">{value}</span>
    <span className="text-base md:text-lg text-muted-foreground uppercase tracking-wider">{label}</span>
  </div>
);

type CountdownProps = {
  targetDate: Date;
};

export function Countdown({ targetDate }: CountdownProps) {
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

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set initial value on client mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div ref={ref} className="flex justify-center gap-2 md:gap-4 lg:gap-8">
      <TimeUnit value={timeLeft.days} label="Días" isVisible={isVisible} delay="0ms" />
      <TimeUnit value={timeLeft.hours} label="Horas" isVisible={isVisible} delay="100ms" />
      <TimeUnit value={timeLeft.minutes} label="Minutos" isVisible={isVisible} delay="200ms" />
      <TimeUnit value={timeLeft.seconds} label="Segundos" isVisible={isVisible} delay="300ms" />
    </div>
  );
}
