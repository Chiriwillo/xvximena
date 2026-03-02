'use client';

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';
import { Music, Pause, Loader2 } from 'lucide-react';

export type MusicPlayerHandle = {
  play: () => void;
};

type MusicPlayerProps = {};

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const player = useRef<Tone.Player | null>(null);

  // Serve the audio file locally from the `public` directory to avoid CORS issues.
  const audioUrl = "/Photograph.mp3";

  // This function creates, loads, and starts the player.
  // It's designed to be called by a user gesture.
  const initAndPlay = () => {
    // Avoid re-initializing if it's already there or loading
    if (player.current || isLoading) {
      // If it exists but is paused, just play it
      if (player.current && player.current.loaded && !isPlaying) {
        togglePlay();
      }
      return;
    }

    // Must be started by a user gesture.
    Tone.start().then(() => {
      setIsLoading(true);
      player.current = new Tone.Player({
        url: audioUrl,
        loop: true,
        autostart: true, // Let it start as soon as it's loaded
        onload: () => {
          setIsLoading(false);
          setIsPlaying(true);
        },
        onerror: (error) => {
          console.error(`could not load url: ${audioUrl}. Ensure the file exists in the /public directory.`, error);
          setIsLoading(false);
          // Dispose of the failed player so we can try again
          player.current?.dispose();
          player.current = null;
        },
      }).toDestination();
    }).catch(error => {
      console.error("Failed to start audio context:", error);
      setIsLoading(false);
    });
  }

  // Expose a 'play' method to be called from the parent component
  useImperativeHandle(ref, () => ({
    play: () => {
      // This is the main entry point from the "Open Invitation" button.
      initAndPlay();
    },
  }));

  // Cleanup on unmount
  useEffect(() => {
    const p = player.current;
    return () => {
      p?.dispose();
    };
  }, []);

  // Function to toggle play/pause via the button
  const togglePlay = () => {
    // If player is not created yet, create and play it.
    if (!player.current) {
        initAndPlay();
        return;
    }
    
    // If player is created but not loaded, do nothing (wait for onload).
    if (!player.current.loaded) return;
    
    if (isPlaying) {
      player.current.stop();
      setIsPlaying(false);
    } else {
      player.current.start();
      setIsPlaying(true);
    }
  };
  
  let buttonIcon;
  if(isLoading) {
    buttonIcon = <Loader2 className="h-6 w-6 animate-spin" />;
  } else if (isPlaying) {
    buttonIcon = <Pause className="h-6 w-6" />;
  } else {
    buttonIcon = <Music className="h-6 w-6" />;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        onClick={togglePlay}
        size="icon"
        variant="outline"
        className="rounded-full w-14 h-14 bg-background/80 backdrop-blur-sm border-primary/50 text-primary shadow-lg hover:bg-primary/10"
        disabled={isLoading}
      >
        {buttonIcon}
        <span className="sr-only">{isLoading ? 'Loading music...' : isPlaying ? 'Pause music' : 'Play music'}</span>
      </Button>
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
