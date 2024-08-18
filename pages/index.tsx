import { Box, Grid } from "@mantine/core";
import { dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";
import Head from "next/head";
import MovieCard from "../components/pages/movie-card";
import useInfiniteMovies, {
  ssrPrefetchInfiniteMovies,
} from "../query/movies/useInfiniteMovies";
import { useCallback, useEffect } from "react";

export default function MoviesPage() {
  const { movies, query } = useInfiniteMovies({});
  const {
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = query;

  const onScroll = useCallback(
    (e: Event) => {
      const threshold = 150;
      console.log(hasNextPage, hasPreviousPage);
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
        fetchPreviousPage();
      }
    },
    [
      fetchNextPage,
      fetchPreviousPage,
      hasNextPage,
      hasPreviousPage,
      isFetchingNextPage,
      isFetchingPreviousPage,
    ],
  );

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
      <Grid>
        {movies.map((movie) => (
          <Grid.Col
            span={{
              xs: 6,
              sm: 4,
              md: 3,
              lg: 2,
              xl: 2,
            }}
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}

export async function getStaticProps(): Promise<ReturnType<GetStaticProps>> {
  const queryClient = await ssrPrefetchInfiniteMovies({});
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 24 * 60 * 60, // 1 day
  };
}
