import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.backgroundColor};
`;

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% { 
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Emoji = styled.div`
	font-size: 80px;
`;

const Box = styled.div`
	height: 200px;
	width: 200px;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.textColor};
	animation: ${rotation} linear infinite 2s;
	display: flex;
	${Emoji}:hover {
		font-size: 160px;
	}
`;

function App() {
	return (
		<Wrapper>
			<Box>
				<Emoji as="p">😎</Emoji>
			</Box>
		</Wrapper>
	);
}

export default App;
