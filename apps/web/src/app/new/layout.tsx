import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";

export default function NewLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<div className="bg-black min-w-dvh min-h-dvh flex flex-col   ">
				<div className="flex justify-between px-6 items-center pb-12">
					<h1 className=" xl:text-8xl  lg:text-7xl text-4xl sm:text-6xl md:text-6xl   text-white text-center  ">
						Glycinate{" "}
					</h1>
					<Link
						className="text-black px-12 bg-white rounded-2xl py-2 "
						href="/dashboard"
					>
						Dashboard
					</Link>
				</div>
				{children}
			</div>
		</ClerkProvider>
	);
}
