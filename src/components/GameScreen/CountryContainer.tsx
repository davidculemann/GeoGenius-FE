import styled from "styled-components";
import { useEffect } from "react";
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
	nextCountryCode?: string;
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
		@media (hover: none) and (pointer: coarse) {
			padding: 1.6rem;
			img {
				height: 28rem;
				width: 28rem;
			}
		}
	}
	.country-info-container {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		font-size: 1.8rem;
		width: 100%;

		@media (hover: none) and (pointer: coarse) {
			flex-direction: row;
			align-items: baseline;
			justify-content: center;
			&.hidden {
				display: grid;
				grid-template-columns: 1fr 1fr;
				align-items: baseline;
				.country-name {
					margin-left: auto;
				}
			}
		}
		@media (hover: hover) and (pointer: fine) {
			.metric-container:not(.hidden) {
				justify-content: center;
			}
			.metric-container.hidden {
				margin-left: calc(50% - 5.6rem);
			}
		}
		.country-name {
			text-align: center;
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
	nextCountryCode,
	metricNumber,
	metricName,
	hidden,
}: CountryContainerProps) {
	const rightCountry = hidden !== undefined;

	useEffect(() => {
		if (nextCountryCode) {
			const image = new Image();
			image.src = `/images/countries/${nextCountryCode.toLocaleLowerCase()}/vector.svg`;
		}
	}, [countryCode]);

	return (
		<StyledCountryContainer>
			<div className="image-container">
				<img
					src={`/images/countries/${countryCode.toLocaleLowerCase()}/vector.svg`}
					alt={`Map image of ${countryCode}`}
				/>
			</div>
			<div
				className={`country-info-container ${
					rightCountry ? "hidden" : ""
				}`}
			>
				<div className="country-name">
					{getFlagEmoji(countryCode)} {getCountryName(countryCode)}
				</div>
				<div
					className={`metric-container ${
						rightCountry ? "hidden" : ""
					}`}
				>
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
