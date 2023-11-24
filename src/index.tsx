import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import App from "./App";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  	@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400&display=swap');
	${reset}
	* {
		box-sizing: border-box;
	}
	body {
		font-weight: 300;
		font-family: 'Source Code Pro', monospace;
		color: black;
		line-height: 1.2;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
`;

const client = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<RecoilRoot>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</RecoilRoot>
	// </React.StrictMode>
);
