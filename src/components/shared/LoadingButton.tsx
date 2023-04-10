import lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
	border-radius: 1.8rem;
	background-color: ${(props) =>
		props.variant === "primary" ? "var(--secondary-green)" : "transparent"};
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.2rem;
	padding: 0 1.2rem;
	color: ${(props) => (props.variant === "primary" ? "#000" : "#fff")};
	font-weight: 600;
	font-size: 1.4rem;
	transition: background-color 0.1s linear;
	i {
		margin: ${(props) =>
			props.trailing ? "0 0.8rem 0 0" : "0 0 0 0.8rem"};
	}
	&:hover {
		background-color: ${(props) =>
			props.variant === "primary"
				? "var(--secondary-green-hover)"
				: "var(--dark-shade-2)"};
	}
`;

type ButtonProps = {
	variant?: string;
	label?: string;
	onClick?: () => void;
	icon?: string | undefined;
	trailing?: boolean | undefined;
	className?: string;
	loading?: boolean;
};

export default function LoadingButton({
	onClick,
	variant,
	label,
	icon,
	trailing,
	className,
	loading,
}: ButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const animationRef = useRef<lottie.AnimationItem | null>(null);
	const [contentVisible, setContentVisible] = useState(true);

	useEffect(() => {
		if (loading) {
			setContentVisible(false);
			animationRef.current = lottie.loadAnimation({
				container: buttonRef.current as Element,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: "/animations/loading-animation.json",
			});
		} else if (animationRef.current) {
			animationRef.current?.destroy();
			setContentVisible(true);
		}
		return () => animationRef.current?.destroy();
	}, [loading]);

	return (
		<StyledButton
			ref={buttonRef}
			trailing={trailing}
			variant={variant}
			onClick={onClick}
			className={className || ""}
			disabled={loading}
		>
			{contentVisible && (
				<div>
					{trailing && icon && <i className={icon}></i>}
					{label}
					{!trailing && icon && <i className={icon}></i>}
				</div>
			)}
		</StyledButton>
	);
}
