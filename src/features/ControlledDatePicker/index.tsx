import { Controller, Path, FieldValues, useFormContext } from "react-hook-form";

import { MobileDateTimePicker } from "@mui/x-date-pickers";

interface ControlledDatePickerProps<T extends FieldValues> {
  fieldName: Path<T>;
  label: string;
}

const ControlledDatePicker = <T extends FieldValues>({
  fieldName,
  label,
}: ControlledDatePickerProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { ref, onBlur, name, ...field } }) => (
        <MobileDateTimePicker
          {...field}
          inputRef={ref}
          label={label}
          slotProps={{
            textField: { variant: "standard", size: "small" },
          }}
        />
      )}
    />
  );
};

export default ControlledDatePicker;
