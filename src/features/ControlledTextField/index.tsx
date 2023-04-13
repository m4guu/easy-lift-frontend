import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";
import TextFieldMask from "../TextFieldMask";
import { useIsDarkMode } from "../../store/redux-store/slices/themeMode/themeMode.hooks";

interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "value" | "onChange" | "onBlur"> {
  fieldName: Path<T>;
  mask?: string;
  textColor?: string;
  disabledUnderline?: boolean;
  children?: React.ReactNode;
  multiple?: boolean;
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
  select,
  textColor,
  disabledUnderline,
  children,
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const isDarkMode = useIsDarkMode();

  const inputProps = {
    disableUnderline: disabledUnderline,
    inputComponent: mask && (TextFieldMask as any),
    inputProps: { mask },
    style: {
      color: textColor,
      // calendar styles
      colorScheme: isDarkMode ? "dark" : "light",
    },
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => {
        return (
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
            select={select}
            helperText={fieldState.error?.message}
            autoComplete="off"
            color="primary"
          >
            {children}
          </TextField>
        );
      }}
    />
  );
};

export default ControlledTextField;
