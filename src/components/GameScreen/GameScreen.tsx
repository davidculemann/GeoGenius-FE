import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryData } from "../../logic/actions";
import CountryContainer from "./CountryContainer";
import IconButton from "../shared/IconButton";
import { useNavigate } from "react-router-dom";
import StyledTooltip from "../shared/StyledTooltip";

interface CountryData {
	countryCode: string;
	gdp?: string;
	population?: string;
	area?: string;
	literacy?: string;
	[key: string]: string | undefined;
}

const IconsMapping: Partial<CountryData> = {
	gdp: "fa-solid fa-money-bill",
	population: "fas fa-people-group",
	area: "fas fa-map-marked-alt",
	literacy: "fas fa-book-reader",
};

function GameScreen() {
	const { mode } = useParams();
	const navigate = useNavigate();
	const [countryData, setCountryData] = useState<Array<CountryData>>([]);
	const [score, setScore] = useState(0);

	const handleVote = (isHigher: boolean) => {
		const isCorrect =
			(isHigher &&
				Number(countryData[score][mode!]) <
					Number(countryData[score + 1][mode!])) ||
			(!isHigher &&
				Number(countryData[score][mode!]) >
					Number(countryData[score + 1][mode!])) ||
			Number(countryData[score][mode!]) ===
				Number(countryData[score + 1][mode!]);
		if (isCorrect) {
			setScore((prev) => prev + 1);
		} else {
			alert(`You scored ${score} points!`);
			navigate("/");
		}
	};

	useEffect(() => {
		if (mode) getCountryData({ mode }).then((res) => setCountryData(res));
	}, []);

	if (!mode) return <div>Error loading game</div>;
	return (
		<div className="game-screen">
			<div className="game-header-bar">
				<div className="game-header__left">
					<IconButton
						icon="fa-solid fa-home"
						onClick={() => navigate("/")}
					/>
					<StyledTooltip
						arrow
						title="For the chosen metric, choose wether the country on the right has a higher or lower number."
					>
						<i className="far fa-circle-question" />
					</StyledTooltip>
				</div>
				<div className="score-tracker">
					<div className="score-number">{score}</div>
				</div>
				<div className="game-header__right">
					<div className="categories-text">categories:</div>
					<div className="category-icon__container">
						<TooltipCategoryIcon mode={mode} />
					</div>
				</div>
			</div>
			{countryData.length > 0 && (
				<div className="country-container">
					<div className="left-country">
						<CountryContainer
							countryCode={countryData[score].countryCode}
							metricNumber={countryData[score][mode]!}
							metricName={mode}
						/>
					</div>
					<div className="voting-controls">
						<IconButton
							icon="fa-solid fa-circle-chevron-up"
							onClick={() => {
								handleVote(true);
							}}
						/>
						<IconButton
							icon="fa-solid fa-circle-chevron-down"
							onClick={() => {
								handleVote(false);
							}}
						/>
					</div>
					<div className="right-country">
						<CountryContainer
							countryCode={countryData[score + 1].countryCode}
							metricNumber={countryData[score + 1][mode]!}
							metricName={mode}
							hidden
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default GameScreen;

function TooltipCategoryIcon({ mode }: { mode: string }) {
	return (
		<StyledTooltip title={mode}>
			<i className={IconsMapping[mode]} />
		</StyledTooltip>
	);
}
