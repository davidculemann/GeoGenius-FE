import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCountryData } from "../../logic/actions";
import { useState } from "react";
import CountryContainer from "./CountryContainer";

interface CountryData {
	countryCode: string;
	gdp?: string;
	population?: string;
	area?: string;
	literacy?: string;
	[key: string]: string | undefined;
}

function GameScreen() {
	const { mode } = useParams();
	const [countryData, setCountryData] = useState<Array<CountryData>>([]);

	useEffect(() => {
		if (mode) getCountryData({ mode }).then((res) => setCountryData(res));
	}, []);

	if (!mode) return <div>Error loading game</div>;
	return (
		<div className="game-screen">
			{mode} {countryData.length}
			<div className="game-header-bar"></div>
			{countryData.length > 0 && (
				<div className="country-container">
					<div className="left-country">
						<CountryContainer
							countryCode={countryData[0].countryCode}
							metricNumber={countryData[0][mode]!}
						/>
					</div>
					<div className="voting-controls"></div>
					<div className="right-country">
						<CountryContainer
							countryCode={countryData[1].countryCode}
							metricNumber={countryData[1][mode]!}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default GameScreen;
