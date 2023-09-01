import React from 'react';

const useIntersectionObserver = (triggerOnTarget: () => void) => {
  const [inView, setInView] = React.useState(false);
  const observerRef = React.useRef(null);

  const intersectionCallback = React.useCallback(
    (entries: any[]) => {
      if (entries[0].isIntersecting) {
        if (!inView) {
          triggerOnTarget();
          setInView(true);
        }
      } else {
        if (inView) {
          setInView(false);
        }
      }
    },
    [inView, setInView, triggerOnTarget],
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, {
      threshold: 1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, intersectionCallback]);

  return {observerRef};
};

export default useIntersectionObserver;
