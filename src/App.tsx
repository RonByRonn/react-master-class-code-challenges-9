import {
	motion,
	useMotionValue,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
	height: 200vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238)); */
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
	const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
	const gradient = useTransform(
		x,
		[-800, 800],
		[
			"linear-gradient(135deg, rgb(0, 238, 238), rgb(8, 0, 238))",
			"linear-gradient(135deg, rgb(0, 238, 135), rgb(238, 234, 0))",
		]
	);
	const { scrollY, scrollYProgress } = useScroll();
	const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

	useMotionValueEvent(scrollY, "change", (latest) => {
		console.log("scrollY: ", latest);
	});

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		console.log("scrollYProgress: ", latest);
	});

	return (
		<Wrapper style={{ background: gradient }}>
			<Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
		</Wrapper>
	);
}

export default App;
