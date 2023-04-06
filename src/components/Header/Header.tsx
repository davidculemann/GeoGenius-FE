import Button from "../shared/Button";
import styled from "styled-components";
import { useState } from "react";
import { appRoot } from "../../App";
import AuthModal from "./AuthModal";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		display: flex;
		letter-spacing: 0.1rem;
		i {
			font-size: 2.8rem;
			margin-top: 2.5rem;
		}
	}
	.auth-section {
		display: flex;
		gap: 0.8rem;
	}
`;

export default function Header() {
	const [authMode, setAuthMode] = useState<string | null>(null);

	return (
		<NavContainer className="header">
			<Link to="/">
				<h1 className="logo">
					Ge
					<i className="fa-solid fa-earth-americas" />
					Genius
				</h1>
			</Link>
			<div className="auth-section">
				<Button label="Login" onClick={() => setAuthMode("Log in")} />
				<Button
					label="Registration"
					color={"var(--secondary-green)"}
					onClick={() => setAuthMode("Sign up")}
				/>
			</div>
			{authMode &&
				ReactDOM.createPortal(
					<AuthModal authMode={authMode} setAuthMode={setAuthMode} />,
					appRoot as HTMLElement
				)}
		</NavContainer>
	);
}
