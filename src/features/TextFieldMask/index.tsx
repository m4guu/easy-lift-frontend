import React from "react";
import { IMaskInput } from "react-imask";

interface TextFieldMaskProps extends Omit<typeof IMaskInput, "inputRef"> {
  mask: string;
}

const TextFieldMask = React.forwardRef<HTMLInputElement, TextFieldMaskProps>(
  (props, ref) => {
    return <IMaskInput {...props} mask={props.mask} inputRef={ref} overwrite />;
  }
);

export default TextFieldMask;
