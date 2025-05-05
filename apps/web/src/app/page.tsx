import Link from "next/link";

export default function Home() {
	return (
		<>
			<div className="h-dvh bg-radial from-blue-800 from-10%  to-black to-90% flex flex-col">
				<div className="text-white pt-2 px-4 flex justify-end gap-4">
					<Link
						className="cursor-pointer px-4 py-2 bg-blue-900 shadow shadow-violet-400/50 rounded text-white"
						href="https://app.eraser.io/workspace/h6tKjbTXfDXku3XmBXYc"
						target="_black"
					>
						Architecture
					</Link>
					<Link
						className="cursor-pointer px-4 py-2 bg-blue-900 shadow shadow-violet-400/50 rounded text-white"
						href="https://linktr.ee/omjikush09"
						target="_black"
					>
						Contact
					</Link>
				</div>
				<div className="flex flex-1 justify-center items-center  h-full  flex-col  ">
					<div className=" h-3/4 w-1/2 rounded-xl p-6 flex items-center flex-col gap-1 pb-40">
						<h1 className=" xl:text-8xl  lg:text-7xl text-4xl sm:text-6xl md:text-6xl block p-6  text-white">
							Glycinate{" "}
						</h1>
						<h1 className=" xl:text-4xl  lg:text-7xl text-2xl sm:text-5xl md:text-6xl block p-6 bg-gradient-to-r  from-white to-blue-300 text-transparent bg-clip-text ">
							Deploy Your React App Now{" "}
						</h1>
						<a
							className="text-white mt-auto pt-6  pb-6  pl-8 pr-8 bg-black rounded-full text-2xl hover:-translate-y-2 active:translate-0 transition-all duration-150 hover:shadow-2xl acitve:shadow-md animate-fade-out-scale "
							href="/new"
						>
							Start deploying
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
