import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Images from "../Components/Images";
import Slider from "../Components/Slider";
import { IGetTvShowsResult, ITvShow, getTvShows } from "../api";
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

function Tv() {
	const history = useHistory();
	const bigTvShowMatch = useRouteMatch<{ tvShowId: string }>("/tv/:tvShowId");
	const { scrollY } = useScroll();
	const { data: airingToday, isLoading: isLoadingNowPlaying } =
		useQuery<IGetTvShowsResult>(["tv", "airing_today"], () =>
			getTvShows("airing_today")
		);
	const { data: onTheAir, isLoading: isLoadingPopular } =
		useQuery<IGetTvShowsResult>(["tv", "on_the_air"], () =>
			getTvShows("on_the_air")
		);
	const { data: popular, isLoading: isLoadingTopRated } =
		useQuery<IGetTvShowsResult>(["tv", "popular"], () => getTvShows("popular"));
	const { data: topRated, isLoading: isLoadingUpcoming } =
		useQuery<IGetTvShowsResult>(["tv", "top_rated"], () =>
			getTvShows("top_rated")
		);
	const isLoading =
		isLoadingNowPlaying ||
		isLoadingPopular ||
		isLoadingTopRated ||
		isLoadingUpcoming;
	let data: ITvShow[] = [];
	if (airingToday && onTheAir && popular && topRated) {
		data = [
			...airingToday.results,
			...onTheAir.results,
			...popular.results,
			...topRated.results,
		];
	}
	const allTvShows = [airingToday, onTheAir, popular, topRated];

	const onOverlayClick = () => history.goBack();
	const clickedTvShow =
		bigTvShowMatch?.params.tvShowId &&
		data.find((movie) => movie.id === +bigTvShowMatch.params.tvShowId);
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
						bgPhoto={makeImagePath(airingToday?.results[0].backdrop_path || "")}
					>
						<Title>{airingToday?.results[0].name}</Title>
						<Overview>{airingToday?.results[0].overview}</Overview>
					</Banner>
					<SliderWrapper>
						{allTvShows.map((tvShows) => {
							if (tvShows) {
								if (allTvShows.indexOf(tvShows) === 0) {
									return <Slider data={tvShows} sliderTitle="Airing Today" />;
								}
								if (allTvShows.indexOf(tvShows) === 1) {
									return <Slider data={tvShows} sliderTitle="On The Air" />;
								}
								if (allTvShows.indexOf(tvShows) === 2) {
									return <Slider data={tvShows} sliderTitle="Popular" />;
								}
								if (allTvShows.indexOf(tvShows) === 3) {
									return <Slider data={tvShows} sliderTitle="Top Rated" />;
								}
							} else {
								return null;
							}
						})}
					</SliderWrapper>

					<AnimatePresence>
						{bigTvShowMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigTvShowMatch.params.tvShowId + sliderTitle}
								>
									{clickedTvShow && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedTvShow.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<BigTitle>{clickedTvShow.name}</BigTitle>
											<BigOverview>{clickedTvShow.overview}</BigOverview>
											<Images id={clickedTvShow.id} kind="tv" />
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

export default Tv;
