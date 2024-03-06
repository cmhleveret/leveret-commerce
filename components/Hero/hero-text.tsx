'use client';

import { useStore } from 'app/store/store';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroText = () => {
  const ln1 = 'L EV E R E T'.split(' ');
  const ln2 = 'Scroll, You might find something you like'.split(' ');
  const [, setMode] = useState('Digital Art'.split(' '));
  const store = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      store.open ? setMode('Digital Art'.split(' ')) : setMode('Physical Art'.split(' '));
    };

    fetchProducts();
  }, [store.open]);

  return (
    // <div className="">
    //     <p className="font-semibold font-geist-mono text-[10vh] leading-[10vh]">L EV E R E T</p>
    //     <p className="font-thin font-geist-sans text-[10vh] leading-[10vh]">Digital Art</p>
    // </div>
    <div className="App flex h-screen w-screen flex-col items-center justify-center align-middle">
      <view className="topLeftEdge bg-red-200"></view>
      <p className="font-geist-mono pl-4 text-[8vw] font-thin  leading-[10vh] md:text-[5vw]">
        {ln1.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i / 10
            }}
            key={i}
          >
            {el}{' '}
          </motion.span>
        ))}
      </p>

      <p className="font-geist-mono pl-4 text-[4vw] font-thin  leading-[10vh] md:text-[5vw]">
        {ln2.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: i / 10
            }}
            key={i}
          >
            {el}{' '}
          </motion.span>
        ))}
      </p>
      {/* <p className="absolute bottom-[10vh] left-0 font-thin font-geist-mono text-[10vh] leading-[10vh]">
                {mode.map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: i / 50
                        }}
                        key={i}
                    >
                        {el}{" "}

                    </motion.span>
                ))}
            </p> */}
    </div>
  );
};

export default HeroText;
