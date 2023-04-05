import DeletingText from "./DeletingText";
import styled from "styled-components";

const StyledLanding = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 1.6rem;
`;

function Landing() {
	return (
		<StyledLanding>
			<DeletingText
				textOptions={["land area", "GDP", "literacy", "population"]}
			/>
		</StyledLanding>
	);
}

export default Landing;
