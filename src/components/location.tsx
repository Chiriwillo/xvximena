'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Church, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Location() {
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

  const ceremonyLocation = {
    name: "Santa María Reyna",
    address: "Tlaxcalteca 575, Col. Unidad Modelo",
    mapLink: "https://maps.app.goo.gl/2eR94Qgn2DGCf6ip8",
    time: "7:00 PM"
  };

  const receptionLocation = {
    name: "Casino Romano",
    address: "Av. Aztlán #7301, Col. Valle de Santa Lucía",
    mapLink: "https://maps.app.goo.gl/47uA6sF7SdgFCQ6cA",
    time: "8:00 PM"
  };

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Card className={cn(
        "text-center shadow-lg transition-all duration-700 ease-out transform hover:scale-105",
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      )}>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/20 rounded-full">
              <Church className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-headline text-foreground">Ceremonia Religiosa</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{ceremonyLocation.name}</p>
          <p className="text-lg text-muted-foreground">{ceremonyLocation.address}</p>
          <p className="text-lg text-muted-foreground font-bold mt-2">{ceremonyLocation.time}</p>
          <Button asChild variant="link" className="mt-4 text-primary">
            <a href={ceremonyLocation.mapLink} target="_blank" rel="noopener noreferrer">Ver en Mapa</a>
          </Button>
        </CardContent>
      </Card>
      
      <Card className={cn(
        "text-center shadow-lg transition-all duration-700 ease-out transform hover:scale-105",
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      )} style={{ transitionDelay: '200ms' }}>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/20 rounded-full">
              <PartyPopper className="w-10 h-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-headline text-foreground">Recepción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{receptionLocation.name}</p>
          <p className="text-lg text-muted-foreground">{receptionLocation.address}</p>
          <p className="text-lg text-muted-foreground font-bold mt-2">{receptionLocation.time}</p>
          <Button asChild variant="link" className="mt-4 text-primary">
            <a href={receptionLocation.mapLink} target="_blank" rel="noopener noreferrer">Ver en Mapa</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
