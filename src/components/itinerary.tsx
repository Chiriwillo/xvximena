'use client';

import { Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const itineraryItems = [
  { time: '7:00 PM', event: 'Misa' },
  { time: '8:00 PM', event: 'Recepción' },
  { time: '8:30 PM', event: 'Presentación' },
  { time: '9:30 PM', event: 'Cena' },
  { time: '10:00 PM', event: 'Baile' },
];

const ItineraryItem = ({ item, index, isVisible }: { item: { time: string; event: string }, index: number, isVisible: boolean }) => {
  const isEven = index % 2 === 0;
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex items-center w-full max-w-md">
        {isEven ? (
          <div className="w-5/12">
            <div
              className={`text-right transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <p className="font-headline text-3xl text-primary">{item.event}</p>
              <p className="text-lg text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ) : <div className="w-5/12"></div>}

        <div className="relative w-2/12 flex justify-center">
          <div className="h-full w-0.5 bg-primary/20 absolute"></div>
          <div
            className={`z-10 bg-background transition-all duration-500 ease-in-out ${isVisible ? 'scale-100' : 'scale-0'}`}
            style={{ transitionDelay: `${index * 150 + 100}ms` }}
          >
            <div className="p-2 bg-primary rounded-full text-primary-foreground shadow-lg">
              <Heart className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        {!isEven ? (
          <div className="w-5/12">
            <div
              className={`text-left transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <p className="font-headline text-3xl text-primary">{item.event}</p>
              <p className="text-lg text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ) : <div className="w-5/12"></div>}
      </div>
    </div>
  );
};


export function Itinerary() {
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

  return (
    <div ref={ref} className="relative container mx-auto py-12">
      <div className="flex flex-col items-center space-y-4">
        {itineraryItems.map((item, index) => (
          <ItineraryItem key={index} item={item} index={index} isVisible={isVisible} />
        ))}
      </div>
    </div>
  );
}
