import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getCountryData, postScore } from "../../logic/actions";
import CountryContainer from "./CountryContainer";
import IconButton from "../shared/IconButton";
import { useNavigate } from "react-router-dom";
import StyledTooltip from "../shared/StyledTooltip";
import { useAppSelector } from "../../logic/hooks";
import { capitaliseModeName } from "../../logic/utils";
import { useAppDispatch } from "../../logic/hooks";
import { setUserScores } from "../../logic/reducer";
import EndGameModal from "./EndGameModal";
import React from "react";
import lottie from "lottie-web";
import { IconsMapping } from "../../logic/utils";
import VotingControls from "./VotingControls";

interface CountryData {
	countryCode: string;
	gdp?: string;
	population?: string;
	area?: string;
	literacy?: string;
	[key: string]: string | undefined;
}

function GameScreen() {
	const { mode, customisation } = useParams();
	const gameModes = [mode, customisation];
	const timeTrial = customisation === "timetrial";
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const currentUser = useAppSelector((state) => state.currentUser);
	const userScores = useAppSelector((state) => state.userScores);
	const customisationScores = customisation
		? userScores?.customScores
		: userScores?.scores;
	const isTouchDevice = useAppSelector((state) => state.isTouchDevice);
	const [countryData, setCountryData] = useState<CountryData[]>([]);
	const [score, setScore] = useState<number>(0);
	const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
	const [scoreHidden, setScoreHidden] = useState<boolean>(true);
	const [countryIndices, setcountryIndices] = useState<number[]>([0, 1]);
	const [loading, setLoading] = useState<boolean>(true);
	const [comparingMetric, setComparingMetric] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const modeHighScore = customisationScores?.[mode!] || 0;
	const loadingContainerRef = useRef<HTMLDivElement>(null);
	const scoreContainerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<lottie.AnimationItem | null>(null);
	const oldHighScore = useRef(modeHighScore);
	const hasAuthChanged = useRef(false);
	const leftCountryCode = countryData?.[countryIndices[0]]?.countryCode;
	const rightCountryCode = countryData?.[countryIndices[1]]?.countryCode;
	const isHighScore = score > modeHighScore;

	const handleVote = (isHigher: boolean) => {
		setScoreHidden(false);
		setComparingMetric(true);
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
				setComparingMetric(false);
			}, 1250);
		} else {
			handleEndgame(2000);
		}
	};

	const handleEndgame = (interval: number) => {
		setTimeout(() => {
			setShowModal(true);
			if (currentUser?.uid && !hasAuthChanged.current)
				postScore({
					score,
					mode: mode!,
					uid: currentUser.uid,
					customisation: customisation,
				}).then((res) => {
					dispatch(setUserScores(res));
				});
		}, interval);
	};

	useEffect(() => {
		if (currentUser?.uid && score > 0) {
			hasAuthChanged.current = true;
		}
	}, [currentUser]);

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
		hasAuthChanged.current = false;
		setLoading(true);
		setScore(0);
		setScoreHidden(true);
		setShowModal(false);
		setComparingMetric(false);
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

	useEffect(() => {
		if (isHighScore && customisationScores) {
			animationRef.current = lottie.loadAnimation({
				container: scoreContainerRef.current as Element,
				renderer: "svg",
				loop: 1,
				autoplay: true,
				path: "/animations/congratulations.json",
			});
		}
	}, [isHighScore]);

	if (!mode) return <div>Error loading game</div>;
	return (
		<div className="game-screen">
			<div className="game-header-bar">
				<HeaderLeft
					isTouchDevice={isTouchDevice}
					customisationScores={customisationScores}
					modeHighScore={modeHighScore}
					gameModes={gameModes}
				/>
				<div className="score-tracker">
					<StyledTooltip
						open={customisationScores && isHighScore ? true : false}
						title={isHighScore ? "New High Score! 🎉" : ""}
					>
						<div className="score-number">{score}</div>
					</StyledTooltip>
					<div
						className="score-animation-container"
						ref={scoreContainerRef}
					></div>
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
						open={tooltipIsOpen}
						onOpen={() => setTooltipIsOpen(true)}
						onClose={() => setTooltipIsOpen(false)}
						title={`For the current metric (${capitaliseModeName(
							mode
						)}), choose whether the second country should be higher or lower.`}
					>
						<i
							className="far fa-circle-question"
							role="button"
							onClick={() => setTooltipIsOpen((prev) => !prev)}
						/>
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
					<VotingControls
						comparingMetric={comparingMetric}
						rightCountryCode={rightCountryCode}
						leftCountryCode={leftCountryCode}
						mode={mode}
						showModal={showModal}
						handleVote={handleVote}
						handleEndgame={handleEndgame}
						timeTrial={timeTrial}
					/>

					<div className="right-country">
						<CountryContainer
							countryCode={rightCountryCode}
							metricNumber={countryData[countryIndices[1]][mode]!}
							metricName={mode}
							hidden={scoreHidden}
							nextCountryCode={
								countryData[countryIndices[1] + 1]?.countryCode
							}
						/>
					</div>
				</div>
			)}
			<div
				className={`loading-container ${loading ? "loading" : ""}`}
				ref={loadingContainerRef}
			></div>
			{showModal && (
				<EndGameModal
					handleRestart={handleRestart}
					score={score}
					oldScore={oldHighScore.current || 0}
					registeredUser={!!currentUser}
					authChanged={hasAuthChanged.current}
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

interface HeaderLeftProps {
	isTouchDevice: boolean;
	gameModes: (string | undefined)[];
	customisationScores: boolean;
	modeHighScore: number;
}

function HeaderLeft({
	isTouchDevice,
	gameModes,
	customisationScores,
	modeHighScore,
}: HeaderLeftProps) {
	if (isTouchDevice)
		return (
			<div className="game-header__left column">
				{customisationScores && (
					<div className="high-score">
						(high score: <b>{modeHighScore}</b>)
					</div>
				)}
				<div className="category-icon__container">
					{gameModes.map(
						(mode) =>
							mode && (
								<TooltipCategoryIcon mode={mode} key={mode} />
							)
					)}
				</div>
			</div>
		);
	return (
		<div className="game-header__left">
			<div className="categories-text">categories:</div>
			<div className="category-icon__container">
				{gameModes.map(
					(mode) =>
						mode && <TooltipCategoryIcon mode={mode} key={mode} />
				)}
			</div>
			{customisationScores && (
				<div className="high-score">
					(high score: <b>{modeHighScore}</b>)
				</div>
			)}
		</div>
	);
}
