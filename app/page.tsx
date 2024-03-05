import Words from 'components/Copy/word';
import { ResponsiveThreeItems } from 'components/grid/responsive-three-items';
import ResponsiveFooter from 'components/layout/responsive-footer';
import ShowReel from 'components/layout/showreel-new';
import { ResponsiveCarousel } from 'components/responsive-carousel';
import SmoothScroll from 'components/smoothScroll/smooth-scroll';
import { Suspense } from 'react';

export const runtime = 'edge';

const paragraph = 'DIGITAL ART';

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
        {/* <Suspense fallback={<VideoSkeleton />}> first frame of video or holder image*/}
        {/* <div className='flex flex-row align-start justify-start items-center pl-10'>
          <HeroText />
        </div> */}
        <Suspense fallback={<p>Loading video...</p>}>
          <ShowReel />
          {/* <HoverScaleDiv/> */}
        </Suspense>
        <div className="mb-[60px] flex h-[30vh] w-full flex-col items-center justify-center overflow-hidden align-middle">
          <Words paragraph={paragraph} />
        </div>
        <ResponsiveThreeItems />
        <Suspense>
          <ResponsiveCarousel />
          <Suspense>
            <ResponsiveFooter />
          </Suspense>
        </Suspense>
      </SmoothScroll>
    </>
  );
}
