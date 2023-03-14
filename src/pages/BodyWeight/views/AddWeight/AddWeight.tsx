import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { Form } from "./views/Form/Form";

export const AddWeight: React.FC = () => {
  return (
    <Container>
      <Form />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} -${theme.spacing(2)} `,
  borderTop: `thin solid ${theme.palette.primary.main}`,
  borderBottom: `thin solid ${theme.palette.primary.main}`,
}));
