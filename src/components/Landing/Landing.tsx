import DeletingText from "./DeletingText";
import styled from "styled-components";
import GameSetup from "./GameSetup/GameSetup";
import Leaderboard from "./Leaderboard";

const StyledLanding = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	gap: 1.6rem;
	.landing-content__container {
		height: 100%;
		display: grid;
		grid-template-columns: 1fr min-content;
		gap: 1.6rem;
		@media (hover: none) and (pointer: coarse) {
			grid-template-columns: 1fr;
		}
	}
`;

function Landing() {
	return (
		<StyledLanding>
			<DeletingText
				textOptions={["land area", "GDP", "literacy", "population"]}
			/>
			<div className="landing-content__container">
				<GameSetup />
				{/* <Leaderboard /> */}
			</div>
		</StyledLanding>
	);
}

export default Landing;
