import styled from "styled-components";
import ModeContainer from "./ModeContainer";
import { useState } from "react";

const StyledSetupContainer = styled.div`
	display: flex;
	width: 100%;
	height: fit-content;
	border-radius: 3.2rem;
	border: 0.1rem solid var(--light-border-color);
	filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.2));
	box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
	.left-container {
		padding: 2.6rem;
		width: 20rem;
		border-right: 0.1rem solid var(--light-border-color);
		border-radius: 3.2rem 0 0 3.2rem;
		background-color: var(--dark-shade);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.right-container {
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
		padding: 2.4rem;
		width: 100%;
	}
`;

const gameModes = [
	{
		name: "population",
		description: "Guess the country with the highest or lowest population",
	},
	{
		name: "area",
		description: "Guess the country with the largest or smallest area",
	},
	{
		name: "gdp",
		description: "Guess the country with the highest or lowest GDP",
	},
	{
		name: "literacy",
		description:
			"Guess the country with the highest or lowest literacy rate",
	},
];

function GameSetup() {
	const [customiseMode, setCustomiseMode] = useState("");

	return (
		<StyledSetupContainer>
			<h2 className="left-container">Choose Game Mode</h2>
			<div className="right-container">
				{gameModes.map((mode) => (
					<ModeContainer
						key={mode.name}
						mode={mode}
						setCustomiseMode={setCustomiseMode}
						customiseMode={customiseMode}
					/>
				))}
			</div>
		</StyledSetupContainer>
	);
}

export default GameSetup;
