import "./styles/index.less";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontSize: 16, // Set the default font size to 16px
		htmlFontSize: 10, // Set the base font size to 10px
	},
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</StyledEngineProvider>
	</React.StrictMode>
);
