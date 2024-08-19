import { ApiMovie, Movie } from "../types/movies";
import { IMAGE_BASE_URL } from "../utils/constants";
import apiUrls from "./apiUrls";

export interface GetMovieRequest extends Record<string, string> {
  page: string;
  with_genres: string;
  "vote_average.gte": string;
  "vote_average.lte": string;
  "release_date.gte": string;
  "release_date.lte": string;
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

export interface SearchMovieRequest extends Record<string, string> {
  query: string;
}

interface SearchMovieApiResponse {
  page: number;
  results: Array<ApiMovie>;
  total_pages: number;
  total_results: number;
}

interface SearchMovieRespone {
  page: number;
  results: Array<Movie>;
  totalPages: number;
  totalResults: number;
}

interface MovieGenreResponse {
  genres: Array<{
    id: number;
    name: string;
  }>;
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

async function searchMovie(
  payload: SearchMovieRequest,
): Promise<SearchMovieRespone> {
  const searchParams = new URLSearchParams(payload).toString();

  const res = await fetch(`${apiUrls.movies.searchMovies}?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });
  const data: SearchMovieApiResponse = await res.json();
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
      posterPath: `${IMAGE_BASE_URL}w92${result.poster_path}`,
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

async function movieGenres(): Promise<MovieGenreResponse> {
  const res = await fetch(`${apiUrls.movies.genres}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });
  const data: MovieGenreResponse = await res.json();
  return data;
}

export { getMovies, searchMovie, movieGenres };
