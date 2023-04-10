import { animated, useSpring } from "react-spring";
import { formatMetricNumber } from "../../logic/utils";

interface AnimatedMetricNumberProps {
	metricNumber: string | number;
	duration: number;
	type: string;
}

function AnimatedMetricNumber({
	metricNumber,
	duration,
	type,
}: AnimatedMetricNumberProps) {
	const { value } = useSpring({
		from: { value: 0 },
		to: { value: metricNumber },
		config: { duration: duration },
	});

	return (
		<animated.div>
			{value.to((value) => formatMetricNumber(value, type))}
		</animated.div>
	);
}

export default AnimatedMetricNumber;
