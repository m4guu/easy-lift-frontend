import React from "react";

import { Box, useTheme, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { labels } from "./constans";

export const SetLabels = () => {
  const theme = useTheme();

  return (
    <Container>
      {labels.map((label, i, arr) => {
        if (i + 1 === arr.length) {
          return (
            <LabelTitle
              key={label.name}
              variant="h3"
              sx={{ marginLeft: "15rem" }}
              color={theme.palette.custom_grey.tint_2}
            >
              {label.name}
            </LabelTitle>
          );
        }
        return (
          <LabelTitle
            key={label.name}
            variant="h3"
            color={theme.palette.custom_grey.tint_2}
          >
            {label.name}
          </LabelTitle>
        );
      })}
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  width: "50%",
  textTransform: "uppercase",
});

const LabelTitle = styled(Typography)({
  width: "25%",
});
