import React from "react";
import { Movie } from "../../../types/movies";
import { Box, Card, Group, rem, Text } from "@mantine/core";
import Image from "next/image";
import classes from "./movie-card.module.css";
import { useHover } from "@mantine/hooks";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { hovered, ref } = useHover();
  return (
    <Box pos="relative" h="100%" w="100%">
      <Card
        ref={ref}
        shadow={hovered ? "md" : "sm"}
        padding="lg"
        radius="md"
        h="100%"
        bg="dark.9"
      >
        <Card.Section className={classes.cardImage}>
          <Box pos="relative" h={rem(350)}>
            <Image
              src={movie.posterPath}
              alt="Poster"
              objectFit="cover"
              fill
              objectPosition="center"
            />
          </Box>
        </Card.Section>
        <Box>
          <Group
            justify="space-between"
            mt="md"
            mb="xs"
            style={{ overflow: "hidden" }}
            w="100%"
          >
            <Text fw={500} truncate>
              {movie.title}
            </Text>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={5}>
            {movie.overview}
          </Text>
        </Box>
      </Card>
    </Box>
  );
};

export default MovieCard;
