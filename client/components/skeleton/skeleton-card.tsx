import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" /> {/* Use w-full for responsiveness */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" /> {/* Adjust width for flexibility */}
        <Skeleton className="h-4 w-3/4" /> {/* Adjust width for flexibility */}
      </div>
    </div>
  )
}
