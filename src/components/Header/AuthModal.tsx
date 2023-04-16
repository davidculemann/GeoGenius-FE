import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "../shared/Button";
import { ClickAwayListener } from "@mui/base";
import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { useState } from "react";
import {
	firebaseLogin,
	firebaseSignup,
	passwordResetEmail,
} from "../../logic/actions";
import LoadingButton from "../shared/LoadingButton";

const blurIn = keyframes`
	from {
		backdrop-filter: blur(0);
	}
	to {
		backdrop-filter: blur(1rem);
	}
`;

const StyledModal = styled.div`
	color: #000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	backdrop-filter: blur(1rem);
	animation: ${blurIn} 0.2s linear;
	.modal__content {
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		position: absolute;
		height: 50rem;
		width: 50rem;
		top: calc(50% - 25rem);
		background-color: #fff;
		.auth-button {
			margin-top: 1.6rem;
		}
		.auth-fields {
			display: flex;
			flex-direction: column;
			gap: 2.4rem;
			width: 60%;
			.forgot-password {
				font-size: 1.4rem;
				opacity: 0.75;
				transition: opacity 0.1s linear;
			}
		}
		.reset-password-message {
			font-size: 1.4rem;
			opacity: 0.75;
		}
		.alternative-action {
			font-size: 1.4rem;
			opacity: 0.75;
			margin-top: auto;
			button {
				background: none;
				border: none;
				margin-left: 0.4rem;
				color: #4101f8;
				text-decoration: underline;
			}
		}
	}
`;

interface AuthProps {
	authMode: string;
	setAuthMode: (mode: string) => void;
}

function AuthModal({ authMode, setAuthMode }: AuthProps) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [authPending, setAuthPending] = useState(false);

	const handleSetError = (error: any) => {
		console.log(error);
		switch (error.code) {
			case "invalid-email":
				setEmailError(error.message || error.code);
				break;
			case "auth/weak-password":
				setPasswordError(error.message || error.code);
				break;
			case "auth/email-already-in-use":
				setEmailError(error.message || error.code);
				break;
			case "auth/email-already-exists":
				setEmailError(error.message || error.code);
				break;
			case "auth/user-not-found":
				setEmailError(error.message || error.code);
				break;
			case "auth/wrong-password":
				setPasswordError(error.message || error.code);
				break;
			case "auth/invalid-username":
				setUsernameError(error.message || error.code);
				break;
			case "username-already-in-use":
				setUsernameError(error.message || error.code);
				break;
			default:
				break;
		}
	};

	const handleSignup = async () => {
		setAuthPending(true);
		const res = await firebaseSignup({
			email,
			password,
			username,
		});
		if ("code" in res) {
			console.log(`Error ${res.code}: ${res.message}`);
			handleSetError(res);
		} else {
			setAuthMode("");
		}
		setAuthPending(false);
	};

	const handleLogin = async () => {
		setAuthPending(true);
		const res = await firebaseLogin({ email, password });
		if ("code" in res) {
			console.error(`Error ${res.code}: ${res.message}`);
			handleSetError(res);
		} else {
			setAuthMode("");
		}
		setAuthPending(false);
	};

	const handleSendPasswordResetEmail = async () => {
		setAuthPending(true);
		await passwordResetEmail(email);
		setAuthPending(false);
		setAuthMode("Log in");
	};

	return (
		<StyledModal
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<ClickAwayListener onClickAway={() => setAuthMode("")}>
				<div className="modal__content">
					<h1>{authMode}</h1>
					<div className="auth-fields">
						{authMode === "Sign up" && (
							<FormControl variant="standard">
								<InputLabel
									htmlFor="username-input"
									sx={{ zIndex: 2 }}
								>
									Username
								</InputLabel>
								<Input
									id="username-input"
									autoFocus={true}
									autoComplete={"username"}
									required={true}
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									error={!!usernameError}
								/>
							</FormControl>
						)}
						<FormControl variant="standard">
							<InputLabel
								htmlFor="email-input"
								sx={{ zIndex: 2 }}
							>
								Email
							</InputLabel>
							<Input
								id="email-input"
								autoComplete={"email"}
								type="email"
								autoFocus={authMode !== "Sign up"}
								required={true}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								error={!!emailError}
							/>
						</FormControl>
						{authMode !== "Reset password" && (
							<FormControl variant="standard">
								<InputLabel
									htmlFor="standard-adornment-password"
									sx={{ zIndex: 2 }}
								>
									Password
								</InputLabel>
								<Input
									id="standard-adornment-password"
									autoComplete="current-password webauthn"
									type={showPassword ? "text" : "password"}
									required={true}
									error={!!passwordError}
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={
													handleClickShowPassword
												}
												edge="end"
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
						)}
						<LoadingButton
							variant="primary"
							label={authMode}
							className="auth-button"
							loading={authPending}
							onClick={
								authMode === "Log in"
									? () => {
											handleLogin();
									  }
									: authMode === "Sign up"
									? () => {
											handleSignup();
									  }
									: () => {
											handleSendPasswordResetEmail();
									  }
							}
						/>
						{authMode === "Log in" && (
							<button
								className="forgot-password"
								onClick={() => {
									setAuthMode("Reset password");
								}}
							>
								forgot password?
							</button>
						)}
						{authMode === "Reset password" && (
							<p className="reset-password-message">
								You will receive an email with a reset link.
							</p>
						)}
					</div>
					<div className="alternative-action">
						{authMode === "Log in" ? (
							<>
								<span>Don't have an account?</span>
								<button onClick={() => setAuthMode("Sign up")}>
									Sign up
								</button>
							</>
						) : authMode === "Log in" ? (
							<>
								<span>Already have an account?</span>
								<button onClick={() => setAuthMode("Log in")}>
									Log in
								</button>
							</>
						) : (
							<>
								<span>Remember your password?</span>
								<button onClick={() => setAuthMode("Log in")}>
									Log in
								</button>
							</>
						)}
					</div>
				</div>
			</ClickAwayListener>
		</StyledModal>
	);
}

export default AuthModal;
