import React from "react";

import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material/Button";

interface SubmitProps extends ButtonProps {
  label: string;
  loading: boolean;
}

const Submit: React.FC<SubmitProps> = ({
  label,
  variant,
  onClick,
  loading,
}) => {
  return (
    <LoadingButton variant={variant} onClick={onClick} loading={loading}>
      {label}
    </LoadingButton>
  );
};

export default Submit;
