import Button from "../shared/Button";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { appRoot } from "../../App";
import AuthModal from "./AuthModal";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import IconButton from "../shared/IconButton";
import { useAppDispatch, useAppSelector } from "../../logic/hooks";
import { getUserScores } from "../../logic/actions";
import { setCurrentUser, setUserScores } from "../../logic/reducer";

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
		align-items: center;
	}
`;

export default function Header() {
	const [authMode, setAuthMode] = useState<string | null>(null);
	const currentUser = useAppSelector((state) => state.currentUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			dispatch(
				setCurrentUser(
					user
						? {
								displayName: user.displayName,
								email: user.email,
								uid: user.uid,
						  }
						: null
				)
			);
			if (user)
				getUserScores(user.uid).then((res) => {
					dispatch(setUserScores(res));
				});
			else dispatch(setUserScores(null));
		});
		return () => {
			unsubscribe();
		};
	}, []);

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
				{currentUser ? (
					<>
						<div className="current-user">
							{currentUser.displayName}
						</div>
						<IconButton
							icon="fa-solid fa-sign-out-alt"
							onClick={() => {
								auth.signOut();
								dispatch({
									type: "SET_CURRENT_USER",
									payload: null,
								});
							}}
							tooltip="Sign out"
						/>
					</>
				) : (
					<>
						<Button
							label="Log in"
							onClick={() => setAuthMode("Log in")}
							variant="secondary"
						/>
						<Button
							label="Register"
							variant="primary"
							onClick={() => setAuthMode("Sign up")}
						/>
					</>
				)}
			</div>
			{authMode &&
				ReactDOM.createPortal(
					<AuthModal authMode={authMode} setAuthMode={setAuthMode} />,
					appRoot as HTMLElement
				)}
		</NavContainer>
	);
}
