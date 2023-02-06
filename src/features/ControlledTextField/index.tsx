import { Controller, FieldValues, useFormContext, Path } from "react-hook-form";

import { TextFieldBase } from "../../components";

interface ControlledTextFieldProps<T extends FieldValues> {
  fieldName: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  variant?: "standard" | "filled" | "outlined";
  size?: "medium" | "small";
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const ControlledTextField = <T extends {}>({
  fieldName,
  label,
  placeholder,
  type,
  variant,
  size,
  disabled = false,
  multiline = false,
  rows,
}: ControlledTextFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => (
        <TextFieldBase
          {...field}
          variant={variant}
          size={size}
          type={type}
          disabled={disabled}
          multiline={multiline}
          InputLabelProps={{ shrink: true }}
          rows={rows}
          placeholder={placeholder}
          error={!!fieldState.error}
          label={label}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default ControlledTextField;
