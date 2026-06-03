import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
			<Skeleton className="h-8 w-56" />
			<Skeleton className="mt-3 h-5 w-72" />
			<Skeleton className="mt-10 h-72 w-full rounded-2xl" />
		</div>
	);
}
