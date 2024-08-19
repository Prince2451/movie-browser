import { UseInfiniteMoviesOptions } from "./useInfiniteMovies";
import { UseMovieSearchOptions } from "./useMovieSearch";

export const moviesKeys = {
  movies: ["Movies"] as const,
  search: (options: UseMovieSearchOptions) =>
    [...moviesKeys.movies, options] as const,
  moviesData: (options: UseInfiniteMoviesOptions) =>
    [...moviesKeys.movies, options] as const,
};
