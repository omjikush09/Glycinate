export default async function Dashboard() {
	const reps: string = await new Promise((resolve) => {
		setTimeout(() => {
			const number = Math.random();
			resolve("hello" + number);
		}, 1000);
	});
	return <>{reps && <div className="text-white">dashboard</div>}</>;
}
