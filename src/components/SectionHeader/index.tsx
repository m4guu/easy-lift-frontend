import React from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const SectionHeader: React.FCWithChildren = ({ children }) => {
  return (
    <Header>
      <HeaderTitle variant="caption">{children}</HeaderTitle>
    </Header>
  );
};

const Header = styled("header")({});
const HeaderTitle = styled(Typography)({
  fontSize: "1.2rem",
  textTransform: "uppercase",
});

export default SectionHeader;
