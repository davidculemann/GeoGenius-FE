import styled from "styled-components";
import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

interface EndGameModalProps {
	handleRestart: () => void;
	score: number;
	oldScore: number;
	registeredUser: boolean;
}

const ModalContainer = styled.div`
	color: #000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	z-index: 100;
	backdrop-filter: blur(1rem);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.animation-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		height: 30rem;
		width: 30rem;
	}
	.message {
		margin-bottom: 1.6rem;
		color: #fff;
		@media (hover: none) and (pointer: coarse) {
			font-size: 1.8rem;
		}
	}
	.actions {
		display: flex;
		gap: 1.6rem;
	}
`;

function EndGameModal({
	handleRestart,
	score,
	oldScore,
	registeredUser,
}: EndGameModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<lottie.AnimationItem | null>(null);
	const navigate = useNavigate();
	const isHighScore = score > oldScore;

	useEffect(() => {
		animationRef.current = lottie.loadAnimation({
			container: modalRef.current as Element,
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: isHighScore
				? "/animations/congratulations.json"
				: "/animations/crying.json",
		});
		return () => animationRef.current?.destroy();
	}, []);

	const message = !registeredUser
		? `You scored ${score}. You must be logged in to save your score.`
		: isHighScore
		? `New high score! You scored ${score}, your old high score was ${oldScore}.`
		: `You scored ${score}. Your high score is ${oldScore}.`;

	return (
		<ModalContainer>
			<div className="animation-container" ref={modalRef}></div>
			<div className="message">{message}</div>
			<div className="actions">
				<Button
					onClick={handleRestart}
					label="Retry"
					variant="primary"
					icon="fa-solid fa-redo"
					trailing={true}
				/>
				<Button
					onClick={() => navigate("/")}
					label="Home"
					variant="primary"
					icon="fa-solid fa-home"
					trailing={true}
				/>
			</div>
		</ModalContainer>
	);
}

export default EndGameModal;
