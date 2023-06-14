import React from "react";

import { Box, Avatar, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { EditButtonWithUpdateModal } from "../EditButtonWithUpdateModal";

import { FieldUserInformation } from "../../shared/interfaces";

type UserFieldInfoProps = {
  field: FieldUserInformation;
};

const UserFieldInfo: React.FC<UserFieldInfoProps> = ({ field }) => {
  return (
    <Container>
      <Container>
        <EmailAvatar color="primary">{field.icon}</EmailAvatar>

        <Box>
          <Caption variant="caption" color="primary">
            {field.name}
          </Caption>
          <Typography>{field.value}</Typography>
        </Box>
      </Container>

      <EditButtonWithUpdateModal
        variant="outlined"
        updateProps={field.updateButtonProps}
      />
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
});

const EmailAvatar = styled(Avatar)(({ theme }) => ({
  width: "4rem",
  height: "4rem",
  background: theme.palette.primary.main,
}));

const Caption = styled(Typography)({
  textTransform: "capitalize",
});

export default UserFieldInfo;
