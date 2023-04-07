import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = styled.div`
	width: 100%;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	place-items: center;
	padding: 2rem;

	h1 {
		font-size: 18px;
	}
`;

export default () => {
	return (
		<PageNotFound>
			<h1>We can't find the page you're looking for :/</h1>
			<Link to="/">
				<button>Back to Home</button>
			</Link>
		</PageNotFound>
	);
};
