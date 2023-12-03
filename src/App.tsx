import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path={["/search"]}>
					<Search />
				</Route>
				<Route path={["/tv", "/tv/:tvShowId"]}>
					<Tv />
				</Route>

				{/* path="/"는 맨끝에 넣어야 함 */}
				<Route path={["/", "/movies/:movieId"]}>
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
