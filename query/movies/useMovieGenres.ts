import {
  QueryFunctionContext,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { movieGenres } from "../../services/movies";
import { moviesKeys } from "./keys";

function useMovieGenres(
  config?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<typeof movieGenres>>,
      Error,
      Awaited<ReturnType<typeof movieGenres>>,
      typeof moviesKeys.genres
    >,
    "queryKey" | "queryFn"
  >,
) {
  const query = useQuery({
    queryKey: moviesKeys.genres,
    queryFn: movieGenres,
    ...config,
  });

  const genres = useMemo(() => {
    return query.data?.genres || [];
  }, [query.data?.genres]);

  return {
    query,
    genres: genres,
  };
}

export default useMovieGenres;
