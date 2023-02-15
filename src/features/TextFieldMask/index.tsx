import React from "react";
import { reforwardRef } from "react-chartjs-2/dist/utils";
import { IMaskInput } from "react-imask";

interface TextFieldMaskProps extends Omit<typeof IMaskInput, "inputRef"> {
  mask: string;
  onChange: (...event: any[]) => void;
}

const TextFieldMask = React.forwardRef<HTMLInputElement, TextFieldMaskProps>(
  (props, ref) => {
    const { onChange, mask, ...otherProps } = props;
    return (
      <IMaskInput
        {...otherProps}
        onAccept={onChange}
        mask={mask}
        inputRef={ref}
        overwrite
      />
    );
  }
);

export default TextFieldMask;
