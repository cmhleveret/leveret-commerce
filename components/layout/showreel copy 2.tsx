'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
// type Props = {}

const mainVideo =
  'https://sgfqovigj7dc5gcw.public.blob.vercel-storage.com/timeline-noaudio-dqwYOsv9uXj78ODHOpxaIGnW3dZqaN.mov';
const ShowReel = () => {
  const scene = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoParentRef = useRef<HTMLDivElement>(null);

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

  // useEffect(() => {
  //   console.log(width);
  //   console.log(scrollYProgress);
  // }, [width, scrollYProgress]);

  const [shouldUseImage, setShouldUseImage] = useState(false);
  useEffect(() => {
    if (videoParentRef.current) {
      const player: HTMLVideoElement = videoParentRef.current.children[0] as HTMLVideoElement;

      if (player) {
        // Now that player is correctly typed as HTMLVideoElement, you can safely access video-specific properties.
        player.controls = false;
        player.playsInline = true;
        player.muted = true;
        player.setAttribute('muted', '');
        player.autoplay = true;

        setTimeout(() => {
          const promise = player.play();
          if (promise && promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                videoParentRef.current!.style.display = 'none';
                setShouldUseImage(true);
              });
          }
        }, 0);
      }
    }
  }, []);

  return (
    // <div className="relative flex h-full max-h-full w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-transparent px-4 align-middle">
    <div className="relative h-[200vh] w-full">
      <div className="relatop-0 sticky flex h-[100vh] w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-orange-300 bg-transparent px-4 align-middle">
        <motion.div
          className="absolute flex h-full w-full flex-col justify-center bg-red-200 align-middle"
          style={{ width }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
        >
          <AspectRatio
            ratio={16 / 9}
            className="w-full rotate-90 overflow-hidden rounded-lg bg-transparent md:rotate-0 "
          >
            {shouldUseImage ? (
              <img src={mainVideo} alt="Muted Video" />
            ) : (
              <div
                ref={videoParentRef}
                dangerouslySetInnerHTML={{
                  __html: `
                  <video
                    loop
                    muted
                    autoplay
                    playsinline
                    preload="metadata"
                  >
                  <source src="${mainVideo}" type="video/mp4" />
                  </video>`
                }}
              />
            )}
          </AspectRatio>
        </motion.div>
        {/* <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center mix-blend-difference">
          <span className='text-white text-6xl font-extrabold'>Your Text Here</span>
        </div> */}
      </div>
    </div>
  );
};

export default ShowReel;
