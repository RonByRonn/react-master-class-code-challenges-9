import { motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BiggerBox = styled.div`
	width: 600px;
	height: 600px;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* overflow: hidden; */
`;

const Box = styled(motion.div)`
	width: 200px;
	height: 200px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
	hover: { scale: 1.5, rotateZ: 90 },
	click: { scale: 1, borderRadius: "100px" },
	drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 10 } },
};

function App() {
	const biggerBoxRef = useRef<HTMLDivElement>(null);
	return (
		<Wrapper>
			{/* 아래 whileDrag의 백그라운드 컬러에 그냥 "블루" 같은 스트링을 적으면 색상 변화에 애니메이션이 없음. rgb나 rgba로 숫자를 적어야 함 */}
			<BiggerBox ref={biggerBoxRef}>
				<Box
					// drag="x"
					drag
					// dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
					dragConstraints={biggerBoxRef}
					dragSnapToOrigin
					dragElastic={0.5}
					variants={boxVariants}
					whileHover="hover"
					whileDrag="drag"
					whileTap="click"
				/>
			</BiggerBox>
		</Wrapper>
	);
}

export default App;
