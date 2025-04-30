export default function NewLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-black w-full h-screen flex flex-col justify-around ">
			<h1 className=" xl:text-8xl  lg:text-7xl text-4xl sm:text-6xl md:text-6xl   text-white text-center  ">
				Glycinate{" "}
			</h1>
			<div>{children}</div>
		</div>
	);
}
