"use client";

import { useEffect, useRef, useState } from "react";
import DeployedLink from "./DeployedLink";

const maxAttenmpts = 15;

export default function DeployMentStatus({
	deploymentId,
	project,
}: {
	deploymentId: number;
	project: string;
}) {
	const localStorageKey = `DeploymentId-${deploymentId}`;
	const [currentStatus, setCurrentStatus] = useState<
		"Deployed" | "Queued" | "Started" | "Failed" | "Loading.."
	>(
		(localStorage.getItem(localStorageKey) as "Deployed" | "Failed") ??
			"Loading.."
	);
	const attempRef = useRef(0);
	const intervalRef = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		if (currentStatus !== "Loading..") return;
		const getData = async () => {
			attempRef.current += 1;
			try {
				const nodeEnv = process.env.NODE_ENV;
				const data = await fetch(
					nodeEnv === "development"
						? `http://localhost:3000/api/status/${deploymentId}`
						: `https://www.glycinate.in/api/status/${deploymentId}`
				);
				const body: {
					status: "Deployed" | "Queued" | "Started" | "Failed";
				} = await data.json();
				setCurrentStatus(body.status);

				if (
					body.status == "Deployed" ||
					body.status == "Failed" ||
					attempRef.current > maxAttenmpts
				) {
					if (intervalRef.current !== null) {
						clearInterval(intervalRef.current);
					}
					localStorage.setItem(`DeploymentId-${deploymentId}`, body.status);
				}
				if (body.status == "Started") {
					if (intervalRef.current !== null) {
						clearInterval(intervalRef.current);
					}
					intervalRef.current = setInterval(
						getData,
						Math.max(2000 * attempRef.current, 2000)
					);
				}
			} catch (error) {
				console.error(error);
				setCurrentStatus("Failed");
			}
		};

		getData();
		intervalRef.current = setInterval(getData, 5000);
		return () => {
			if (intervalRef.current !== null) {
				clearInterval(intervalRef.current);
			}
		};
	}, [deploymentId]);

	return (
		<>
			<div className="text-white my-10">Status -- {currentStatus}</div>
			{currentStatus == "Deployed" && <DeployedLink project={project} />}
		</>
	);
}
