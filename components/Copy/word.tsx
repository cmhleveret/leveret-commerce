'use client';

import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type WordsProps = {
  paragraph: string;
};

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  range: [start: number, end: number];
};

const Words = ({ paragraph }: WordsProps) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.75', 'start 0.25']
    //this means when the intersection of the target i.e the paragrapg comes into view the scrollY progress will inceease
  });

  const words = paragraph.split(' ');
  return (
    <div className="flex h-full w-full flex-row items-center justify-center align-middle">
      <span
        className="flex max-w-[1280px] flex-wrap items-center justify-center p-[40px] align-middle text-[100px] font-extrabold leading-[100px] text-white"
        ref={element}
      >
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={index} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </span>
    </div>
  );
};

// const Word = ({ children, range, progress }: WordProps) => {
//     //here we animate each word - we will need to stagger this animation
//     const opacity = useTransform(progress, range, [0, 1])
//     return (
//         <span className='word mr-[12px] mt-[12px] relative'>
//             <span className='shadow absolute opacity-10'>{children}</span>
//             <motion.span
//                 style={{ opacity: opacity }}>
//                 {children}
//             </motion.span>
//         </span>
//     )
// }

const Word = ({ children, range, progress }: WordProps) => {
  // Adjust the calculation of opacity so that it reflects the desired behavior
  // Only the word within the current scroll progress range should have full opacity
  const isActive = useTransform(progress, [0, range[0], range[1], 1], [0, 0, 1, 0]);

  // Optionally, apply a smoother transition or a different effect when a word becomes active/inactive
  const opacity = useTransform(isActive, [0, 1], [0.1, 1]); // Adjust these values based on your preference

  return (
    <span className="word relative mr-[12px] mt-[12px]">
      <span className="absolute opacity-10 shadow">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export default Words;
