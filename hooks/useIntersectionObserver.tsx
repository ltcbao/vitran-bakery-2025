import { useState, useEffect, useRef, RefObject } from 'react';

interface ObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * A custom React hook that detects when a component enters the viewport.
 * @param options - Intersection Observer options (e.g., threshold).
 * @returns A ref to attach to the element and a boolean indicating if it's in view.
 */
export const useIntersectionObserver = (
  options: ObserverOptions = { threshold: 0.1 }
): [RefObject<HTMLDivElement>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      // Update state when element is intersecting and animation hasn't triggered yet
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
        // Disconnect the observer once the element is visible
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, [ref, options, isInView]);

  return [ref, isInView];
};
