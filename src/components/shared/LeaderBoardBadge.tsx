import styled, { keyframes } from "styled-components";

interface BadgeProps {
	rank: number;
}

const gradient = keyframes`
    0% {
        background-position: 0% 92%;
    }
    50% {
        background-position: 100% 9%;
    }
    100% {
        background-position: 0% 92%;
    }
`;

const StyledLeaderBoardBadge = styled.div<BadgeProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	i:before {
		font-size: 2.4rem;
		background: ${(props) => {
			switch (props.rank) {
				case 1:
					return "linear-gradient(225deg, #D4AF37,#c19a1b, #a6861d) 0% 0% / 200% 200%;";
				case 2:
					return "linear-gradient(225deg, #C0C0C0, #b1b1b1, #8d8d8d) 0% 0% / 200% 200%;";
				case 3:
					return "linear-gradient(225deg, #CD7F32, #b76f26, #9d5a17) 0% 0% / 200% 200%";
			}
		}};
		animation: ${gradient} 4s ease infinite;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	p {
		position: absolute;
		font-size: 1.6rem;
		color: #fff;
		font-weight: 600;
	}
`;

function LeaderBoardBadge({ rank }: { rank: number }) {
	return (
		<StyledLeaderBoardBadge rank={rank}>
			<i className="fa-solid fa-certificate"></i>
			<p>{rank}</p>
		</StyledLeaderBoardBadge>
	);
}

export default LeaderBoardBadge;
