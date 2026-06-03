import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-4 py-6">
			<Skeleton className="h-32 w-full rounded-2xl" />
			<Skeleton className="h-24 w-full rounded-2xl" />
		</div>
	);
}
