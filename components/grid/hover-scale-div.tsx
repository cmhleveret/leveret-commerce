'use client';
import { motion, useAnimation } from 'framer-motion';
import { RefObject, useEffect, useRef, useState } from 'react';

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [initialPoint, setInitialPoint] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handlePointerEnter = ({ clientX, clientY }: MouseEvent) => {
      setInitialPoint({
        x: clientX - element.offsetLeft - element.offsetWidth / 2,
        y: clientY - element.offsetTop - element.offsetHeight / 2
      });
      setHasEntered(true);
    };

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      if (!hasEntered) return;
      const element = ref.current!;

      const x = clientX - element.offsetLeft - element.offsetWidth / 2;
      const y = clientY - element.offsetTop - element.offsetHeight / 2;
      setPoint({ x, y });
    };

    const handlePointerLeave = () => {
      setHasEntered(false);
    };

    element.addEventListener('pointerenter', handlePointerEnter);
    window.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerenter', handlePointerEnter);
      element.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [ref, hasEntered]);

  return { point, initialPoint };
}

const HoverScaleDiv = () => {
  const ref = useRef(null);
  const controls = useAnimation(); // Using animation controls from Framer Motion
  const { point, initialPoint } = useFollowPointer(ref);

  const deltaY = point.y - initialPoint.y;
  const threshold = 20; // Set the threshold for deltaY

  useEffect(() => {
    if (Math.abs(deltaY) >= threshold) {
      // If deltaY is within the threshold, animate back to the original scale
      controls.start({ scale: 1 });
    } else {
      // Else, apply the dynamic scale
      const dynamicScale = Math.min(1, 1 - deltaY / 100);
      controls.start({ scale: Math.max(dynamicScale, 0.5) });
    }
  }, [deltaY, controls]);

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-start bg-red-200 p-4 align-middle">
      <motion.div className="your-div-class h-full w-full bg-violet-500" animate={controls}>
        Delta Y: {deltaY}
        Hover over me!
      </motion.div>
    </div>
  );
};

export default HoverScaleDiv;
