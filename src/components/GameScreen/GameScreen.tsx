import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryData, postScore } from "../../logic/actions";
import CountryContainer from "./CountryContainer";
import IconButton from "../shared/IconButton";
import { useNavigate } from "react-router-dom";
import StyledTooltip from "../shared/StyledTooltip";
import { useAppSelector } from "../../logic/hooks";
import { capitaliseModeName } from "../../logic/utils";
import { useAppDispatch } from "../../logic/hooks";
import { setUserScores } from "../../logic/reducer";
import React from "react";

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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [countryData, setCountryData] = useState<CountryData[]>([]);
	const [score, setScore] = useState(0);
	const [scoreHidden, setScoreHidden] = useState(true);
	const currentUser = useAppSelector((state) => state.currentUser);
	const userScores = useAppSelector((state) => state.userScores);
	const [countryIndices, setcountryIndices] = useState([0, 1]);
	const modeHighScore = userScores?.[mode!] || 0;

	const handleVote = (isHigher: boolean) => {
		setScoreHidden(false);
		const isCorrect =
			(isHigher &&
				Number(countryData[countryIndices[0]][mode!]) <
					Number(countryData[countryIndices[1]][mode!])) ||
			(!isHigher &&
				Number(countryData[countryIndices[0]][mode!]) >
					Number(countryData[countryIndices[1]][mode!])) ||
			Number(countryData[countryIndices[0]][mode!]) ===
				Number(countryData[countryIndices[1]][mode!]);
		if (isCorrect) {
			setTimeout(() => {
				setScore((prev) => prev + 1);
				setScoreHidden(true);
				setcountryIndices((prev) => [prev[0] + 1, prev[1] + 1]);
			}, 1250);
		} else {
			alert(`You scored ${score} points!`);
			if (currentUser?.uid)
				postScore({ score, mode: mode!, uid: currentUser.uid }).then(
					(res) => dispatch(setUserScores(res))
				);
			navigate("/");
		}
	};

	const handleSetCountryData = async () => {
		console.log("set country data");
		try {
			const countryData = await getCountryData(mode as string);
			const shuffledRes = countryData.sort(() => Math.random() - 0.5);
			console.log(shuffledRes[0], shuffledRes[1]);
			setCountryData(shuffledRes);
		} catch (err) {
			console.error(err);
		}
	};

	const handleRestart = () => {
		setScore(0);
		setScoreHidden(true);
		if (mode) handleSetCountryData();
	};

	useEffect(() => {
		console.log("use effect");
		handleSetCountryData();
	}, []);

	if (!mode) return <div>Error loading game</div>;
	return (
		<div className="game-screen">
			<div className="game-header-bar">
				<div className="game-header__left">
					<div className="categories-text">categories:</div>
					<div className="category-icon__container">
						<TooltipCategoryIcon mode={mode} />
					</div>
					{userScores && (
						<div className="high-score">
							(high score: <b>{modeHighScore}</b>)
						</div>
					)}
				</div>
				<div className="score-tracker">
					<StyledTooltip
						open={score > modeHighScore}
						title={
							score > modeHighScore ? "New High Score! 🎉" : ""
						}
					>
						<div className="score-number">{score}</div>
					</StyledTooltip>
				</div>
				<div className="game-header__right">
					<IconButton
						icon="fa-solid fa-home"
						onClick={() => navigate("/")}
						tooltip="Home"
					/>
					<IconButton
						icon="fa-solid fa-undo"
						onClick={() => handleRestart()}
						tooltip="Restart"
					/>
					<StyledTooltip
						arrow
						title={`For the current metric (${capitaliseModeName(
							mode
						)}), choose wether the country on the right should be higher or lower.`}
					>
						<i className="far fa-circle-question" />
					</StyledTooltip>
				</div>
			</div>
			{countryData.length > 0 && (
				<div className="country-container">
					<div className="left-country">
						<CountryContainer
							countryCode={
								countryData[countryIndices[0]].countryCode
							}
							metricNumber={countryData[countryIndices[0]][mode]!}
							metricName={mode}
						/>
					</div>
					<div className="voting-controls">
						<button
							className="vote-button"
							onClick={() => {
								handleVote(true);
							}}
						>
							<i className="fa-solid fa-circle-chevron-up" />
						</button>
						<button
							className="vote-button"
							onClick={() => {
								handleVote(false);
							}}
						>
							<i className="fa-solid fa-circle-chevron-down" />
						</button>
					</div>
					<div className="right-country">
						<CountryContainer
							countryCode={
								countryData[countryIndices[1]].countryCode
							}
							metricNumber={countryData[countryIndices[1]][mode]!}
							metricName={mode}
							hidden={scoreHidden}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default React.memo(GameScreen);

function TooltipCategoryIcon({ mode }: { mode: string }) {
	return (
		<StyledTooltip title={capitaliseModeName(mode)} arrow>
			<i className={IconsMapping[mode]} />
		</StyledTooltip>
	);
}
