import Header from "./components/Header/Header";
import Landing from "./components/Landing/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/shared/PageNotFound";
import Footer from "./components/Footer";
import GameScreen from "./components/GameScreen/GameScreen";

export const appRoot = document.getElementById("root");

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route
						path="/play/:mode/:customisation?"
						element={<GameScreen />}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
