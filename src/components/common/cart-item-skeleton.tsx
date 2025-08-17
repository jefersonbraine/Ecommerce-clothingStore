import { Skeleton } from "../ui/skeleton";

export function CartItemSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-16 w-16 rounded-lg" />

      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="h-3 w-1/2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"></div>

          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
