import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "Glycinate — Deploy React apps in minutes",
	description:
		"Glycinate turns a Git URL into a live, globally distributed React app in under a minute. Zero config, free SSL, instant deploys.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground font-sans antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
