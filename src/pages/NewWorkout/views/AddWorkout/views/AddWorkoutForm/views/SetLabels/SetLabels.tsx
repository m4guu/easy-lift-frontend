import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";

import { labels } from "./constans";

export const SetLabels = () => {
  const theme = useTheme();

  return (
    // question [meeting]: why does ts not see my custom Palette type ? (custom_grey: styles -> theme-> types)
    <Container>
      {labels.map((label, i) => {
        if (i === 0) {
          return (
            <SetTitle
              key={label.name}
              variant="h3"
              color={theme.palette.custom_grey.tint_2}
            >
              {label.name}
            </SetTitle>
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

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "50%",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const LabelTitle = styled(Typography)({
  width: "25%",
});
const SetTitle = styled(Typography)(({ theme }) => ({
  width: "25%",
  [theme.breakpoints.down("sm")]: {
    width: "10%",
  },
}));
