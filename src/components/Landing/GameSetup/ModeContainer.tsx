import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IconsMapping } from "../../../logic/utils";
import { capitaliseModeName } from "../../../logic/utils";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import StyledTooltip from "../../shared/StyledTooltip";
import { useAppSelector } from "../../../logic/hooks";

const StyledModeContainer = styled.div`
	height: 12rem;
	width: 100%;
	border-radius: 1.6rem;
	border: 0.1rem solid var(--light-border-color);
	background-color: var(--dark-shade);
	display: flex;
	align-items: center;
	gap: 1.6rem;
	padding: 0 1.6rem;
	box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
	cursor: pointer;
	.game-mode__icon {
		flex-shrink: 0;
		height: 6rem;
		width: 6rem;
		border-radius: 50%;
		border: 0.1rem solid var(--white75);
		font-size: 2.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--dark-shade);
	}
	.game-mode__info {
		.name-container {
			display: flex;
			h3 {
				font-size: 2.4rem;
			}
			.icon-container {
				transform: rotate(90deg);
				i {
					display: flex;
					align-items: center;
					@media (hover: hover) {
						opacity: 0;
					}
					@media (hover: none) {
						animation: none;
					}
				}
			}
		}
		p {
			font-size: 1.6rem;
		}
	}
	.time-trial-button {
		height: 6rem;
		width: 6rem;
		padding-bottom: 0.3rem;
		transition: opacity 0.2s ease-in-out;
		margin-left: auto;
		align-items: center;
		border-radius: 50%;
		flex-shrink: 0;
		background-color: transparent;
		transition: background-color 0.1s ease-in-out;
		@media (hover: hover) {
			opacity: 0;
			&:hover {
				background-color: var(--dark-shade);
			}
		}
		@media (hover: none) {
			background-color: var(--dark-shade);
		}
	}
	&:hover {
		.time-trial-button {
			opacity: 1;
		}
		border-color: var(--light-border-color-highlight);
		.game-mode__info .name-container i {
			opacity: 1;
		}
	}
`;

interface ModeProps {
	mode: { name: string; description: string };
	index: number;
}

function ModeContainer({ mode, index }: ModeProps) {
	const { name, description } = mode;
	const buttonRef = useRef<HTMLButtonElement>(null);
	const animationRef = useRef<any>(null);
	const navigate = useNavigate();
	const isTouchDevice = useAppSelector((state) => state.isTouchDevice);
	const [openTooltip, setOpenTooltip] = useState(false);

	useEffect(() => {
		animationRef.current = lottie.loadAnimation({
			container: buttonRef.current as Element,
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: "/animations/stop-clock.json",
		});
		animationRef.current.setSpeed(0.3);
		return () => animationRef.current?.destroy();
	}, []);

	return (
		<StyledModeContainer
			role="button"
			aria-label={`game-mode button ${name}`}
			onClick={() => navigate(`/play/${name.toLowerCase()}`)}
		>
			<div className="game-mode__icon">
				<i className={IconsMapping[name]}></i>
			</div>
			<div className="game-mode__info">
				<div className="name-container">
					<h3>{capitaliseModeName(name)}</h3>
					<div className="icon-container">
						<i className="fa-solid fa-chevron-up fa-bounce"></i>
					</div>
				</div>
				<p>{description}</p>
			</div>
			<StyledTooltip
				arrow
				title={
					<span>
						<b>NEW</b> Time Trial
					</span>
				}
				open={(isTouchDevice && index === 0) || openTooltip}
				onMouseEnter={() => setOpenTooltip(true)}
				onMouseLeave={() => setOpenTooltip(false)}
				PopperProps={{
					placement: "bottom",
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -6],
							},
						},
					],
				}}
			>
				<button
					ref={buttonRef}
					className="time-trial-button"
					onClick={(e) => {
						e.stopPropagation();
						navigate(`/play/${name.toLowerCase()}/time-trial`);
					}}
				></button>
			</StyledTooltip>
		</StyledModeContainer>
	);
}

export default ModeContainer;
