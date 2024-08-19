import {
  Box,
  Combobox,
  ComboboxProps,
  Group,
  InputBase,
  rem,
  ScrollArea,
  Text,
} from "@mantine/core";
import React from "react";
import { Movie } from "../../../../types/movies";
import classes from "./movie-searchbox.module.css";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

interface MovieSearchBoxProps extends ComboboxProps {
  value: string;
  loading?: boolean;
  data: Array<Movie>;
  onChange: (value: string) => void;
  onClear?: () => void;
}

const MovieSearchBox: React.FC<MovieSearchBoxProps> = ({
  value,
  loading,
  data,
  onChange,
  onClear,
  ...props
}) => {
  return (
    <Combobox {...props} width={"target"} withinPortal={false}>
      <Combobox.Target>
        <InputBase
          rightSection={
            !value ? (
              <FaSearch />
            ) : (
              <Combobox.ClearButton
                onClear={() => {
                  onChange("");
                  onClear?.();
                }}
              />
            )
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => props.store?.openDropdown()}
          onFocus={() => props.store?.openDropdown()}
          onBlur={() => props.store?.closeDropdown()}
          placeholder="Search movies..."
          rightSectionPointerEvents={!value ? "none" : "all"}
          w="100%"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options className={classes.dropdown}>
          <ScrollArea.Autosize
            mah={rem(350)}
            w="100%"
            style={{ overflowX: "hidden" }}
            classNames={{
              viewport: classes.scrollArea,
            }}
            scrollbars="y"
          >
            <Box>
              {loading ? (
                <Combobox.Empty>Loading....</Combobox.Empty>
              ) : !value ? (
                <Combobox.Empty>Type to search movies</Combobox.Empty>
              ) : !data.length ? (
                <Combobox.Empty>No Results Found!</Combobox.Empty>
              ) : (
                data.map((movie) => (
                  <Combobox.Option
                    w="100%"
                    value={movie.id.toString()}
                    key={movie.id}
                  >
                    <Group w="100%" wrap="nowrap">
                      <Box
                        style={{ flexShrink: 0 }}
                        pos="relative"
                        h={rem(40)}
                        w={rem(40)}
                      >
                        <Image
                          src={movie.posterPath}
                          alt="poster"
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </Box>
                      <Box style={{ flexGrow: 1, overflow: "hidden" }}>
                        <Text fz="sm" truncate>
                          {movie.title}
                        </Text>
                        <Text fz="xs" c="dimmed">
                          {movie.releaseDate}
                        </Text>
                      </Box>
                    </Group>
                  </Combobox.Option>
                ))
              )}
            </Box>
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MovieSearchBox;
