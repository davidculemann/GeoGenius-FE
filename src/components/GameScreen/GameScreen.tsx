import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getCountryData, postScore } from "../../logic/actions";
import CountryContainer from "./CountryContainer";
import IconButton from "../shared/IconButton";
import { useNavigate } from "react-router-dom";
import StyledTooltip from "../shared/StyledTooltip";
import { useAppSelector } from "../../logic/hooks";
import { capitaliseModeName, getCountryName } from "../../logic/utils";
import { useAppDispatch } from "../../logic/hooks";
import { setUserScores } from "../../logic/reducer";
import EndGameModal from "./EndGameModal";
import React from "react";
import lottie from "lottie-web";
import Button from "../shared/Button";

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
	const currentUser = useAppSelector((state) => state.currentUser);
	const userScores = useAppSelector((state) => state.userScores);
	const isTouchDevice = useAppSelector((state) => state.isTouchDevice);
	const [countryData, setCountryData] = useState<CountryData[]>([]);
	const [score, setScore] = useState<number>(0);
	const [scoreHidden, setScoreHidden] = useState<boolean>(true);
	const [countryIndices, setcountryIndices] = useState<number[]>([0, 1]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const modeHighScore = userScores?.[mode!] || 0;
	const loadingContainerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<lottie.AnimationItem | null>(null);
	const oldHighScore = useRef(modeHighScore);
	const leftCountryCode = countryData?.[countryIndices[0]]?.countryCode;
	const rightCountryCode = countryData?.[countryIndices[1]]?.countryCode;

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
			setShowModal(true);
			if (currentUser?.uid)
				postScore({ score, mode: mode!, uid: currentUser.uid }).then(
					(res) => {
						dispatch(setUserScores(res));
					}
				);
		}
	};

	const handleSetCountryData = async () => {
		try {
			const countryData = await getCountryData(mode as string);
			const shuffledRes = countryData.sort(() => Math.random() - 0.5);
			setCountryData(shuffledRes);
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	const handleRestart = () => {
		oldHighScore.current = modeHighScore;
		setLoading(true);
		setScore(0);
		setScoreHidden(true);
		setShowModal(false);
		if (mode) handleSetCountryData();
	};

	useEffect(() => {
		handleSetCountryData();
	}, []);

	useEffect(() => {
		if (loading) {
			animationRef.current = lottie.loadAnimation({
				container: loadingContainerRef.current as Element,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: "/animations/loading-dots.json",
			});
		} else if (animationRef.current) {
			animationRef.current?.destroy();
		}
		return () => animationRef.current?.destroy();
	}, [loading]);

	if (!mode) return <div>Error loading game</div>;
	return (
		<div className="game-screen">
			<div className="game-header-bar">
				<div className="game-header__left">
					<div className="categories-text">categories:</div>
					<div className="category-icon__container">
						<TooltipCategoryIcon mode={mode} />
					</div>
					{userScores && !isTouchDevice && (
						<div className="high-score">
							(high score: <b>{modeHighScore}</b>)
						</div>
					)}
				</div>
				<div className="score-tracker">
					<StyledTooltip
						open={
							userScores && score > modeHighScore ? true : false
						}
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
			{!loading && (
				<div className="country-container">
					<div className="left-country">
						<CountryContainer
							countryCode={leftCountryCode}
							metricNumber={countryData[countryIndices[0]][mode]!}
							metricName={mode}
						/>
					</div>
					<div className="voting-controls">
						<p>{getCountryName(rightCountryCode)} has a</p>
						<div className="button-container">
							<Button
								label="Higher"
								disabled={showModal}
								onClick={() => {
									handleVote(true);
								}}
								variant="primary"
								icon="fa-solid fa-circle-arrow-up"
								className="voting-button"
							/>
							<Button
								label="Lower"
								disabled={showModal}
								variant="primary"
								onClick={() => {
									handleVote(false);
								}}
								icon="fa-solid fa-circle-arrow-down"
								className="voting-button"
							/>
						</div>
						<p>
							{capitaliseModeName(mode)} than{" "}
							{getCountryName(leftCountryCode)}
						</p>
					</div>
					<div className="right-country">
						<CountryContainer
							countryCode={rightCountryCode}
							metricNumber={countryData[countryIndices[1]][mode]!}
							metricName={mode}
							hidden={scoreHidden}
						/>
					</div>
				</div>
			)}
			<div className="loading-container" ref={loadingContainerRef}></div>
			{showModal && (
				<EndGameModal
					handleRestart={handleRestart}
					score={score}
					oldScore={oldHighScore.current || 0}
					registeredUser={!!currentUser}
				/>
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
