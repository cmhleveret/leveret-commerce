'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
// type Props = {}

const ShowReel = () => {
  const scene = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ['start end', 'end start']
  });

  const zoomInThresholdStart = 0.2; // Start zooming in immediately
  const zoomInThresholdEnd = 0.3; // End zooming in at 25% of the scroll
  const zoomOutThresholdStart = 0.32; // Start zooming out at 75% of the scroll
  const zoomOutThresholdEnd = 0.35; // End zooming out at the end of the scroll

  // Adjust stiffness and damping for a smoother animation effect
  const springSettings = { stiffness: 200, damping: 30, restDelta: 0.001 };
  const springWidth = useSpring(scrollYProgress, springSettings);

  // Zoom in and out transformation logic
  const width = useTransform(
    springWidth,
    [zoomInThresholdStart, zoomInThresholdEnd, zoomOutThresholdStart, zoomOutThresholdEnd],
    ['70%', '90%', '90%', '80%'] // Adjust these values based on how you want the zoom effect to look
  );

  // const springWidth = useSpring(scrollYProgress, {
  //   stiffness: 200,
  //   damping: 30,
  //   restDelta: 0.001
  // });

  // const width = useTransform(springWidth, [0.25, 0.3], ['0%', '90%']);

  // const width = useTransform(w, [0, someOtherNumberYouPick], ['0%', '100%'])
  const scrollRef = useRef(null);

  useEffect(() => {
    console.log(width);
    console.log(scrollYProgress);
  }, [width, scrollYProgress]);

  return (
    <div className="relative flex h-full max-h-full w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-transparent px-4 align-middle">
      <motion.div
        className="absolute flex h-full w-full flex-col justify-center align-middle"
        style={{ width }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: scrollRef }}
      >
        <AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-lg bg-transparent">
          <Image
            src="/Images/brickRemaster.jpg"
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </motion.div>
    </div>
  );
};

export default ShowReel;
