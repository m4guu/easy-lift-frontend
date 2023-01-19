import React, { memo } from "react";

import { Box, Button, ButtonProps } from "@mui/material";
import styled from "@mui/system/styled";

interface ButtonBaseProps extends Omit<ButtonProps, "children"> {}

const ButtonBase: React.FCWithChildren<ButtonBaseProps> = ({
  children,
  ...muiProps
}) => {
  return (
    <Button {...muiProps}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

const ButtonText = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export default memo(ButtonBase);
