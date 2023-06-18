import { styled } from "@mui/system";

import { UserConfigFields } from "../../../../../../hooks/formHooks/configuration/useUserConfigForm";
import { ControlledTextField } from "../../../../../../features";
import ImagePicker from "../../../../../../features/ImagePicker";
import {
  ImagePickerSize,
  ImagePickerType,
} from "../../../../../../shared/enums";
import { useUserContext } from "../../../../../../contexts/userContext";
import { API_URL } from "../../../../../../config/env.config";

// Name //
export const Name = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Name"
    type="text"
    fieldName={UserConfigFields.NAME}
    placeholder="Krystian, Paulina ..."
  />
))``;
//

// Height //
export const Height = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Height [cm]"
    type="tel"
    fieldName={UserConfigFields.HEIGHT}
    placeholder="190 [cm]"
  />
))``;
//

// Weight //
export const Weight = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Weight [kg]"
    type="tel"
    fieldName={UserConfigFields.WEIGHT}
    placeholder="100 [kg]"
  />
))``;
//

// Image //
export const Image = () => {
  const { user } = useUserContext();
  const initImagePreview = `${API_URL}${user?.image}`;
  return (
    <ImagePicker
      fieldName={UserConfigFields.IMAGE}
      type={ImagePickerType.CIRCLE}
      size={ImagePickerSize.MEDIUM}
      initImagePreview={initImagePreview}
    />
  );
};
//
