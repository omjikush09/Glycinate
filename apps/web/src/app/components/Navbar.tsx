import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

export async function Navbar() {
	const reps: string = await new Promise((resolve) => {
		setTimeout(() => {
            const number=Math.random()
			resolve("hello"+number);
		}, 3000);
	});

	// if (reps !== "hello") return <div className="text-white">noting</div>;
	return (
		<>
			<ClerkProvider>
				{reps && (
					<nav className=" px-4 pt-4 pb-2 border-b-1">
						<div className="flex justify-between">
							<h2 className="text-white text-3xl">Glycinate {reps}</h2>
							<div>
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
				)}
			</ClerkProvider>
		</>
	);
}
