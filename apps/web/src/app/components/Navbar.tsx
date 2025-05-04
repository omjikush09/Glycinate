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
			<ClerkProvider>
				<nav className=" px-4 pt-4 pb-2 border-b-1">
					<div className="flex justify-between">
						<Link href={"/dashboard"}>
							<h2 className="text-white text-3xl">Glycinate </h2>
						</Link>
						<div className="flex gap-2 justify-between">
							<Link className="text-white mr-10" href={"/new"}>
								New{" "}
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
			</ClerkProvider>
		</>
	);
}
