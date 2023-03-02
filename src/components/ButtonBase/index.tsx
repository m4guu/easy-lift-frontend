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

const ButtonText = styled(Box)(({ theme }) => ({}));

export default memo(ButtonBase);
