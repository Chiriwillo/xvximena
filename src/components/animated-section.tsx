'use client';

import { useState, useRef, useEffect, HTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type AnimatedSectionProps = HTMLAttributes<HTMLDivElement> & {
    asChild?: boolean;
    animation?: 'fade-in-up' | 'fade-in' | 'zoom-in';
    delay?: string;
    duration?: string;
    threshold?: number;
}
export function AnimatedSection({
    children,
    className,
    asChild = false,
    animation = 'fade-in-up',
    delay = '0s',
    duration = '700ms',
    threshold = 0.1,
    ...props
}: AnimatedSectionProps) {
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
        { threshold }
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
    }, [threshold]);
    
    const animationClasses = {
        'fade-in-up': 'opacity-0 translate-y-8',
        'fade-in': 'opacity-0',
        'zoom-in': 'opacity-0 scale-95'
    }

    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            ref={ref}
            className={cn(
                'transition-all ease-out',
                className,
                isVisible ? 'opacity-100 translate-y-0 scale-100' : animationClasses[animation]
            )}
            style={{
                transitionDuration: duration,
                transitionDelay: delay
            }}
            {...props}
        >
            {children}
        </Comp>
    )
}
