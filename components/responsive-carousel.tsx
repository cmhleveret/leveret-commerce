'use client';
import { wrap } from '@motionone/utils';
import { useStore } from 'app/store/store';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GridTileImage } from './grid/tile';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity?: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  /**
   * The number of times to repeat the child text should be dynamically calculated
   * based on the size of the text and viewport. Likewise, the x motion value is
   * currently wrapped between -20 and -45% - this 25% is derived from the fact
   * we have four children (100% / 4). This would also want deriving from the
   * dynamically generated number of children.
   */
  return (
    <div className="parallax">
      <motion.div className="scroller " style={{ x }}>
        <span className="pr-4 ">{children} </span>
        <span className="pr-4 ">{children} </span>
        <span className="pr-4 ">{children} </span>
        <span className="pr-4 ">{children} </span>
      </motion.div>
    </div>
  );
}

async function getCollectionProducts(collection: string) {
  const response = await fetch(`/api/shopify?collection=${collection}`);
  const products = await response.json();
  return products;
}

interface Product {
  handle: string;
  title: string;
  priceRange: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage: {
    url: string;
  };
}

export function ResponsiveCarousel() {
  // Define the state with an explicit type
  const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
  const store = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      const collection = store.open
        ? 'hidden-homepage-physical-carousel'
        : 'hidden-homepage-digital-carousel';
      console.log(collection);
      const products: Product[] = await getCollectionProducts(collection);
      setCarouselProducts(products);
    };

    fetchProducts();
  }, [store.open]);

  if (!carouselProducts.length) return null;

  return (
    <ParallaxText baseVelocity={-5}>
      <ul className="flex gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-1/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </ParallaxText>
  );
}

// export function ResponsiveCarousel() {
//   const [carouselProducts, setCarouselProducts] = useState([]);
//   const store = useStore();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const collection = store.open ? 'hidden-homepage-physical-carousel' : 'hidden-homepage-digital-carousel';
//       const products = await getCollectionProducts(collection);
//       setCarouselProducts(products);
//     };

//     fetchProducts();
//   }, [store.open]); // Dependency array includes `store.open` to refetch when it changes

//   // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
//   const currentCarouselProducts = [...carouselProducts];

//   if (!currentCarouselProducts.length) return null;

//   return (
//     <ParallaxText baseVelocity={-5}>
//       <ul className="flex gap-4">
//         {currentCarouselProducts.map((product, i) => (
//           <li
//             key={`${product.handle}${i}`}
//             className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
//           >
//             <Link href={`/product/${product.handle}`} className="relative h-full w-full">
//               <GridTileImage
//                 alt={product.title}
//                 label={{
//                   title: product.title,
//                   amount: product.priceRange.maxVariantPrice.amount,
//                   currencyCode: product.priceRange.maxVariantPrice.currencyCode
//                 }}
//                 src={product.featuredImage?.url}
//                 fill
//                 sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </ParallaxText>
//   );
// }
