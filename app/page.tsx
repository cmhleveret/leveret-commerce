import { ResponsiveThreeItems } from 'components/grid/responsive-three-items';
import ResponsiveFooter from 'components/layout/responsive-footer';
import ShowReel from 'components/layout/showreel';
import { ResponsiveCarousel } from 'components/responsive-carousel';
import SmoothScroll from 'components/smoothScroll/smooth-scroll';
import { Suspense } from 'react';

export const runtime = 'edge';

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
        <div className="h-screen w-full">
          <ShowReel />
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
