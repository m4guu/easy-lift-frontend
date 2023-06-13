import React from "react";

import { Box, Avatar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

type UserFieldInfoProps = {
  field: {
    name: string;
    value: string;
    icon: JSX.Element;
  };
};

export const UserFieldInfo: React.FC<UserFieldInfoProps> = ({ field }) => {
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
      <Button variant="outlined">edit</Button>
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
