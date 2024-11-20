import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/skeleton/skeleton-card";

export function SkeletonPage() {
    return (
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <Skeleton className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'></Skeleton>
        </div>
    )
}