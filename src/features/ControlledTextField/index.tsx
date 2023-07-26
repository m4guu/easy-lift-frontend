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
  testId?: string;
}

const ControlledTextField = <T extends FieldValues>({
  fieldName,
  mask,
  textColor,
  disabledUnderline,
  children,
  multiline = false,
  testId,
  ...textFieldProps
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const isDarkMode = useIsDarkMode();

  const inputProps = {
    disableUnderline: disabledUnderline,
    inputComponent: mask && (TextFieldMask as any),
    inputProps: { mask },
    "data-testid": testId,
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
            multiline={multiline}
            InputLabelProps={{ shrink: true }}
            InputProps={inputProps}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...field}
            {...textFieldProps}
            autoComplete="one-time-code"
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
