import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./pages/Coin";
import Coins from "./pages/Coins";

interface IRouterProps {
	toggleDark: () => void;
	isDark: boolean;
}

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/:coinId">
					<Coin />
				</Route>
				<Route path="/">
					<Coins />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
