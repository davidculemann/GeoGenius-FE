import styled from "styled-components";

const StyledIconButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.2rem;
	height: 3.2rem;
	border-radius: 0.8rem;
	background-color: transparent;
	transition: background-color 0.2s ease-in-out;
	&:hover {
		background-color: var(--dark-shade);
	}
`;

interface IconButtonProps {
	icon: string;
	onClick: () => void;
}

function IconButton({ icon, onClick }: IconButtonProps) {
	return (
		<StyledIconButton onClick={onClick}>
			<i className={icon} />
		</StyledIconButton>
	);
}

export default IconButton;
