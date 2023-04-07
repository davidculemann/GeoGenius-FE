import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
	border-radius: 1.8rem;
	background-color: ${(props) => props.color || "transparent"};
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.2rem;
	padding: 0 1.2rem;
	color: ${(props) => (props.color ? "#000" : "#fff")};
	font-weight: 600;
	font-size: 1.4rem;
	i {
		margin: ${(props) =>
			props.trailing ? "0 0.8rem 0 0" : "0 0 0 0.8rem"};
	}
`;

type ButtonProps = {
	color?: string;
	label?: string;
	onClick?: () => void;
	icon?: string | undefined;
	trailing?: boolean | undefined;
	className?: string;
};

export default function Button({
	color,
	onClick,
	label,
	icon,
	trailing,
	className,
}: ButtonProps) {
	return (
		<StyledButton
			trailing={trailing}
			color={color}
			onClick={onClick}
			className={className || ""}
		>
			{trailing && icon && <i className={icon}></i>}
			{label}
			{!trailing && icon && <i className={icon}></i>}
		</StyledButton>
	);
}
