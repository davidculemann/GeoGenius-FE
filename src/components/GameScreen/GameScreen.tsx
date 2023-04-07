import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function GameScreen() {
	const { mode } = useParams();

	const getCountryData = async () => {
		const response = await axios.get(
			"https://restcountries.com/v3.1/all?fields=name,area,population"
		);
		const data = await response.data;
		console.log(data);
	};

	useEffect(() => {
		getCountryData();
	}, []);

	return <div className="game-screen">{mode}</div>;
}

export default GameScreen;
