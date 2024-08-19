import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { searchMovie, SearchMovieRequest } from "../../services/movies";
import { moviesKeys } from "./keys";

export type UseMovieSearchOptions = SearchMovieRequest;

async function _searchMovies(
  context: QueryFunctionContext<ReturnType<typeof moviesKeys.search>>,
) {
  const data = await searchMovie({
    ...context.queryKey[2],
  });
  return data;
}

function useMovieSearch(
  options: UseMovieSearchOptions,
  config?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof _searchMovies>>,
      Error,
      Awaited<ReturnType<typeof _searchMovies>>,
      ReturnType<typeof moviesKeys.search>
    >,
    "queryKey" | "queryFn"
  >,
) {
  const query = useQuery({
    queryKey: moviesKeys.search(options),
    queryFn: _searchMovies,
    ...config,
  });

  const movies = useMemo(() => {
    return query.data?.results || [];
  }, [query.data?.results]);

  return {
    query,
    movies: movies,
  };
}

export default useMovieSearch;
