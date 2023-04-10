import "./styles/index.less";
import App from "./App";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./logic/store";

const theme = createTheme({
	typography: {
		fontSize: 16, // Set the default font size to 16px
		htmlFontSize: 10, // Set the base font size to 10px
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</StyledEngineProvider>
);
