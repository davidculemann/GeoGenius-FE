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
	if (modeName === "timetrial") return "Time Trial";
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
	timetrial: "fas fa-hourglass-half",
};

type mode = "gdp" | "population" | "area" | "literacy" | "timetrial";

interface ModeIcons {
	[key: string]: mode;
}

export const MapIconToMode: ModeIcons = {
	"fa-solid fa-sack-dollar": "gdp",
	"fas fa-people-group": "population",
	"fas fa-street-view": "area",
	"fas fa-book-reader": "literacy",
	"fas fa-hourglass-half": "timetrial",
};

interface SetErrorProps {
	error: any;
	setEmailError: React.Dispatch<React.SetStateAction<string>>;
	setPasswordError: React.Dispatch<React.SetStateAction<string>>;
	setUsernameError: React.Dispatch<React.SetStateAction<string>>;
}

export const handleSetError = ({
	error,
	setEmailError,
	setPasswordError,
	setUsernameError,
}: SetErrorProps) => {
	switch (error.code) {
		case "invalid-email":
			setEmailError("Invalid email address");
			break;
		case "no-email":
			setEmailError("Missing email address");
			break;
		case "auth/email-already-in-use":
			setEmailError("Email already in use");
			break;
		case "auth/email-already-exists":
			setEmailError("Email already exists");
			break;
		case "auth/user-not-found":
			setEmailError("User not found");
			break;
		case "auth/weak-password":
			setPasswordError("Weak password");
			break;
		case "auth/wrong-password":
			setPasswordError("Wrong password");
			break;
		case "no-password":
			setPasswordError("Missing password");
			break;
		case "invalid-password":
			setPasswordError("Invalid password");
			break;
		case "auth/invalid-username":
			setUsernameError("Invalid username");
			break;
		case "no-username":
			setUsernameError("Missing username");
			break;
		case "username-already-in-use":
			setUsernameError("Username already in use");
			break;
		default:
			switch (error.message) {
				case "INVALID_EMAIL":
					setEmailError("Invalid email address");
					break;
				case "INVALID_PASSWORD":
					setPasswordError("Invalid password");
					break;
				case "MISSSING_PASSWORD":
					setPasswordError("Missing password");
					break;
				default:
					break;
			}
			break;
	}
};
