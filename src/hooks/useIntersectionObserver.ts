import { useEffect, useRef, MutableRefObject } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
): MutableRefObject<(HTMLElement | null)[]> => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const { onIntersect, ...observerOptions } = options;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const animationClass = element.dataset.animation || "";
        if (entry.isIntersecting) {
          element.classList.add(
            animationClass,
            "animate-once",
            "animate-ease-in-out"
          );
          if (onIntersect) {
            onIntersect(entry);
          }
        }
      });
    }, observerOptions);

    elementsRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elementsRef.current.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [options, onIntersect]);

  return elementsRef;
};
