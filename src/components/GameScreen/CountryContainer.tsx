import styled from "styled-components";
import {
	capitaliseModeName,
	formatMetricNumber,
	getCountryName,
	getFlagEmoji,
} from "../../logic/utils";
import AnimatedMetricNumber from "../shared/AnimatedMetricNumber";

interface CountryContainerProps {
	countryCode: string;
	metricNumber: string;
	metricName: string;
	hidden?: boolean;
}

const StyledCountryContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	.image-container {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 0.1rem solid var(--light-border-color);
		padding: 3.2rem;
		gap: 1.6rem;
		img {
			height: 32rem;
			width: 32rem;
		}
	}
	.country-info-container {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		font-size: 1.8rem;
		@media (hover: none) and (pointer: coarse) {
			flex-direction: row;
			align-items: baseline;
		}
		.metric-container {
			display: flex;
			align-items: baseline;
			gap: 0.8rem;
			.metric-number {
				font-weight: 700;
				font-size: 2.4rem;
			}
		}
	}
`;

function CountryContainer({
	countryCode,
	metricNumber,
	metricName,
	hidden,
}: CountryContainerProps) {
	return (
		<StyledCountryContainer>
			<div className="image-container">
				<img
					src={`/images/countries/${countryCode.toLocaleLowerCase()}/vector.svg`}
					alt={`Map image of ${countryCode}`}
				/>
			</div>
			<div className="country-info-container">
				<div className="country-name">
					{getFlagEmoji(countryCode)} {getCountryName(countryCode)}
				</div>
				<div className="metric-container">
					{capitaliseModeName(metricName)}
					{metricName === "gdp" && !hidden && <span>$ </span>}
					<span className="metric-number">
						{hidden ? (
							"?"
						) : hidden === undefined ? (
							<span>
								{formatMetricNumber(metricNumber, metricName)}
							</span>
						) : (
							<AnimatedMetricNumber
								metricNumber={parseFloat(metricNumber)}
								duration={1000}
								type={metricName}
							/>
						)}
					</span>{" "}
					{metricName === "area" && !hidden && (
						<span>
							km<sup>2</sup>{" "}
						</span>
					)}
					{metricName === "literacy" && !hidden && <span>% </span>}
				</div>
			</div>
		</StyledCountryContainer>
	);
}

export default CountryContainer;
