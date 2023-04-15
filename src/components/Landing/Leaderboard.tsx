import { useEffect, useState } from "react";
import { getLeaderboard } from "../../logic/actions";

function Leaderboard() {
	const [modeFilter, setselectedMode] = useState<string>("all");

	useEffect(() => {
		getLeaderboard({ mode: modeFilter });
	}, []);

	return <></>;
}

export default Leaderboard;
