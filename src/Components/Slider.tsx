import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IGetMoviesResult, IGetTvShowsResult, IMovie, ITvShow } from "../api";
import { sliderTitleState } from "../atoms";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	margin-bottom: 100px;
	position: relative;
	top: -300px;
	height: 200px;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	margin-bottom: 5px;
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 40px;
	width: 100%;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
	cursor: pointer;
`;

const Info = styled(motion.h4)`
	width: 100%;
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	position: absolute;
	bottom: 0;
	opacity: 0;
	h4 {
		text-align: center;
		font-size: 16px;
	}
`;

const ChevronLeftWrapper = styled(motion.div)`
	position: absolute;
	z-index: 2;
	display: flex;
	align-items: center;
	font-size: 32px;
	padding: 0 32px;
	height: 100%;
	background: linear-gradient(
		to right,
		rgba(0, 0, 0, 1),
		rgba(255, 255, 255, 0)
	);
	cursor: pointer;
`;

const ChevronRightWrapper = styled(motion.div)`
	position: absolute;
	z-index: 2;
	display: flex;
	align-items: center;
	font-size: 32px;
	padding: 0 32px;
	height: 100%;
	right: 0%;
	background: linear-gradient(
		to left,
		rgba(0, 0, 0, 1),
		rgba(255, 255, 255, 0)
	);
	cursor: pointer;
`;

const SliderTitle = styled.h1`
	font-size: 24px;
	margin: 12px 24px;
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth - 10,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth + 10,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.5,
		y: -64,
		transition: {
			delay: 0.5,
			duration: 0.2,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.2,
			type: "tween",
		},
	},
};

const offset = 6;

interface ISliderProps {
	sliderTitle: string;
	data: IGetMoviesResult | IGetTvShowsResult;
}

function Slider({ data, sliderTitle }: ISliderProps) {
	const history = useHistory();
	const location = useLocation();
	const [leaving, setLeaving] = useState(false);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onExitComplete = () => {
		setIsLeft(null);
		toggleLeaving();
	};
	const onBoxClicked = (movieId: number) => {
		// if (location.pathname === "/search") {
		// 	(data as IGetMoviesResult).results[0].title !== undefined
		// 		? history.push(
		// 				`${location.pathname + location.search}&movie=${movieId}`
		// 		  )
		// 		: history.push(`${location.pathname + location.search}&tv=${movieId}`);
		// }
		if (location.pathname !== "/search") {
			(data as IGetMoviesResult).results[0].title !== undefined
				? history.push(`/movies/${movieId}`)
				: history.push(`/tv/${movieId}`);
		} else {
			(data as IGetMoviesResult).results[0].title !== undefined
				? history.push(`/search${location.search}&movie=${movieId}`)
				: history.push(`/search${location.search}&tv=${movieId}`);
		}

		setSliderTitle(sliderTitle);
	};
	const [index, setIndex] = useState(0);
	const setSliderTitle = useSetRecoilState(sliderTitleState);
	const totalMovies = data.results.length - 1;
	const maxIndex = Math.max(Math.floor(totalMovies / offset) - 1, 0);
	const [isLeft, setIsLeft] = useState<boolean | null>(null);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			setIsLeft(false);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const decreaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			setIsLeft(true);
			setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
		}
	};

	return (
		<Wrapper>
			<SliderTitle>{sliderTitle}</SliderTitle>
			<AnimatePresence initial={false} onExitComplete={onExitComplete}>
				<ChevronLeftWrapper>
					<FaChevronLeft onClick={decreaseIndex} />
				</ChevronLeftWrapper>
				<ChevronRightWrapper>
					<FaChevronRight onClick={increaseIndex} />
				</ChevronRightWrapper>
				<Row
					variants={rowVariants}
					initial={isLeft ? "exit" : "hidden"}
					animate="visible"
					exit={isLeft ? "hidden" : "exit"}
					transition={{ type: "tween", duration: 1 }}
					key={index}
				>
					{data?.results
						.slice(1)
						.slice(offset * index, offset * index + offset)
						.map((movie) => (
							<Box
								layoutId={movie.id + sliderTitle}
								onClick={() => onBoxClicked(movie.id)}
								key={movie.id}
								whileHover="hover"
								initial="normal"
								variants={boxVariants}
								transition={{ type: "tween" }}
								bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
							>
								<Info variants={infoVariants}>
									<h4>
										{(movie as IMovie).title !== undefined
											? (movie as IMovie).title
											: (movie as ITvShow).name}
									</h4>
								</Info>
							</Box>
						))}
				</Row>
			</AnimatePresence>
		</Wrapper>
	);
}
export default Slider;
