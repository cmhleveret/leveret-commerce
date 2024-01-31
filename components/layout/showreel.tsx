'use client';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
// type Props = {}

const ShowReel = () => {
  const scene = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ['start end', 'end start']
  });

  const width = useTransform(scrollYProgress, [0.25, 0.3], ['0%', '90%']);
  // const width = useTransform(w, [0, someOtherNumberYouPick], ['0%', '100%'])
  const scrollRef = useRef(null);

  return (
    <div className="relative flex h-full max-h-full w-full flex-col items-center justify-between overflow-hidden px-4 align-middle">
      <motion.div
        className="absolute flex h-full w-full flex-col justify-center align-middle"
        style={{ width }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: scrollRef }}
      >
        <AspectRatio ratio={16 / 9} className=" w-full rounded-lg bg-muted">
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
