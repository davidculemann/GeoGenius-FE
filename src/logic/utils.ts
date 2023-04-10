export const getFlagEmoji = (countryCode: string) =>
	String.fromCodePoint(
		...[...countryCode.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0))
	);

export const getCountryName = (countryCode: string) => {
	const regionName = new Intl.DisplayNames(["en"], { type: "region" });
	return regionName.of(countryCode);
};

export const capitaliseModeName = (modeName: string) => {
	if (modeName === "gdp") return "GDP";
	return modeName[0].toUpperCase() + modeName.slice(1);
};

export const formatMetricNumber = (
	number: number | string,
	metricName: string
) => {
	if (typeof number === "string") number = parseFloat(number);
	if (metricName === "population" || metricName === "area")
		return number.toLocaleString("en-US", { maximumFractionDigits: 0 });
	return number.toLocaleString("en-US", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});
};
