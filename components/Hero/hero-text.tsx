'use client';

import { useStore } from 'app/store/store';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type HeroTextProps = {
  initialVisibility: boolean;
};

const HeroText = ({ initialVisibility }: HeroTextProps) => {
  const ln1 = 'L EV E R E T'.split(' ');
  const ln2 = 'Digital Art'.split(' ');
  const [, setMode] = useState('Digital Art'.split(' '));
  const store = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      store.open ? setMode('Digital Art'.split(' ')) : setMode('Physical Art'.split(' '));
    };

    fetchProducts();
  }, [store.open]);

  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="noPointerEvents absolute z-[50] h-full">
      <AnimatePresence>
        {isVisible && (
          <motion.div className="App flex h-full w-screen flex-col items-center justify-center align-middle ">
            <p className="font-geist-mono pl-4 text-[8vw] leading-[10vh] text-secondary md:text-[5vw]">
              {ln1.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0, fontWeight: 100 }}
                  animate={{ opacity: 1, fontWeight: 600 }}
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
            <p className="font-geist-mono pl-4 text-[4vw] font-thin leading-[2vh] text-secondary md:text-[2vw]">
              {ln2.map((el, i) => (
                <motion.span key={i}>{el} </motion.span>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroText;
