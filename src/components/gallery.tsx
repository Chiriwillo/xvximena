'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);
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

  const handleOpen = (image: ImagePlaceholder) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Carousel 
        ref={ref}
        className={cn(
          "w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto transition-all duration-700 ease-out", 
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        )}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {galleryImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="p-1">
                <button
                  onClick={() => handleOpen(image)}
                  className="w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-accent/50 to-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 block cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  aria-label={`Ver imagen ampliada: ${image.description}`}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={1280}
                      height={720}
                      className="w-full h-full object-contain"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent showCloseButton={false} className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-transparent border-none shadow-none flex items-center justify-center">
            {selectedImage && (
              <>
                <DialogHeader className="sr-only">
                  <DialogTitle>Imagen Ampliada</DialogTitle>
                  <DialogDescription>{selectedImage.description}</DialogDescription>
                </DialogHeader>
                <div className="relative">
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.description}
                    width={1920}
                    height={1080}
                    className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                    data-ai-hint={selectedImage.imageHint}
                  />
                   <DialogClose asChild>
                      <Button
                          variant="outline"
                          size="icon"
                          className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                          aria-label="Cerrar"
                      >
                          <X className="h-5 w-5" />
                      </Button>
                  </DialogClose>
                </div>
              </>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
