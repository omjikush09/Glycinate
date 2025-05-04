"use client";

import { useEffect, useRef, useState } from "react";

const maxAttenmpts = 15;

export default function DeployMentStatus({
	deploymentId,
}: {
	deploymentId: number;
}) {
	const [currentStatus, setCurrentStatus] = useState("Loading..");
	const attempRef = useRef(0);
	const intervalRef = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		const getData = async () => {
			try {
				const nodeEnv = process.env.NODE_ENV;
				const data = await fetch(
					nodeEnv === "development"
						? `http://localhost:3000/api/status/${deploymentId}`
						: `https://glycinate.in/api/status/${deploymentId}`
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
				}
			} catch (error) {
				console.error(error);
				setCurrentStatus("Failed to fetch status");
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
			<div className="text-white">Status -- {currentStatus}</div>
		</>
	);
}
