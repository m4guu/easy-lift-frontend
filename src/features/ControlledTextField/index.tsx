import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";
import TextFieldMask from "../TextFieldMask";

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "value" | "onChange" | "onBlur"> {
  fieldName: Path<T>;
  mask?: string;
  textColor?: string;
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
  textColor,
  disabledUnderline,
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();

  const inputProps = {
    disableUnderline: disabledUnderline,
    inputComponent: mask && (TextFieldMask as any),
    inputProps: { mask },
    style: { color: textColor },
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
          autoComplete="off"
          color="primary"
        />
      )}
    />
  );
};

export default ControlledTextField;
