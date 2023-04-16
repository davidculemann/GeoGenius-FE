import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IconsMapping } from "../../../logic/utils";
import { capitaliseModeName } from "../../../logic/utils";
import { useEffect, useRef } from "react";

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
					opacity: 0;
				}
			}
		}
		p {
			font-size: 1.6rem;
		}
	}
	.time-trial-button {
		transition: opacity 0.2s ease-in-out;
		margin-left: auto;
		@media (hover: hover) {
			opacity: 0;
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
}

function ModeContainer({ mode }: ModeProps) {
	const { name, description } = mode;
	const buttonRef = useRef<HTMLButtonElement>(null);
	const navigate = useNavigate();

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
			<button
				ref={buttonRef}
				className="time-trial-button"
				onClick={(e) => {
					e.stopPropagation();
					navigate(`/play/${name.toLowerCase()}/time-trial`);
				}}
			></button>
		</StyledModeContainer>
	);
}

export default ModeContainer;
