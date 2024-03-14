import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
// import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
// import { Menu } from 'lib/shopify/types';
import DigitalPhyscial from 'components/nav/digitalphyscial';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
// import Search from './search';
// const { SITE_NAME } = process.env;

// function Backdrop() {
//   return <div className="navBackdrop absolute z-[10] h-[90px] w-full"></div>;
// }

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <>
      {/* <Backdrop /> */}
      <nav className="relative z-[50] flex items-center justify-between p-2 md:p-0 lg:px-0 ">
        <div className="mb-0 flex h-[50px] w-full flex-row items-center justify-between gap-4 px-4 align-middle backdrop-blur-sm md:h-[90px] md:border">
          <div className="block flex-none md:hidden ">
            <MobileMenu menu={menu} />
          </div>
          {/* <div className="z-100 mb-0 flex h-[90px] w-full flex-row items-center justify-between gap-4 border px-4 align-middle"> */}
          {/* <div className="w-1/3 h-full bg-orange-600 flex-col  "> */}
          <div className="flex w-full flex-row items-center justify-center gap-0 align-middle md:w-1/3 md:justify-start md:gap-4 ">
            <Link href="/">
              <div className="hidden h-[50px] w-[120px] rounded-sm bg-primary py-4 text-center text-xs font-normal text-white hover:bg-secondary hover:text-primary dark:border-neutral-700 dark:text-secondary md:block">
                LEVERET
              </div>
            </Link>
            <div className="">
              <DigitalPhyscial />
            </div>
            <Link href="/search">
              <div className="hidden h-[50px] w-[50px] rounded-sm bg-secondary py-4 text-center text-xs font-normal text-white hover:bg-primary hover:text-primary dark:border-neutral-700 dark:text-secondary md:block">
                👀
              </div>
            </Link>
          </div>

          <div className="">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
          {/* </div> */}
        </div>
      </nav>
    </>
  );
}

// export default async function Navbar() {
//   const menu = await getMenu('next-js-frontend-header-menu');

//   return (
//     <nav className="relative flex items-center justify-between p-4 md:p-0 lg:px-0">
//       <div className="block flex-none md:hidden">
//         <MobileMenu menu={menu} />
//       </div>

//       <div className="mb-0 flex h-[90px] w-full flex-row items-center justify-between gap-4 border px-4 align-middle backdrop-blur-sm">
//         {/* <div className="w-1/3 h-full bg-orange-600 flex-col  "> */}
//         <div className="flex w-1/3 flex-row items-center justify-start gap-4 align-middle">
//           <Link href="/">
//             <div className="h-[50px] w-[120px] rounded-sm bg-primary py-4 text-center text-xs font-normal text-black">
//               LEVERET
//             </div>
//           </Link>

//           <div className="flex h-[50px] w-[200px] flex-row rounded-sm">
//             <div className="font-notmal flex h-full w-1/2 flex-col justify-center rounded-bl-sm rounded-tl-sm bg-primary text-center align-middle text-xs text-secondary">
//               DIGITAL
//             </div>
//             <div className="flex h-full w-1/2 flex-col justify-center rounded-br-sm rounded-tr-sm bg-secondary text-center align-middle text-xs font-normal text-primary">
//               PHYSICAL
//             </div>
//             {/* <div className="w-[120px] h-[50px] text-center text-black text-xs font-normal bg-primary py-4 rounded-md">TOGGLE</div> */}
//           </div>
//         </div>

//         <Suspense fallback={<OpenCart />}>
//           <Cart />
//         </Suspense>

//         {/* </div> */}
//       </div>
//     </nav>
//   );
// }

{
  /* <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div> */
}
