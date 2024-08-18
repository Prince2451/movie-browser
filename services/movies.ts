import { ApiMovie, Movie } from "../types/movies";
import { IMAGE_BASE_URL } from "../utils/constants";
import apiUrls from "./apiUrls";

export interface GetMovieRequest extends Record<string, string> {
  page: string;
}

interface GetMovieApiResponse {
  page: number;
  results: Array<ApiMovie>;
  total_pages: number;
  total_results: number;
}
interface GetMovieParsedResponse {
  page: number;
  results: Array<Movie>;
  totalPages: number;
  totalResults: number;
}

async function getMovies(
  payload: GetMovieRequest,
): Promise<GetMovieParsedResponse> {
  const searchParams = new URLSearchParams(payload).toString();

  const res = await fetch(`${apiUrls.movies.getMovies}?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });
  const data: GetMovieApiResponse = await res.json();
  return {
    page: data.page,
    results: data.results.map((result) => ({
      adult: result.adult,
      backdropPath: result.backdrop_path,
      genreIds: result.genre_ids,
      id: result.id,
      originalLanguage: result.original_language,
      originalTitle: result.original_title,
      overview: result.overview,
      popularity: result.popularity,
      posterPath: `${IMAGE_BASE_URL}w500${result.poster_path}`,
      releaseDate: result.release_date,
      title: result.title,
      video: result.video,
      voteAverage: result.vote_average,
      voteCount: result.vote_count,
    })),
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

export { getMovies };
