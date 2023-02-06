import React from "react";
import { RefCallBack } from "react-hook-form/dist/types";

import { TextField } from "@mui/material";

interface TextFieldBaseProps {
  onChange: (...event: any[]) => void;
  value: any;
  name: string;
  ref: RefCallBack;
  placeholder?: string;
  type?: string;
  error: boolean;
  label: string;
  InputLabelProps: { shrink: boolean };
  helperText?: string;
  variant?: "standard" | "filled" | "outlined";
  size?: "medium" | "small";
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const TextFieldBase: React.FC<TextFieldBaseProps> = ({
  onChange,
  value,
  name,
  ref,
  placeholder,
  type,
  error,
  label,
  InputLabelProps,
  helperText,
  variant,
  size,
  disabled,
  multiline,
  rows,
}) => {
  return (
    <TextField
      onChange={onChange}
      value={value}
      name={name}
      inputRef={ref}
      placeholder={placeholder}
      error={error}
      label={label}
      type={type}
      InputLabelProps={InputLabelProps}
      helperText={helperText}
      variant={variant}
      size={size}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      color="primary"
    />
  );
};

export default TextFieldBase;
