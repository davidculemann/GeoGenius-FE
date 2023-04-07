import { useParams } from "react-router-dom";

function GameScreen() {
	const { mode } = useParams();

	return <div className="game-screen">{mode}</div>;
}

export default GameScreen;
