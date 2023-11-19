import {
	motion,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from "framer-motion";
import styled from "styled-components";

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled(motion.div)`
	width: 200px;
	height: 200px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
	const x = useMotionValue(0);
	const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
	// 이 x는 단순 콘솔 로그로 변화 추적이 안된다. 왜냐하면 x가 바뀔 때마다 렌더링이 일어나는 것을 막기 위해, 리액트 월드가 아닌 곳에 x가 위치하기 때문.
	useMotionValueEvent(scale, "change", (l) => {
		console.log(l);
	});
	return (
		<Wrapper>
			<button onClick={() => x.set(200)}>click me</button>
			<Box style={{ x, scale }} drag="x" dragSnapToOrigin />
		</Wrapper>
	);
}

export default App;
