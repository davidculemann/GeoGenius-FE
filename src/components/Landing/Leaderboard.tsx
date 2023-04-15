import { useEffect, useState } from "react";
import { getLeaderboard } from "../../logic/actions";
import styled from "styled-components";

const StyledTable = styled.table`
	border-collapse: collapse;
	width: 100%;
`;

interface Score {
	username: string;
	score: number;
	mode: string;
}

function Leaderboard() {
	const [modeFilter, setselectedMode] = useState<string>("all");
	const [leaderBoard, setLeaderBoard] = useState<Score[]>([]);

	useEffect(() => {
		getLeaderboard({ mode: modeFilter }).then((res) => {
			setLeaderBoard(res);
		});
	}, []);

	return (
		<StyledTable>
			<thead>
				<tr>
					<th>Rank</th>
					<th>Mode</th>
					<th>Username</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				{leaderBoard.map((user, index) => {
					return (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{user.mode}</td>
							<td>{user.username}</td>
							<td>{user.score}</td>
						</tr>
					);
				})}
			</tbody>
		</StyledTable>
	);
}

export default Leaderboard;
