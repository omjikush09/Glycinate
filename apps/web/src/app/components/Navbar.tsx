import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export async function Navbar() {
	return (
		<>
			<nav className=" px-4 pt-4 pb-2 shadow-lg shadow-blue-500/40 border-b-1 border-b-gray-700 bg-linear-to-r from-black to-gray-800">
				<div className="flex justify-between">
					<Link href={"/dashboard"}>
						<h2 className="text-white text-3xl">Glycinate </h2>
					</Link>
					<div className="flex gap-8 justify-between">
						<Link
							className="cursor-pointer px-4 py-2 bg-violet-800 shadow shadow-violet-400/50 rounded text-white"
							href={"/new"}
						>
							New project{" "}
						</Link>
						<SignedOut>
							<SignInButton />
							<SignUpButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
				</div>
			</nav>
		</>
	);
}
