import { Construction, Settings } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default async function SettingsPage({
	params,
}: {
	params: Promise<{ project: string }>;
}) {
	const { project } = await params;
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Settings className="h-4 w-4 text-primary" />
					Settings
				</CardTitle>
				<CardDescription>
					Manage configuration for{" "}
					<span className="font-mono text-foreground/80">{project}</span>.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
					<span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
						<Construction className="h-5 w-5 text-amber-300" />
					</span>
					<h3 className="mt-4 text-base font-semibold tracking-tight">
						Coming soon
					</h3>
					<p className="mt-1 max-w-sm text-sm text-muted-foreground">
						Custom domains, environment variables, and team permissions will
						land here. Stay tuned.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
