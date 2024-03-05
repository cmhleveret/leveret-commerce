'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import HeroText from 'components/Hero/hero-text';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { BarLoader } from 'react-spinners';
// type Props = {}

const mainVideo =
  'https://sgfqovigj7dc5gcw.public.blob.vercel-storage.com/timeline-noaudio-dqwYOsv9uXj78ODHOpxaIGnW3dZqaN.mov';
const ShowReel = () => {
  const scene = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoParentRef = useRef<HTMLDivElement>(null);
  // const [videoProgress, setVideoProgress] = useState(0);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [shouldUseImage, setShouldUseImage] = useState(false);

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

  const widthMobile = useTransform(
    springWidth,
    [zoomInThresholdStart, zoomInThresholdEnd, zoomOutThresholdStart, zoomOutThresholdEnd],
    ['70%', '100%', '100%', '80%'] // Adjust these values based on how you want the zoom effect to look
  );

  // UseEffect hook to listen for window resize and update isSmallDevice
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    // Check once on component mount
    checkDeviceSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // useEffect(() => {
  //   if (videoParentRef.current) {
  //     const player: HTMLVideoElement = videoParentRef.current.children[0] as HTMLVideoElement;

  //     if (player) {
  //       // Now that player is correctly typed as HTMLVideoElement, you can safely access video-specific properties.
  //       player.controls = false;
  //       player.playsInline = true;
  //       player.muted = true;
  //       player.setAttribute('muted', '');
  //       player.autoplay = true;

  //       setTimeout(() => {
  //         const promise = player.play();
  //         if (promise && promise.then) {
  //           promise
  //             .then(() => { })
  //             .catch(() => {
  //               videoParentRef.current!.style.display = 'none';
  //               setShouldUseImage(true);
  //             });
  //         }
  //       }, 0);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (videoParentRef.current) {
      const player: HTMLVideoElement = videoParentRef.current.children[0] as HTMLVideoElement;

      if (player) {
        player.controls = false;
        player.playsInline = true;
        player.muted = true;
        player.setAttribute('muted', '');
        player.autoplay = true;

        // Function to update video progress
        const updateProgress = () => {
          // const progress = (player.currentTime / player.duration) * 100;
          // setVideoProgress(progress);
        };

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

        // Add timeupdate event listener to update progress
        player.addEventListener('timeupdate', updateProgress);

        // Cleanup function to remove event listener
        return () => player.removeEventListener('timeupdate', updateProgress);
      }
    }
  }, []);

  return (
    // <div className="relative flex h-full max-h-full w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-transparent px-4 align-middle">
    <div className="relative h-[200vh] w-full ">
      <div className="align-start absolute left-0 top-0 flex flex-row items-center justify-start pl-10">
        <HeroText />
      </div>
      {/* <div className='absolute bottom-0 left-0 flex flex-row align-start justify-start items-center pl-10'>
          <HeroText/>
        </div> */}

      <div className="sticky top-0 flex h-[100vh] w-full flex-col items-center justify-between overflow-hidden rounded-lg bg-transparent px-0 align-middle ">
        {isSmallDevice ? (
          <div className="absolute flex h-[100vh] w-[80vh] rotate-90 flex-row items-center justify-center  align-middle ">
            <motion.div
              className="flex h-full w-full flex-col justify-center align-middle  "
              style={{ width: widthMobile }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ root: scrollRef }}
            >
              <AspectRatio
                ratio={16 / 9}
                className="h-full overflow-hidden rounded-lg border-2 border-primary bg-primary"
              >
                {shouldUseImage ? (
                  <img src={mainVideo} alt="Muted Video" />
                ) : (
                  <div className="relative h-full w-full">
                    {/* <div
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
                    /> */}

                    <ReactPlayer
                      url={mainVideo}
                      controls
                      playing
                      width="100%"
                      height="100%"
                      config={{
                        file: {
                          attributes: {
                            preload: 'none'
                          },
                          hlsOptions: {
                            enableWorker: true,
                            lowLatencyMode: true
                            // Additional HLS.js options here
                          }
                          // Specify DASH options if using DASH
                        }
                      }}
                    />

                    <div className="absolute left-0 top-0 z-[-1] flex h-full w-full flex-col items-center justify-center align-middle">
                      <BarLoader color="#747474" />
                    </div>
                  </div>
                )}
              </AspectRatio>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="absolute flex h-full w-full flex-col justify-center align-middle "
            style={{ width }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: scrollRef }}
          >
            <AspectRatio
              ratio={16 / 9}
              className="w-full rotate-90 overflow-hidden rounded-lg bg-primary md:rotate-0"
            >
              {shouldUseImage ? (
                <>
                  <img src={mainVideo} alt="Muted Video" />
                </>
              ) : (
                <div className="relative h-full w-full">
                  {/* <div className='w-full h-full absolute top-0 left-0 flex flex-col align-middle justify-center items-center bg-red-300 z-100'>
                    <div className='w-1/2 bg-red-800'>
                      <Progress value={videoProgress} />
                    </div>
                  </div> */}
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
                  <div className="absolute left-0 top-0 z-[-1] flex h-full w-full flex-col items-center justify-center align-middle">
                    <BarLoader color="#747474" />
                  </div>
                </div>
              )}
            </AspectRatio>
          </motion.div>
        )}

        {/* <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center mix-blend-difference">
          <span className='text-white text-6xl font-extrabold'>Your Text Here</span>
        </div> */}
      </div>
    </div>
  );
};

export default ShowReel;
