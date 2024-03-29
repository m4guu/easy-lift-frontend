import { Box, Typography, useMediaQuery, useTheme, Theme } from "@mui/material";
import { styled } from "@mui/system";
import { useUserContext } from "../../../../../../../../contexts/userContext";
import { Role } from "../../../../../../../../shared/enums";

import { userLabels, trainerLabels } from "./constans";

export const SetLabels = () => {
  const { user } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery((t: Theme) => t.breakpoints.down("sm"));
  const labels = user?.role === Role.trainer ? trainerLabels : userLabels;

  return (
    <Container>
      {labels.map((label, i) => {
        if (i === 0) {
          return (
            <SetTitle
              key={label.name}
              variant="h3"
              style={isMobile ? { width: "10%" } : {}}
              color={theme.palette.custom_grey.tint_2}
            >
              {label.name}
            </SetTitle>
          );
        }
        return (
          <SetTitle
            key={label.name}
            variant="h3"
            color={theme.palette.custom_grey.tint_2}
          >
            {label.name}
          </SetTitle>
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

const SetTitle = styled(Typography)(({ theme }) => ({
  width: "25%",
  // [theme.breakpoints.down("sm")]: {
  //   width: "17%",
  // },
}));
