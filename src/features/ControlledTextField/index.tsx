import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { TextField } from "@mui/material";
import TextFieldMask from "../TextFieldMask";

interface ControlledTextFieldProps<T extends FieldValues> {
  fieldName: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  variant?: "standard" | "filled" | "outlined";
  size?: "medium" | "small";
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  mask?: string;
  disabledUnderline?: boolean;
}

const ControlledTextField = <T extends FieldValues>({
  fieldName,
  label,
  placeholder,
  type,
  variant,
  size,
  disabled = false,
  multiline = false,
  rows,
  mask,
  disabledUnderline,
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();

  const inputProps = {
    disableUnderline: disabledUnderline,
    inputComponent: mask && (TextFieldMask as any),
    inputProps: { mask },
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          variant={variant}
          size={size}
          type={type}
          disabled={disabled}
          multiline={multiline}
          InputLabelProps={{ shrink: true }}
          InputProps={inputProps}
          rows={rows}
          placeholder={placeholder}
          error={!!fieldState.error}
          label={label}
          helperText={fieldState.error?.message}
          color="primary"
        />
      )}
    />
  );
};

export default ControlledTextField;
