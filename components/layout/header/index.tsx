import { Box, Flex, Select, Title } from "@mantine/core";
import React from "react";
import classes from "./header.module.css";

const Header: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <Flex w="100%" justify="space-between" px="md" align="center" h="100%">
        <Title>Movies...</Title>
        <Box>
          <Select data={[]} />
        </Box>
      </Flex>
    </nav>
  );
};

export default Header;
