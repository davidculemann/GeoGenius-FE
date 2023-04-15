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

interface CountryData {
	countryCode: string;
	gdp?: string;
	population?: string;
	area?: string;
	literacy?: string;
	[key: string]: string | undefined;
}

export const IconsMapping: Partial<CountryData> = {
	gdp: "fa-solid fa-sack-dollar",
	population: "fas fa-people-group",
	area: "fas fa-street-view",
	literacy: "fas fa-book-reader",
};

type mode = "gdp" | "population" | "area" | "literacy";
interface ModeIcons {
	[key: string]: mode;
}

export const MapIconToMode: ModeIcons = {
	"fa-solid fa-sack-dollar": "gdp",
	"fas fa-people-group": "population",
	"fas fa-street-view": "area",
	"fas fa-book-reader": "literacy",
};
