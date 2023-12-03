const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
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

export function getMovies(category: string) {
	return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
