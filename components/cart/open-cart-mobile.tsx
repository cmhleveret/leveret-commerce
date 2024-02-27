import { BackpackIcon } from '@radix-ui/react-icons';

export default function OpenCartMobile({
  // className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white md:hidden">
      {/* <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)}
      /> */}
      {/* CART */}
      <BackpackIcon />
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-secondary text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
