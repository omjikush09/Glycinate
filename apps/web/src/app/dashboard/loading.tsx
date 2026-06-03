import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
			<Skeleton className="h-10 w-48" />
			<Skeleton className="mt-3 h-5 w-72" />
			<div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<Skeleton key={i} className="h-44 w-full rounded-2xl" />
				))}
			</div>
		</div>
	);
}
