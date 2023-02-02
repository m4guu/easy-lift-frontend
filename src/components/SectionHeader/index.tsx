import React from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const SectionHeader: React.FCWithChildren = ({ children }) => {
  return (
    <Header>
      <Typography variant="caption">{children}</Typography>
    </Header>
  );
};

const Header = styled("header")({});

export default SectionHeader;
