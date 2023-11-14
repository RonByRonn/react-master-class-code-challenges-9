import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./pages/Coin";
import Coins from "./pages/Coins";

interface IRouterProps {
	toggleDark: () => void;
	isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/:coinId">
					<Coin isDark={isDark} />
				</Route>
				<Route path="/">
					<Coins toggleDark={toggleDark} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
