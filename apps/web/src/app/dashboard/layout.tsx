import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "../components/Navbar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "./loading";

export default function NewLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-black min-w-screen min-h-screen ">
			<Suspense fallback={<Loading />}>
				<Navbar />
			</Suspense>
			<div>{children}</div>
		</div>
	);
}
