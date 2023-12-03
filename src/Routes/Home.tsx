import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Images from "../Components/Images";
import Slider from "../Components/Slider";
import { IGetMoviesResult, IMovie, getMovies } from "../api";
import { sliderTitleState } from "../atoms";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	background-color: black;
	overflow-x: hidden;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 64px;
	margin-bottom: 24px;
`;

const Overview = styled.p`
	font-size: 24px;
	width: 50%;
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

const SliderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* justify-content: space-between; */
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

function Home() {
	const history = useHistory();
	const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
	const { scrollY } = useScroll();
	const { data: nowPlayingMovies, isLoading: isLoadingNowPlaying } =
		useQuery<IGetMoviesResult>(["movies", "now_playing"], () =>
			getMovies("now_playing")
		);
	const { data: popularMovies, isLoading: isLoadingPopular } =
		useQuery<IGetMoviesResult>(["movies", "popular"], () =>
			getMovies("popular")
		);
	const { data: topRatedMovies, isLoading: isLoadingTopRated } =
		useQuery<IGetMoviesResult>(["movies", "top_rated"], () =>
			getMovies("top_rated")
		);
	const { data: upcomingMovies, isLoading: isLoadingUpcoming } =
		useQuery<IGetMoviesResult>(["movies", "upcoming"], () =>
			getMovies("upcoming")
		);
	const isLoading =
		isLoadingNowPlaying ||
		isLoadingPopular ||
		isLoadingTopRated ||
		isLoadingUpcoming;
	let data: IMovie[] = [];
	if (nowPlayingMovies && popularMovies && topRatedMovies && upcomingMovies) {
		data = [
			...nowPlayingMovies.results,
			...popularMovies.results,
			...topRatedMovies.results,
			...upcomingMovies.results,
		];
	}
	const allMovies = [
		nowPlayingMovies,
		popularMovies,
		topRatedMovies,
		upcomingMovies,
	];

	const onOverlayClick = () => history.goBack();
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data.find((movie) => movie.id === +bigMovieMatch.params.movieId);
	const sliderTitle = useRecoilValue(sliderTitleState);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					{/* Provide fallback "" to meet typescript */}
					<Banner
						// onClick={increaseIndex}
						bgPhoto={makeImagePath(
							nowPlayingMovies?.results[0].backdrop_path || ""
						)}
					>
						<Title>{nowPlayingMovies?.results[0].title}</Title>
						<Overview>{nowPlayingMovies?.results[0].overview}</Overview>
					</Banner>
					<SliderWrapper>
						{allMovies.map((movies) => {
							if (movies) {
								if (allMovies.indexOf(movies) === 0) {
									return <Slider data={movies} sliderTitle="Now Playing" />;
								}
								if (allMovies.indexOf(movies) === 1) {
									return <Slider data={movies} sliderTitle="Popular" />;
								}
								if (allMovies.indexOf(movies) === 2) {
									return <Slider data={movies} sliderTitle="Top Rated" />;
								}
								if (allMovies.indexOf(movies) === 3) {
									return <Slider data={movies} sliderTitle="Upcoming" />;
								}
							} else {
								return null;
							}
						})}
					</SliderWrapper>

					<AnimatePresence>
						{bigMovieMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigMovieMatch.params.movieId + sliderTitle}
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
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
