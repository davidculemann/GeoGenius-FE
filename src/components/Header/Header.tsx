import Button from "../shared/Button";
import styled from "styled-components";

const NavContainer = styled.nav`
	display: flex;
	padding: 0.8rem 1.6rem;
	align-items: center;
	justify-content: space-between;
	.auth-section {
		display: flex;
		gap: 0.8rem;
		align-self: flex-end;
	}
`;

export default function Header() {
	return (
		<NavContainer className="header">
			<div className="nav-section"></div>
			<div className="auth-section">
				<Button label="Login" />
				<Button label="Registration" color={"green"} />
			</div>
		</NavContainer>
	);
}
