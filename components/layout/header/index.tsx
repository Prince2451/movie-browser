import { Portal } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return <Portal target="#app__header">{children}</Portal>;
};

export default Header;
