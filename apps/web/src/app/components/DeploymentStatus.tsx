"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, AlertTriangle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

import DeployedLink from "./DeployedLink";
import { StatusBadge } from "@/components/ui/status-badge";

const maxAttempts = 15;

type Status =
	| "Deployed"
	| "Queued"
	| "Started"
	| "Failed"
	| "Loading.."
	| "Failed to Fetch";

const META: Record<
	Status,
	{
		tone: "success" | "warning" | "danger" | "info" | "neutral";
		label: string;
		icon: React.ElementType;
		pulse: boolean;
		body: string;
	}
> = {
	Deployed: {
		tone: "success",
		label: "Deployed",
		icon: CheckCircle2,
		pulse: false,
		body: "Your app is live and reachable on its glycinate.in subdomain.",
	},
	Queued: {
		tone: "warning",
		label: "Queued",
		icon: RefreshCw,
		pulse: true,
		body: "Your build is in the queue. It will start shortly.",
	},
	Started: {
		tone: "info",
		label: "Building",
		icon: Loader2,
		pulse: true,
		body: "We're cloning your repo, installing dependencies, and building your app.",
	},
	Failed: {
		tone: "danger",
		label: "Failed",
		icon: AlertTriangle,
		pulse: false,
		body: "Something went wrong. Check the logs for details.",
	},
	"Loading..": {
		tone: "neutral",
		label: "Loading",
		icon: Loader2,
		pulse: true,
		body: "Fetching the latest status…",
	},
	"Failed to Fetch": {
		tone: "danger",
		label: "Couldn't reach API",
		icon: AlertTriangle,
		pulse: false,
		body: "We couldn't reach the status endpoint. We'll keep trying.",
	},
};

export default function DeployMentStatus({
	deploymentId,
	project,
}: {
	deploymentId: number;
	project: string;
}) {
	const localStorageKey = `DeploymentId-${deploymentId}`;
	const [currentStatus, setCurrentStatus] = useState<Status>("Loading..");
	const attempRef = useRef(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const cached = window.localStorage.getItem(localStorageKey) as Status | null;
		if (cached) setCurrentStatus(cached);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentStatus !== "Loading.." && currentStatus !== "Failed to Fetch")
			return;
		const getData = async () => {
			attempRef.current += 1;
			try {
				const data = await fetch(`/api/status/${deploymentId}`);
				const body: { status: Status } = await data.json();
				setCurrentStatus(body.status);

				if (
					body.status === "Deployed" ||
					body.status === "Failed" ||
					attempRef.current > maxAttempts
				) {
					if (intervalRef.current !== null) clearInterval(intervalRef.current);
					if (typeof window !== "undefined") {
						window.localStorage.setItem(localStorageKey, body.status);
					}
				}
				if (body.status === "Started") {
					if (intervalRef.current !== null) clearInterval(intervalRef.current);
					intervalRef.current = setInterval(
						getData,
						Math.max(2000 * attempRef.current, 2000)
					);
				}
			} catch (error) {
				console.error(error);
				setCurrentStatus("Failed to Fetch");
			}
		};

		getData();
		intervalRef.current = setInterval(getData, 5000);
		return () => {
			if (intervalRef.current !== null) clearInterval(intervalRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deploymentId]);

	const meta = META[currentStatus];
	const Icon = meta.icon;

	return (
		<div className="space-y-5">
			<div className="rounded-2xl border border-white/10 bg-card/60 p-5 backdrop-blur-xl">
				<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3">
						<span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
							<Icon
								className={`h-5 w-5 ${meta.pulse ? "animate-spin text-primary" : "text-foreground"}`}
							/>
						</span>
						<div>
							<div className="flex items-center gap-2">
								<h3 className="text-base font-semibold tracking-tight">
									{meta.label}
								</h3>
								<StatusBadge tone={meta.tone} pulse={meta.pulse}>
									Status
								</StatusBadge>
							</div>
							<p className="mt-1 text-sm text-muted-foreground">{meta.body}</p>
						</div>
					</div>
					<div className="flex items-center gap-2 self-stretch sm:self-auto">
						<span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted-foreground">
							<Activity className="mr-1.5 inline h-3 w-3 text-primary" />
							ID {deploymentId}
						</span>
					</div>
				</div>
			</div>

			{currentStatus === "Deployed" && <DeployedLink project={project} />}
		</div>
	);
}
