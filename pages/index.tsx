import { Box, Center, Flex, Grid, Loader, Modal, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Header from "../components/layout/header";
import Filter from "../components/pages/filter";
import PageHeader from "../components/pages/header";
import MovieCard from "../components/pages/movie-card";
import useInfiniteMovies from "../query/movies/useInfiniteMovies";
import { MovieFilters } from "../types/movies";
import classes from "./index.module.css";

export default function MoviesPage() {
  const [filters, setFilters] = useState<MovieFilters>({
    genre: [],
    rating: [0, 10],
    yearRange: [1970, new Date().getFullYear()],
  });
  const [isFilterOpen, filterOpenHandlers] = useDisclosure();
  const { movies, query } = useInfiniteMovies({
    "releaseDate.gte": new Date(filters.yearRange[0]).toISOString(),
    "releaseDate.lte": new Date(
      filters.yearRange[1],
      new Date().getMonth(),
      new Date().getDate(),
    ).toISOString(),
    "voteAverage.gte": filters.rating[0].toString(),
    "voteAverage.lte": filters.rating[1].toString(),
    withGenres: filters.genre.join("|"),
  });
  const {
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
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
      <Header>
        <PageHeader onFilterOpen={filterOpenHandlers.open} />
      </Header>
      <Flex className={classes.flexbox}>
        <Box
          className={classes.filter}
          visibleFrom="lg"
          px="sm"
          style={{ flexShrink: 0 }}
          w={rem(300)}
        >
          <Filter
            values={filters}
            onChange={setFilters}
            buttonVisibillity="dirty"
          />
        </Box>
        <Box style={{ flexGrow: 1 }}>
          {(isFetchingPreviousPage || isLoading) && (
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
      <Modal
        centered
        opened={isFilterOpen}
        onClose={filterOpenHandlers.close}
        title="Filter Movies"
      >
        <Filter
          values={filters}
          onCancel={filterOpenHandlers.close}
          onChange={(values) => {
            setFilters(values);
            filterOpenHandlers.close();
          }}
        />
      </Modal>
    </Box>
  );
}
