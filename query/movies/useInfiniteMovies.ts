import {
  QueryClient,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { GetMovieRequest, getMovies } from "../../services/movies";
import { moviesKeys } from "./keys";
import { useMemo } from "react";
import { Movie } from "../../types/movies";

export type UseInfiniteMoviesOptions = {
  withGenres: string;
  "voteAverage.gte": string;
  "voteAverage.lte": string;
  "releaseDate.gte": string;
  "releaseDate.lte": string;
};

async function _getMovies(
  context: QueryFunctionContext<
    ReturnType<typeof moviesKeys.moviesData>,
    number
  >,
) {
  const data = await getMovies({
    page: context.pageParam.toString(),
    "release_date.gte": context.queryKey[1]["releaseDate.gte"],
    "release_date.lte": context.queryKey[1]["releaseDate.lte"],
    "vote_average.gte": context.queryKey[1]["voteAverage.gte"],
    "vote_average.lte": context.queryKey[1]["voteAverage.lte"],
    with_genres: context.queryKey[1].withGenres,
  });
  return data;
}

function useInfiniteMovies(options: UseInfiniteMoviesOptions) {
  const query = useInfiniteQuery({
    queryKey: moviesKeys.moviesData(options),
    queryFn: _getMovies,
    getNextPageParam: (last) => {
      if (last.totalPages <= last.page) return null;
      return last.page + 1;
    },
    getPreviousPageParam: (first, all) => {
      if (first.page <= 1) return null;
      return first.page - 1;
    },
    maxPages: 5,
    initialPageParam: 1,
  });

  const movies = useMemo(() => {
    let movies: Array<Movie> = [];
    if (!query.data) return movies;
    for (let i = 0; i < query.data.pages.length; i++) {
      movies = movies.concat(query.data.pages[i].results);
    }
    return movies;
  }, [query.data]);

  return {
    query,
    movies,
  };
}

async function ssrPrefetchInfiniteMovies(options: UseInfiniteMoviesOptions) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: moviesKeys.moviesData(options),
    queryFn: _getMovies,
    initialPageParam: 1,
  });
  return queryClient;
}

export default useInfiniteMovies;
export { ssrPrefetchInfiniteMovies };
