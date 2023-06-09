import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/base";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import {
	firebaseLogin,
	firebaseSignup,
	passwordResetEmail,
} from "../../logic/actions";
import LoadingButton from "../shared/LoadingButton";
import { handleSetError } from "../../logic/utils";
import lottie from "lottie-web";

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
	z-index: 10000;
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
	.success-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		opacity: 0;
		transition: opacity 0.2s linear;
		background-color: #fff;
		z-index: 2;
		&.success {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
`;

interface AuthProps {
	authMode: string;
	setAuthMode: (mode: string) => void;
}

function AuthModal({ authMode, setAuthMode }: AuthProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [authPending, setAuthPending] = useState(false);
	const animationRef = useRef<any>(null);
	const successOverlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showSuccessOverlay) {
			animationRef.current = lottie.loadAnimation({
				container: successOverlayRef.current as Element,
				renderer: "svg",
				loop: false,
				autoplay: true,
				path: "/animations/thank-you.json",
			});
			animationRef.current.setSpeed(0.75);
		} else if (animationRef.current) {
			animationRef.current?.destroy();
		}
		return () => animationRef.current?.destroy();
	}, [showSuccessOverlay]);

	const handleSignup = async () => {
		setAuthPending(true);
		const res = await firebaseSignup({
			email,
			password,
			username,
		});
		if ("code" in res) {
			console.log(`Error ${res.code}: ${res.message}`);
			handleSetError({
				error: res,
				setEmailError,
				setPasswordError,
				setUsernameError,
			});
		} else {
			setShowSuccessOverlay(true);
			setTimeout(() => setAuthMode(""), 4000);
		}
		setAuthPending(false);
	};

	const handleLogin = async () => {
		setAuthPending(true);
		const res = await firebaseLogin({ email, password });
		if ("code" in res) {
			console.error(`Error ${res.code}: ${res.message}`);
			handleSetError({
				error: res,
				setEmailError,
				setPasswordError,
				setUsernameError,
			});
		} else {
			setAuthMode("");
		}
		setAuthPending(false);
	};

	const handleSendPasswordResetEmail = async () => {
		setAuthPending(true);
		try {
			await passwordResetEmail(email);
			setAuthPending(false);
			setAuthMode("Log in");
		} catch {
			setEmailError("Email not found");
			setAuthPending(false);
		}
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
							<TextField
								label="Username"
								variant="standard"
								helperText={usernameError}
								id="username-input"
								autoFocus={true}
								autoComplete={"username"}
								required={true}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								error={!!usernameError}
							/>
						)}
						<TextField
							label="Email"
							variant="standard"
							id="email-input"
							autoComplete={"email"}
							helperText={emailError}
							type="email"
							autoFocus={authMode !== "Sign up"}
							required={true}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={!!emailError}
						/>
						{authMode !== "Reset password" && (
							<TextField
								label="Password"
								variant="standard"
								id="standard-adornment-password"
								helperText={passwordError}
								autoComplete="current-password webauthn"
								type={showPassword ? "text" : "password"}
								required={true}
								error={!!passwordError}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								InputProps={{
									endAdornment: (
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
									),
								}}
							/>
						)}
						<LoadingButton
							variant="primary"
							label={authMode}
							className="auth-button"
							loading={authPending}
							onClick={
								authMode === "Log in"
									? () => handleLogin()
									: authMode === "Sign up"
									? () => handleSignup()
									: () => handleSendPasswordResetEmail()
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
								<button
									onClick={() => setAuthMode("Sign up")}
									className="static"
								>
									Sign up
								</button>
							</>
						) : authMode === "Log in" ? (
							<>
								<span>Already have an account?</span>
								<button
									onClick={() => setAuthMode("Log in")}
									className="static"
								>
									Log in
								</button>
							</>
						) : (
							<>
								<span>Remember your password?</span>
								<button
									onClick={() => setAuthMode("Log in")}
									className="static"
								>
									Log in
								</button>
							</>
						)}
					</div>
					<div
						className={`success-overlay ${
							showSuccessOverlay ? "success" : ""
						}`}
						ref={successOverlayRef}
					></div>
				</div>
			</ClickAwayListener>
		</StyledModal>
	);
}

export default AuthModal;
