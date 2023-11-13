import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Router from "./Router";

const Container = styled.div`
	background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
	color: ${(props) => props.theme.textColor};
`;

const GlobalStyle = createGlobalStyle`
  	@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400&display=swap');
	${reset}
	* {
		box-sizing: border-box;
	}
	body {
		font-family: 'Source Code Pro', monospace;
		background-color: ${(props) => props.theme.bgColor};
		color: ${(props) => props.theme.textColor};
		font-weight: 300;
		line-height: 1.2;
	}
	a {
		text-decoration: none;
		color: inherit;
	}
`;

function App() {
	return (
		<>
			{/* <Reset /> */}
			<GlobalStyle />
			<Router />
		</>
	);
}

export default App;
