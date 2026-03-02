'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart } from 'lucide-react';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

type HeroProps = {
  onOpen: () => void;
  isOpen: boolean;
};

export function Hero({ onOpen, isOpen }: HeroProps) {
  const strokeDasharray = 2000;

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-1000 ease-in-out ${isOpen ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100'}`}
      aria-hidden={isOpen}
    >
      <div className="relative w-full h-full bg-gradient-to-b from-primary/20 to-background">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-top"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center text-white p-4">
          <div className="w-full max-w-4xl animate-fade-in-down">
            <svg viewBox="0 0 1200 200" className="w-full">
              <text
                x="50%"
                y="50%"
                dy=".35em"
                textAnchor="middle"
                className="font-headline text-[140px] text-shadow-lg animate-draw-stroke animate-fill-in"
                stroke="white"
                strokeWidth="1.5"
                fill="white"
                fillOpacity="0"
                style={{ strokeDasharray: strokeDasharray, strokeDashoffset: strokeDasharray }}
              >
                Ximena Sugey
              </text>
            </svg>
          </div>
          <p className="text-2xl md:text-4xl mt-4 animate-fade-in-up">¡Felicidades, eres uno de los afortunados!</p>
          <Separator className="my-8 w-24 bg-white/50 animate-fade-in" />
          <Button
            onClick={onOpen}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform animate-bounce-slow"
          >
            <Heart className="mr-2" /> Abrir Invitación
          </Button>
        </div>
      </div>
    </div>
  );
}
