import { ClerkProvider } from "@clerk/nextjs";

export default function NewLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<div className="bg-black min-w-screen min-h-screen flex flex-col justify-around  py-16">
				<h1 className=" xl:text-8xl  lg:text-7xl text-4xl sm:text-6xl md:text-6xl   text-white text-center pb-12 ">
					Glycinate{" "}
				</h1>
				<div>{children}</div>
			</div>
		</ClerkProvider>
	);
}
