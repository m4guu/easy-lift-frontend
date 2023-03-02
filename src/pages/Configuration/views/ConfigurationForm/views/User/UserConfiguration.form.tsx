import { styled } from "@mui/system";

import { UserConfigFields } from "../../../../../../hooks/formHooks/configuration/useUserConfigForm";
import { ControlledTextField } from "../../../../../../features";
import ImagePicker from "../../../../../../features/ImagePicker";

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
export const Image = styled(() => (
  <ImagePicker fieldName={UserConfigFields.IMAGE} />
))``;
//
