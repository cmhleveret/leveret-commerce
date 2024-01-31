'use client';
import { GridTileImage } from 'components/grid/tile';
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
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
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
  const response = await fetch('/api/shopify');
  const homepageItems = await response.json();

  if (!homepageItems || homepageItems.length < 3) return null;
  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  // function mouseEnter(divRef: number) {

  //   if(divRef == 1 ){

  //   }
  // }

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>

    // <section className="flex h-screen w-screen flex-row p-4 ">
    //   <div className="flex h-full w-1/2 items-center justify-center p-4 pr-2 " >
    //     <div className="h-full w-full rounded-lg bg-orange-300"
    //     onMouseEnter={() => mouseEnter(1)}
    //     ></div>
    //   </div>
    //   <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4 p-4  pl-2">
    //     <div className="w-full h-1/2 rounded-lg bg-orange-500"></div>
    //     <div className="h-1/2 w-full rounded-lg bg-red-300"></div>
    //   </div>
    // </section>
  );
}
