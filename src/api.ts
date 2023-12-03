const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
	popularity: number;
	vote_average: number;
	vote_count: number;
	genre_ids: number[];
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	pages: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface ITvShow {
	adult: false;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	first_air_date: string;
	name: string;
	vote_average: number;
	vote_count: number;
}

export interface IGetTvShowsResult {
	page: number;
	results: ITvShow[];
	total_pages: number;
	total_results: number;
}

export interface IBackdrop {
	height: number;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface IGetImagesResult {
	backdrops: IBackdrop[];
}

export function getMovies(category: string) {
	return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTvShows(category: string) {
	return fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function searchMovie(keyword: string) {
	return fetch(
		`${BASE_PATH}/search/movie?query=${keyword}&api_key=${API_KEY}`
	).then((response) => response.json());
}

export function searchTv(keyword: string) {
	return fetch(
		`${BASE_PATH}/search/tv?query=${keyword}&api_key=${API_KEY}`
	).then((response) => response.json());
}

export function getMovieImages(movieId: string) {
	return fetch(`${BASE_PATH}/movie/${movieId}/images?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTvImages(tvId: string) {
	return fetch(`${BASE_PATH}/tv/${tvId}/images?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
