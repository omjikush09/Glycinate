import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "../components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

export default function NewLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<div className="bg-black min-w-dvw min-h-dvh flex flex-col   ">
				<Suspense fallback={<Loading />}>
					<Navbar />
				</Suspense>
				{children}
			</div>
		</ClerkProvider>
	);
}
