import React from "react";

import { LoadingButton } from "@mui/lab";
import { ButtonProps } from "@mui/material/Button";

interface SubmitProps extends ButtonProps {
  label: string;
  loading: boolean;
}

const Submit: React.FC<SubmitProps> = ({ label, loading, ...buttonProps }) => {
  return (
    <LoadingButton loading={loading} {...buttonProps}>
      {label}
    </LoadingButton>
  );
};

export default Submit;
