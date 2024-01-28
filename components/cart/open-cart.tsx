export default function OpenCart({
  // className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center rounded-md transition-colors dark:border-neutral-700 dark:text-secondary">
      {/* <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)}
      /> */}
      CART
      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-secondary text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
