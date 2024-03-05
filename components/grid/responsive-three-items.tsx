'use client';
// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from "@/components/ui/resizable";
// import { GridTileImage } from 'components/grid/tile';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

// import { getCollectionProducts } from 'lib/shopify';
// import type { Product } from 'lib/shopify/types';
// import Link from 'next/link';

// function ThreeItemGridItem({
//   item,
//   size,
//   priority
// }: {
//   item: Product;
//   size: 'full' | 'half';
//   priority?: boolean;
// }) {
//   return (
//     <div
//       className={size === 'full' ? 'md:col-span-4 md:row-span-2 bg-red-600 w-full h-full' : 'md:col-span-2 md:row-span-1'}
//     >
//       <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
//         <GridTileImage
//           src={item.featuredImage.url}
//           fill
//           sizes={
//             size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
//           }
//           priority={priority}
//           alt={item.title}
//           label={{
//             position: size === 'full' ? 'center' : 'bottom',
//             title: item.title as string,
//             amount: item.priceRange.maxVariantPrice.amount,
//             currencyCode: item.priceRange.maxVariantPrice.currencyCode
//           }}
//         />
//       </Link>
//     </div>
//   );
// }

export async function ResponsiveThreeItems() {
  // Collections that start with `hidden-*` are hidden from the search page.

  // if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  // const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  const mouse = {
    //only the objects that use the mouse will be re renderes with useMotionValue - not the whole page
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 1 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 1 })
  };
  console.log(smoothMouse.x);

  const width = useTransform(smoothMouse.y, [0.2, 0.8], ['100%', '0%']);

  const height = useTransform(smoothMouse.x, [0.2, 0.8], ['0%', '50%']);

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX / innerWidth;
      const y = clientY / innerHeight;
      mouse.x.set(x);
      mouse.y.set(y);
    };

    window.addEventListener('mousemove', manageMouseMove);
    return () => window.removeEventListener('mousemove', manageMouseMove);
  }, [mouse.x, mouse.y]);

  // useEffect(() => {
  //   // const manageMouseMove = (e: MouseEvent) => {
  //   //   const { clientX, clientY } = e
  //   //   const { innerWidth, innerHeight } = window
  //   //   const x = clientX / innerWidth
  //   //   const y = clientY / innerHeight
  //   //   mouse.x.set(x)
  //   //   mouse.y.set(y)
  //   // }
  //   const manageMouseMove = (e: MouseEvent) => {
  //   const { clientX, clientY } = e;
  //   const { innerWidth, innerHeight } = window;

  //   // Convert to a percentage of the window's dimensions
  //   const xPercentage = (clientX / innerWidth) * 100;
  //   const yPercentage = (clientY / innerHeight) * 100;

  //   // Set the mouse position values
  //   mouse.x.set(xPercentage);
  //   mouse.y.set(yPercentage);
  // };

  //   window.addEventListener('mousemove', manageMouseMove)
  //   return () => window.removeEventListener('mousemove', manageMouseMove)
  // }, [mouse.x, mouse.y])

  return (
    <section className="flex h-screen w-screen flex-row p-4 ">
      <motion.div className="flex h-full items-center justify-center p-4 pr-2 " style={{ width }}>
        <div className="h-full w-full rounded-lg bg-secondary"></div>
      </motion.div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4  pl-2">
        <motion.div className="w-full rounded-lg bg-secondary" style={{ height }}></motion.div>
        <div className="h-full w-full rounded-lg bg-secondary"></div>
      </div>
    </section>
  );
}

{
  /* <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border-red"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6 bg-orange-600">

          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40}>
              <div className="flex h-full items-center justify-center p-6 bg-blue-950">

              </div>
            </ResizablePanel>
            <ResizableHandle className="data-[panel-group-direction=horizontal]" />
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-6 bg-violet-500">

              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup> */
}
