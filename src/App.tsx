import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
//in this file use reach router to route to different pages
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/shared/PageNotFound";

export const appRoot = document.getElementById("root");

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/play" element={<div>Game Coming Soon</div>} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
