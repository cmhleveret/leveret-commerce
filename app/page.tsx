import PhoneCollisions from 'components/3D/phone-collisions';
import HeroText from 'components/Hero/hero-text';
import { ResponsiveThreeItems } from 'components/grid/responsive-three-items-test';
import ResponsiveFooter from 'components/layout/responsive-footer';
import { ResponsiveCarousel } from 'components/responsive-carousel';
import SmoothScroll from 'components/smoothScroll/smooth-scroll';
import { Suspense } from 'react';

export const runtime = 'edge';

// const paragraph = 'DIGITAL ART';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <SmoothScroll>
        <div className="relative flex h-[75vh] w-full flex-col items-center justify-center pt-10 align-middle md:h-[90vh] md:pt-0">
          <HeroText initialVisibility={false} />
          <PhoneCollisions initialVisibility={false} />
        </div>
        <Suspense>
          <div className="flex flex-col justify-around gap-10 pt-[5vh] align-middle">
            <ResponsiveCarousel />
            <ResponsiveThreeItems />
          </div>
          <Suspense>
            <ResponsiveFooter />
          </Suspense>
        </Suspense>
      </SmoothScroll>
    </>
  );
}
