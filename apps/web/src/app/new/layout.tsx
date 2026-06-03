import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { Navbar } from "../components/Navbar";
import Loading from "./loading";

export default function NewLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<div className="relative min-h-dvh bg-background text-foreground">
				<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.22_0.07_290/_0.35)_0%,transparent_70%)]" />
				<Suspense fallback={<Loading />}>
					<Navbar />
				</Suspense>
				<div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
					{children}
				</div>
			</div>
		</ClerkProvider>
	);
}
