'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper, Sparkles, Ban, Gift } from 'lucide-react';
import { Countdown } from '@/components/countdown';
import { Gallery } from '@/components/gallery';
import { Location } from '@/components/location';
import { Hero } from '@/components/hero';
import { Itinerary } from '@/components/itinerary';
import dynamic from 'next/dynamic';
import type { MusicPlayerHandle } from '@/components/music-player';
import { FloralDecor } from '@/components/floral-decor';
import { DiamondRain } from '@/components/diamond-rain';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';

const MusicPlayer = dynamic(
  () => import('@/components/music-player').then((mod) => mod.MusicPlayer),
  { ssr: false }
);

export default function Home() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  useEffect(() => {
    setIsClient(true);
    // Prevent scrolling when invitation is closed
    if (!isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isInvitationOpen]);
  
  const handleOpenInvitation = async () => {
    setIsInvitationOpen(true);
    // Let the music player handle its own loading state.
    musicPlayerRef.current?.play();
  };

  const eventDate = new Date('2026-03-27T19:00:00');
  const whatsappNumber = "8110118894";
  const rsvpMessage = "Hola! Confirmo mi asistencia a los XV de Ximena Sugey. Gracias!";

  if (!isClient) {
    return (
      <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center">
        {/* Optional: Add a loading spinner here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-800 font-body relative">
      <Hero onOpen={handleOpenInvitation} isOpen={isInvitationOpen} />
      
      <div className={`transition-opacity duration-1000 ease-in-out ${isInvitationOpen ? 'opacity-100' : 'opacity-0'}`}>
        {isInvitationOpen && (
          <>
            <FloralDecor />
            <DiamondRain />
          </>
        )}
        <MusicPlayer ref={musicPlayerRef} />
        
        <main>
          <header className="text-center py-16 px-4 bg-secondary/50">
            <h1 className="font-headline text-6xl md:text-8xl text-primary">Ximena Sugey García Arciba</h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              "Tengo el honor de invitarlos a celebrar mis XV años."
            </p>
          </header>

          <section id="countdown" className="py-16 px-4 bg-secondary/50">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-headline text-primary mb-2">27 de Marzo 2026</h2>
              <p className="text-lg text-muted-foreground mb-8">Falta poco para el gran día...</p>
              <Countdown targetDate={eventDate} />
            </div>
          </section>

          <AnimatedSection asChild>
            <section id="details" className="py-16 px-4 bg-secondary/50">
              <div className="container mx-auto text-center">
                <h2 className="text-4xl font-headline text-primary mb-8">Con la bendición de mis padres</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-headline text-primary">Mamá</h3>
                    <p className="text-xl text-muted-foreground">Sra. Lizeth Arciba Cabello</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-headline text-primary">Papá</h3>
                    <p className="text-xl text-muted-foreground">Sr. Sergio Arnold García Hernández</p>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <section id="location" className="py-16 px-4 bg-secondary/50">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-headline text-primary mb-8">Lugar y Hora</h2>
              <Location />
            </div>
          </section>

          <section id="itinerary" className="py-16 px-4 bg-secondary/50">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-headline text-primary mb-8">Itinerario</h2>
              <Itinerary />
            </div>
          </section>

          <section id="gallery" className="py-16 px-4 bg-secondary/50">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-headline text-primary mb-8">Nuestros Recuerdos</h2>
              <Gallery />
            </div>
          </section>

          <AnimatedSection asChild animation="zoom-in">
            <section id="dress-code" className="py-16 px-4 bg-secondary/50">
              <div className="container mx-auto text-center flex flex-col items-center">
                <h2 className="text-4xl font-headline text-primary mb-4">Código de Vestimenta</h2>
                <p className="text-xl text-muted-foreground mb-6">Formal</p>
                <div className="flex items-center space-x-2 text-destructive mt-2 mb-8 p-3 bg-destructive/10 rounded-lg">
                  <Ban size={20} />
                  <p className="text-sm font-medium">Se les invita cordialmente a no vestir de color azul rey.</p>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection asChild animation="zoom-in">
            <section id="gift" className="py-16 px-4 bg-secondary/50">
              <div className="container mx-auto text-center">
                <h2 className="text-4xl font-headline text-primary mb-8">Regalo</h2>
                <Card className="max-w-xl mx-auto bg-background/50 shadow-lg p-6 md:p-8">
                  <CardContent className="flex flex-col items-center space-y-4 text-foreground text-center p-0">
                    <Gift size={60} className="text-primary mb-4" />
                    <p className="text-xl text-muted-foreground">
                      Tu presencia es mi mejor regalo, pero si deseas obsequiarme algo más, puedes hacerlo a través de una
                    </p>
                    <h3 className="font-headline text-6xl text-primary mt-2">¡Lluvia de Sobres!</h3>
                    <p className="text-lg text-muted-foreground max-w-md mt-4">
                      Una forma tradicional y apreciada de dar un regalo en efectivo en un sobre el día del evento.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </AnimatedSection>
          
          <AnimatedSection asChild>
            <footer className="py-16 px-4 text-center bg-secondary/50">
              <Sparkles size={60} className="mx-auto text-primary mb-4" />
              <h2 className="font-headline text-5xl text-primary mb-8">¡Te esperamos!</h2>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rsvpMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Confirmar por WhatsApp
                </a>
              </Button>
            </footer>
          </AnimatedSection>
        </main>
      </div>
    </div>
  );
}
