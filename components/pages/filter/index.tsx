import {
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  Loader,
  Paper,
  RangeSlider,
  rem,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import useMovieGenres from "../../../query/movies/useMovieGenres";
import { MovieFilters } from "../../../types/movies";
import { Controller, useForm } from "react-hook-form";

interface FilterProps {
  values: MovieFilters;
  onChange: (value: FilterProps["values"]) => void;
}

const Filter: React.FC<FilterProps> = ({ values, onChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    values,
  });
  const {
    genres,
    query: { isLoading },
  } = useMovieGenres();

  return (
    <Paper>
      <form onSubmit={handleSubmit(onChange)}>
        <Text fw={500} fz="md">
          Filter
        </Text>
        <Stack>
          <Controller
            name="genre"
            control={control}
            render={({ field }) => {
              return (
                <Checkbox.Group
                  label="Choose Genres"
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                >
                  <ScrollArea h={rem(300)}>
                    <Stack py="sm">
                      {isLoading ? (
                        <Center h={rem(200)} w="100%">
                          <Loader />
                        </Center>
                      ) : (
                        genres.map((genre) => (
                          <Checkbox
                            key={genre.id}
                            value={genre.id.toString()}
                            label={genre.name}
                          />
                        ))
                      )}
                    </Stack>
                  </ScrollArea>
                </Checkbox.Group>
              );
            }}
          />

          <Box>
            <Text mb="xs">Choose Realease Year</Text>
            <Controller
              name="yearRange"
              control={control}
              render={({ field }) => (
                <RangeSlider
                  min={1970}
                  max={new Date().getFullYear()}
                  step={1}
                  minRange={1}
                  {...field}
                />
              )}
            />
          </Box>
          <Box>
            <Text mb="xs">Choose Ratings</Text>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <RangeSlider
                  min={0}
                  max={10}
                  step={1}
                  minRange={1}
                  {...field}
                />
              )}
            />
          </Box>
          {isDirty && (
            <Group wrap="nowrap" grow>
              <Button
                type="button"
                variant="light"
                onClick={() => reset(values)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="">
                Apply
              </Button>
            </Group>
          )}
        </Stack>
      </form>
    </Paper>
  );
};

export default Filter;
