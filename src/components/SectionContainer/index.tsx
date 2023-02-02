import React from "react";

import { styled } from "@mui/system";

const SectionContainer: React.FCWithChildren = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
}));
export default SectionContainer;
