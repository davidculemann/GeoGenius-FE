import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
					@media (hover: hover) and (pointer: fine) {
						opacity: 0;
					}
				}
			}
		}
		p {
			font-size: 1.6rem;
		}
	}
	.customise-button {
		background-color: transparent;
		border-radius: 1.6rem;
		display: flex;
		width: 3.2rem;
		margin-left: auto;
		padding: 1.2rem;
		cursor: pointer;
		position: relative;
		align-items: center;
		@media (hover: hover) and (pointer: fine) {
			opacity: 0;
			transition: opacity 0.2s ease-in-out, width 0.2s ease-in-out,
				background-color 0.2s ease-in-out;
			&::before {
				content: "Customise";
				font-size: 1.6rem;
				opacity: 0;
				transition: opacity 0.2s ease-in-out;
				position: absolute;
				right: 0.8rem;
			}
			&:hover {
				background-color: var(--dark-shade);
				width: 12rem;
				&::before {
					opacity: 1;
				}
				i {
					transition: transform 0.2s ease-in-out;
					transform: rotate(-360deg);
				}
			}
			&:not(:hover) i {
				transform: rotate(360deg);
			}
			i {
				transition: transform 0.3s ease-in-out;
				margin-right: 0.8rem;
				transform: rotate(0deg);
			}
		}
	}
	&:hover {
		.customise-button {
			opacity: 1;
		}
		border-color: var(--light-border-color-highlight);
		.game-mode__info .name-container i {
			opacity: 1;
		}
	}
`;

interface ModeProps {
	mode: { name: string; description: string; icon: string };
	setCustomiseMode: (mode: string) => void;
	customiseMode: string;
}

function ModeContainer({ mode, setCustomiseMode, customiseMode }: ModeProps) {
	const { name, description, icon } = mode;
	const navigate = useNavigate();

	return (
		<StyledModeContainer
			role="button"
			aria-label={`game-mode button ${name}`}
			onClick={() => navigate(`/play/${name.toLowerCase()}`)}
		>
			<div className="game-mode__icon">
				<i className={`fas ${icon}`}></i>
			</div>
			<div className="game-mode__info">
				<div className="name-container">
					<h3>{name}</h3>
					<div className="icon-container">
						<i className="fa-solid fa-chevron-up fa-bounce"></i>
					</div>
				</div>
				<p>{description}</p>
			</div>
			<button
				className="customise-button"
				onClick={(e) => {
					e.stopPropagation();
					setCustomiseMode(name);
				}}
			>
				<i className="fas fa-cog"></i>
			</button>
		</StyledModeContainer>
	);
}

export default ModeContainer;
