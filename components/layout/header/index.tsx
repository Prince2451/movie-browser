import { Box, Flex, Select, Title, useCombobox } from "@mantine/core";
import React, { useState } from "react";
import classes from "./header.module.css";
import MovieSearchBox from "../../pages/movie-searchbox";
import useMovieSearch from "../../../query/movies/useMovieSearch";

const Header: React.FC = () => {
  const [search, setSearch] = useState("");
  const {
    movies,
    query: { isLoading },
  } = useMovieSearch(
    { query: search },
    {
      enabled: !!search,
    },
  );
  const combobox = useCombobox();
  return (
    <nav className={classes.nav}>
      <Flex w="100%" justify="space-between" px="md" align="center" h="100%">
        <Title>Movies...</Title>
        <Box>
          <MovieSearchBox
            store={combobox}
            value={search}
            onChange={(val) => {
              console.log(val);
              setSearch(val);
            }}
            loading={isLoading}
            data={movies}
          />
        </Box>
      </Flex>
    </nav>
  );
};

export default Header;
