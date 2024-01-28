'use client';
import Lenis from '@studio-freight/lenis';
import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const SmoothScroll = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return children;
};

export default SmoothScroll;
