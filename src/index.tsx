import ReactDOM from "react-dom/client";
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
		background: linear-gradient(135deg, #e09, #d0e);
		color: black;
		line-height: 1.2;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
`;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<RecoilRoot>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<App />
		</ThemeProvider>
	</RecoilRoot>
	// </React.StrictMode>
);
