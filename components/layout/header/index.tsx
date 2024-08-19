import {
  ActionIcon,
  Box,
  Flex,
  rem,
  Select,
  Title,
  useCombobox,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import MovieSearchBox from "../../pages/movie-searchbox";
import useMovieSearch from "../../../query/movies/useMovieSearch";
import { useDebouncedValue } from "@mantine/hooks";
import { FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchVal] = useDebouncedValue(search, 800);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {
    movies,
    query: { isLoading },
  } = useMovieSearch(
    { query: searchVal },
    {
      enabled: !!searchVal,
    },
  );
  const combobox = useCombobox({
    onDropdownClose: () => setIsSearchVisible(false),
  });

  useEffect(() => {
    if (isSearchVisible) combobox.focusTarget();
  }, [combobox, isSearchVisible]);

  return (
    <nav className={classes.nav}>
      <Flex w="100%" justify="space-between" px="md" align="center" h="100%">
        <Title
          data-hidden={isSearchVisible || undefined}
          className={classes.title}
        >
          Movies...
        </Title>
        <Box w="50%" maw={rem(400)} visibleFrom="md">
          <MovieSearchBox
            store={combobox}
            value={search}
            onChange={setSearch}
            loading={isLoading}
            data={movies}
          />
        </Box>
        <Box
          hiddenFrom="md"
          maw={rem(400)}
          style={{ flexGrow: isSearchVisible ? 1 : 0 }}
        >
          {isSearchVisible ? (
            <MovieSearchBox
              store={combobox}
              value={search}
              onChange={setSearch}
              loading={isLoading}
              data={movies}
            />
          ) : (
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setIsSearchVisible(true)}
              size="lg"
            >
              <FaSearch />
            </ActionIcon>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default Header;
