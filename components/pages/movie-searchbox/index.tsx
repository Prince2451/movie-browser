import {
  Box,
  Combobox,
  ComboboxProps,
  Group,
  Input,
  InputBase,
  rem,
  ScrollArea,
  Text,
} from "@mantine/core";
import React from "react";
import { Movie } from "../../../types/movies";
import Image from "next/image";

interface MovieSearchBoxProps extends ComboboxProps {
  value: string;
  loading?: boolean;
  data: Array<Movie>;
  onChange: (value: string) => void;
}

const MovieSearchBox: React.FC<MovieSearchBoxProps> = ({
  value,
  loading,
  data,
  onChange,
  ...props
}) => {
  return (
    <Combobox {...props}>
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => props.store?.openDropdown()}
          onFocus={() => props.store?.openDropdown()}
          onBlur={() => props.store?.closeDropdown()}
          placeholder="Search movies..."
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize
            mah={rem(350)}
            style={{
              overflowX: "hidden",
            }}
          >
            {loading ? (
              <Combobox.Empty>Loading....</Combobox.Empty>
            ) : (
              data.map((movie) => (
                <Combobox.Option value={movie.id.toString()} key={movie.id}>
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
                        style={{ objectFit: "cover", objectPosition: "center" }}
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
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default MovieSearchBox;
