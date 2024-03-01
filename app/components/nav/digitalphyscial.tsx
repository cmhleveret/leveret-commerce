'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const DigitalPhyscial = () => {
  const [isOn, setIsOn] = useState(false);
  const [animateScale, setAnimateScale] = useState(false);
  const { setTheme } = useTheme();

  const toggleSwitch = () => {
    setAnimateScale(true);

    setTimeout(() => {
      setIsOn(!isOn);
    }, 400);
  };

  useEffect(() => {
    let timerId: string | number | NodeJS.Timeout | undefined;
    if (animateScale) {
      // Set isOn to false after 500 milliseconds
      timerId = setTimeout(() => {
        setAnimateScale(false);
      }, 800);
    }

    isOn ? setTheme('light') : setTheme('dark');

    // Cleanup function to clear the timer
    return () => clearTimeout(timerId);
  }, [animateScale, isOn, setTheme]);

  const switchAnimation = {
    scale: animateScale ? 0.8 : 1, // Scale down when isOn, and back to normal size otherwise
    transition: { type: 'spring', stiffness: 1000, damping: 100 }
  };

  return (
    // <button className="flex h-[50px] w-[200px] flex-row rounded-sm">
    //     <div className="font-notmal flex h-full w-1/2 flex-col justify-center rounded-bl-sm rounded-tl-sm bg-primary text-center align-middle text-xs text-secondary">
    //         DIGITAL
    //     </div>
    //     <div className="flex h-full w-1/2 flex-col justify-center rounded-br-sm rounded-tr-sm bg-secondary text-center align-middle text-xs font-normal text-primary">
    //         PHYSICAL
    //     </div>
    //     {/* <div className="w-[120px] h-[50px] text-center text-black text-xs font-normal bg-primary py-4 rounded-md">TOGGLE</div> */}
    // </button>

    <div
      className={`m-0 box-border flex h-[40px] w-[200px] items-center justify-center p-0 md:h-[50px]`}
    >
      <div className="text-center font-sans">
        <div
          className={`flex h-[40px] w-[200px] bg-white bg-opacity-40 md:h-[50px] ${
            isOn ? 'justify-end' : 'justify-start'
          } cursor-pointer rounded-sm p-1`}
          data-ison={isOn}
          onClick={toggleSwitch}
        >
          <motion.div
            className="font-notmal flex h-full w-1/2 flex-col justify-center rounded-sm bg-primary text-center align-middle text-xs text-secondary"
            layout
            animate={switchAnimation}
            transition={{ type: 'spring', stiffness: 1000, damping: 100 }}
          >
            {isOn ? 'PHYSICAL' : 'DIGITAL'}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPhyscial;
