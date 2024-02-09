'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
// type Props = {}

const mainVideo =
  'https://sgfqovigj7dc5gcw.public.blob.vercel-storage.com/timeline-noaudio-dqwYOsv9uXj78ODHOpxaIGnW3dZqaN.mov';
const ShowReel = () => {
  const scene = useRef<any>(null);

  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ['start start', 'end end']
  });

  const zoomInThresholdStart = 0.1; // Start zooming in immediately
  const zoomInThresholdEnd = 0.2; // End zooming in at 25% of the scroll
  const zoomOutThresholdStart = 0.4; // Start zooming out at 75% of the scroll
  const zoomOutThresholdEnd = 0.45; // End zooming out at the end of the scroll

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

  //video url https://sgfqovigj7dc5gcw.public.blob.vercel-storage.com/Timeline1080-znfFGAPd2i8hQq5WXSavVy1yV1z8nn.mov

  return (
    // <div className="relative flex h-full max-h-full w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-transparent px-4 align-middle">
    <div className="relative h-[200vh] w-full">
      <div className="sticky top-0 flex h-[100vh] w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-transparent px-4 align-middle">
        <motion.div
          className="absolute flex h-full w-full flex-col justify-center align-middle "
          style={{ width }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
        >
          <AspectRatio ratio={16 / 9} className="w-full overflow-hidden rounded-lg bg-transparent">
            {/* <Image
              src="/Images/brickRemaster.jpg"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            /> */}
            {/* <video 
              loop
              muted
              autoPlay
              playsInline
              preload="metadata"
              style={{ width: '100%', height: 'auto' }}
              aria-label="Video player">
              <source src={'https://sgfqovigj7dc5gcw.public.blob.vercel-storage.com/timeline-noaudio-dqwYOsv9uXj78ODHOpxaIGnW3dZqaN.mov'} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}

            <div
              dangerouslySetInnerHTML={{
                __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
          style={{ width: '100%', height: 'auto' }}
        >
        <source src="${mainVideo}" type="video/mp4" />
        </video>`
              }}
            />
          </AspectRatio>
        </motion.div>
      </div>
    </div>
  );
};

export default ShowReel;
