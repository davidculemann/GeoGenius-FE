import { capitaliseModeName, getCountryName } from "../../logic/utils";
import AnimatedGauge from "../shared/AnimatedGauge";
import Button from "../shared/Button";
import { useState, useEffect } from "react";

interface VotingProps {
	rightCountryCode: string;
	leftCountryCode: string;
	mode: string;
	showModal: boolean;
	comparingMetric: boolean;
	handleVote: (isHigher: boolean) => void;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	timeTrial: boolean;
}

function VotingControls({
	rightCountryCode,
	leftCountryCode,
	mode,
	showModal,
	comparingMetric,
	handleVote,
	timeTrial,
	setShowModal,
}: VotingProps) {
	const [timeRemaining, setTimeRemaining] = useState(30);

	return (
		<div
			className={`voting-controls__container ${
				timeTrial ? "time-trial" : ""
			}`}
		>
			{timeTrial && (
				<div className="gauge__container">
					<AnimatedGauge
						timeRemaining={timeRemaining}
						setTimeRemaining={setTimeRemaining}
						onTimeUp={setShowModal}
					/>
				</div>
			)}
			<div className="voting-controls">
				<p>{getCountryName(rightCountryCode)} has a</p>
				<div className="button-container">
					<Button
						label="Higher"
						disabled={showModal || comparingMetric}
						onClick={() => {
							handleVote(true);
						}}
						variant="primary"
						icon="fa-solid fa-circle-arrow-up"
						className="voting-button"
					/>
					<Button
						label="Lower"
						disabled={showModal || comparingMetric}
						variant="primary"
						onClick={() => {
							handleVote(false);
						}}
						icon="fa-solid fa-circle-arrow-down"
						className="voting-button"
					/>
				</div>
				<p>
					{capitaliseModeName(mode)} than{" "}
					{getCountryName(leftCountryCode)}
				</p>
			</div>
		</div>
	);
}

export default VotingControls;
