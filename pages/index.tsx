import { Box, Center, Flex, Grid, Loader, rem } from "@mantine/core";
import { dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Head from "next/head";
import MovieCard from "../components/pages/movie-card";
import useInfiniteMovies, {
  ssrPrefetchInfiniteMovies,
} from "../query/movies/useInfiniteMovies";
import { useCallback, useEffect, useState } from "react";
import Filter from "../components/pages/filter";
import { MovieFilters } from "../types/movies";

export default function MoviesPage() {
  const [filters, setFilters] = useState<MovieFilters>({
    genre: [],
    rating: [0, 10],
    yearRange: [1970, new Date().getFullYear()],
  });
  const { movies, query } = useInfiniteMovies({
    "releaseDate.gte": filters.yearRange[0].toString(),
    "releaseDate.lte": filters.yearRange[1].toString(),
    "voteAverage.gte": filters.rating[0].toString(),
    "voteAverage.lte": filters.rating[1].toString(),
    withGenres: filters.genre.join("|"),
  });
  const {
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = query;

  const onScroll = useCallback(() => {
    const threshold = 250;
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - threshold &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    } else if (
      window.scrollY <= threshold &&
      hasPreviousPage &&
      !isFetchingPreviousPage
    ) {
      const previousHeight = document.body.offsetHeight;
      fetchPreviousPage().then(() => {
        const changedHeight = document.body.offsetHeight - previousHeight;
        console.log(changedHeight);
        window.scrollBy({ top: changedHeight });
      });
    }
  }, [
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <Box px="sm">
      <Head>
        <title>Browse Movies - List</title>
      </Head>
      <Flex>
        <Box px="sm" style={{ flexShrink: 0 }} w={rem(300)}>
          <Filter values={filters} onChange={setFilters} />
        </Box>
        <Box>
          {isFetchingPreviousPage && (
            <Center h={rem(100)} w="100%">
              <Loader />
            </Center>
          )}
          <Grid>
            {movies.map((movie) => (
              <Grid.Col
                span={{
                  xs: 6,
                  sm: 4,
                  md: 4,
                  lg: 4,
                  xl: 3,
                }}
                key={movie.id}
              >
                <MovieCard movie={movie} />
              </Grid.Col>
            ))}
          </Grid>
          {isFetchingNextPage && (
            <Center h={rem(100)} w="100%">
              <Loader />
            </Center>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
