import { AnimatePresence, motion, useScroll } from "framer-motion";
import queryString from "query-string";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Images from "../Components/Images";
import Slider from "../Components/Slider";
import {
	IGetMoviesResult,
	IGetTvShowsResult,
	searchMovie,
	searchTv,
} from "../api";
import { sliderTitleState } from "../atoms";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SliderWrapper = styled.div`
	position: relative;
	top: 200px;
	/* display: flex;
	flex-direction: column; */
	/* align-items: center; */
	/* justify-content: space-between; */
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;
const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`;

const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	position: relative;
	top: -80px;
`;

const BigOverview = styled.p`
	position: relative;
	top: -80px;
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
`;

const PosterWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Poster = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	width: 300px;
	height: 300px;
	/* height: 200px; */
	/* font-size: 40px; */
	/* width: 100%; */
	/* height: 100%; */
`;

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	const { data: movieData, isLoading: movieIsLoading } =
		useQuery<IGetMoviesResult>(["movie", keyword], () =>
			searchMovie(keyword as string)
		);
	const { data: tvData, isLoading: tvIsLoading } = useQuery<IGetTvShowsResult>(
		["tv", keyword],
		() => searchTv(keyword as string)
	);
	// console.log(tvData);
	const isLoading = movieIsLoading || tvIsLoading;
	const queryParams = queryString.parse(location.search);
	const movieId = queryParams.movie;
	const tvId = queryParams.tv;

	const history = useHistory();
	const onOverlayClick = () => history.goBack();
	const sliderTitle = useRecoilValue(sliderTitleState);
	const clickedMovie =
		movieId && movieData!.results.find((movie) => movie.id === +movieId);
	const clickedTv = tvId && tvData!.results.find((tv) => tv.id === +tvId);
	const { scrollY } = useScroll();

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					{/* Provide fallback "" to meet typescript */}
					<SliderWrapper>
						{movieData && <Slider data={movieData} sliderTitle="Movies" />}
						{tvData && <Slider data={tvData} sliderTitle="TV Shows" />}
					</SliderWrapper>

					<AnimatePresence>
						{movieId || tvId ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={
										movieId ? movieId + sliderTitle : tvId + sliderTitle
									}
								>
									{clickedMovie && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedMovie.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<BigTitle>{clickedMovie.title}</BigTitle>
											<BigOverview>{clickedMovie.overview}</BigOverview>
											<Images id={clickedMovie.id} kind="movie" />
										</>
									)}
									{clickedTv && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedTv.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<BigTitle>{clickedTv.name}</BigTitle>
											<BigOverview>{clickedTv.overview}</BigOverview>
											<Images id={clickedTv.id} kind="tv" />
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Search;
