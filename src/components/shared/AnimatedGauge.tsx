import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import styled from "styled-components";

const StyledGauge = styled.div`
	width: 12rem;
	height: 12rem;
	@media (hover: none) and (pointer: coarse) {
		width: 16rem;
		height: 16rem;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	> p {
		position: absolute;
		font-size: 3.2rem;
		font-weight: 600;
	}
`;

interface GaugeProps {
	timeRemaining: number;
	setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
	onTimeUp: (interval: number) => void;
}

const AnimatedGauge = ({
	timeRemaining,
	setTimeRemaining,
	onTimeUp,
}: GaugeProps) => {
	const gaugeRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<lottie.AnimationItem | null>(null);
	const [animationLoaded, setAnimationLoaded] = useState(false);
	const intervalId = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!animationLoaded) return;
		intervalId.current = setInterval(() => {
			setTimeRemaining((prev) => {
				console.log(prev);
				if (prev === 0) {
					clearInterval(intervalId.current!);
					onTimeUp(500);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => {
			if (intervalId.current) clearInterval(intervalId.current);
		};
	}, [animationLoaded]);

	useEffect(() => {
		animationRef.current = lottie.loadAnimation({
			container: gaugeRef.current as Element,
			renderer: "svg",
			loop: false,
			autoplay: true,
			path: "/animations/timer.json",
		});
		animationRef.current?.setSpeed(0.48);
		animationRef.current?.addEventListener("DOMLoaded", () => {
			setAnimationLoaded(true);
		});
		return () => {
			animationRef.current?.destroy();
		};
	}, []);

	return (
		<>
			<StyledGauge ref={gaugeRef}>
				<p>{timeRemaining}</p>
			</StyledGauge>
		</>
	);
};

export default AnimatedGauge;
