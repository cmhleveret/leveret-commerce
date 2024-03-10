'use client';
import { GridTileImage } from 'components/grid/tile';
import { motion } from 'framer-motion';
import type { Product } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div className="h-full w-full">
      <Link className="relative block h-full w-full " href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ResponsiveThreeItems() {
  const response = await fetch('/api/shopify?collection=hidden-featured-digital-items');
  const homepageItems = await response.json();
  console.log(homepageItems);

  if (!homepageItems || homepageItems.length < 3) return null;
  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  const leftVariants = {
    base: {
      width: '50%'
    },
    hover: {
      width: '80%',
      transition: { duration: 0.3 }
    }
  };

  const rightVariants = {
    base: {
      width: '50%'
    },
    hover: {
      width: '80%',
      transition: { duration: 0.3 }
    }
  };

  const topRightVariants = {
    base: {
      height: '50%'
    },
    hover: {
      height: '80%',
      transition: { duration: 0.3 }
    }
  };

  const bottomRightVariants = {
    base: {
      height: '50%'
    },
    hover: {
      height: '90%',
      transition: { duration: 0.3 }
    }
  };

  return (
    // <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
    //   <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
    //   <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
    //   <ThreeItemGridItem size="half" item={thirdProduct} />
    // </section>

    <section className="z-[100] flex h-screen w-screen flex-row p-4">
      <motion.div
        className="flex h-full  items-center justify-center p-4 pr-2 "
        variants={leftVariants}
        initial="base"
        whileHover="hover"
      >
        <div className="h-full w-full rounded-lg ">
          <ThreeItemGridItem size="half" item={firstProduct} priority={true} />
        </div>
      </motion.div>
      <motion.div
        className="flex h-full flex-col items-center justify-center gap-4 p-4  pl-2"
        variants={rightVariants}
        initial="base"
        whileHover="hover"
      >
        <motion.div
          className="w-full rounded-lg "
          variants={topRightVariants}
          initial="base"
          whileHover="hover"
        >
          <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        </motion.div>
        <motion.div
          className="h-full w-full rounded-lg "
          variants={bottomRightVariants}
          initial="base"
          whileHover="hover"
        >
          <ThreeItemGridItem size="half" item={thirdProduct} priority={true} />
        </motion.div>
      </motion.div>
    </section>
  );
}
