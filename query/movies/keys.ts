import { UseInfiniteMoviesOptions } from "./useInfiniteMovies";

export const moviesKeys = {
  movies: ["Movies"] as const,
  moviesData: (options: UseInfiniteMoviesOptions) =>
    [...moviesKeys.movies, options] as const,
};
