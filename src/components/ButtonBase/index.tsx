import React, { memo } from "react";

import { Box, Button, ButtonProps } from "@mui/material";

interface ButtonBaseProps extends Omit<ButtonProps, "children"> {}

const ButtonBase: React.FCWithChildren<ButtonBaseProps> = ({
  children,
  ...muiProps
}) => {
  return (
    <Button {...muiProps}>
      <Box>{children}</Box>
    </Button>
  );
};

export default memo(ButtonBase);
