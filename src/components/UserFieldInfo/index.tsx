import React from "react";

import { Box, Avatar, Typography, useMediaQuery } from "@mui/material";
import { Theme, styled } from "@mui/system";

import { EditButtonWithUpdateModal } from "../EditButtonWithUpdateModal";

import { FieldUserInformation } from "../../shared/interfaces";

type UserFieldInfoProps = {
  field: FieldUserInformation;
};

const UserFieldInfo: React.FC<UserFieldInfoProps> = ({ field }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Container>
      <Content>
        <EmailAvatar color="primary">{field.icon}</EmailAvatar>

        <Box>
          <Caption variant="caption" color="primary">
            {field.name}
          </Caption>
          <Typography>{field.value}</Typography>
        </Box>
      </Content>

      <EditButtonWithUpdateModal
        variant="outlined"
        updateProps={field.updateButtonProps}
        size="small"
        fullWidth={isMobile}
      />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));
const Content = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
});

const EmailAvatar = styled(Avatar)(({ theme }) => ({
  width: "4rem",
  height: "4rem",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    height: "3rem",
  },
}));

const Caption = styled(Typography)({
  textTransform: "capitalize",
});

export default UserFieldInfo;
