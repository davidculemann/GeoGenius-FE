import styled from "styled-components";

interface CountryContainerProps {
	countryCode: string;
	metricNumber: string;
}

const StyledCountryContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;
	img {
		height: 7.2rem;
		width: 7.2rem;
	}
`;

function CountryContainer({
	countryCode,
	metricNumber,
}: CountryContainerProps) {
	return (
		<StyledCountryContainer>
			<img
				src={`${process.env.PUBLIC_URL}/src/assets/images/countries/${countryCode}/vector.svg`}
				alt=""
			/>
			<h3>{metricNumber}</h3>
		</StyledCountryContainer>
	);
}

export default CountryContainer;
