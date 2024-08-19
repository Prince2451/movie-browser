import {
  ActionIcon,
  Box,
  Flex,
  Group,
  rem,
  Title,
  useCombobox,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import useMovieSearch from "../../../query/movies/useMovieSearch";
import MovieSearchBox from "../movie-searchbox";
import classes from "./header.module.css";

interface HeaderProps {
  onFilterOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterOpen }) => {
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
    <Flex w="100%" justify="space-between" px="md" align="center" h="100%">
      <Title
        data-hidden={isSearchVisible || undefined}
        className={classes.title}
        mr="sm"
      >
        Movies...
      </Title>
      <Box w="50%" maw={rem(400)} visibleFrom="sm">
        <MovieSearchBox
          store={combobox}
          value={search}
          onChange={setSearch}
          loading={isLoading || search !== searchVal}
          data={movies}
        />
      </Box>
      <Box hiddenFrom="lg" style={{ flexGrow: isSearchVisible ? 1 : 0 }}>
        {isSearchVisible ? (
          <MovieSearchBox
            store={combobox}
            value={search}
            onChange={setSearch}
            loading={isLoading || search !== searchVal}
            data={movies}
          />
        ) : (
          <Group wrap="nowrap" w="100%">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => setIsSearchVisible(true)}
              size="lg"
              hiddenFrom="sm"
            >
              <FaSearch />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={onFilterOpen}
              size="lg"
              hiddenFrom="lg"
            >
              <FaFilter />
            </ActionIcon>
          </Group>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
