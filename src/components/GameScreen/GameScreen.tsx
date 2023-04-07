import { useParams } from "react-router-dom";
import { useEffect } from "react";

function GameScreen() {
	const { mode } = useParams();

	const getCountryData = async () => {
		const response = await fetch("https://restcountries.eu/rest/v2/all");
		const data = await response.json();
		console.log(data);
	};

	useEffect(() => {
		getCountryData();
	}, []);

	return <div className="game-screen">{mode}</div>;
}

export default GameScreen;
