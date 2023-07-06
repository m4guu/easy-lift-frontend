import { styled } from "@mui/system";

import { ControlledTextField } from "../../../../../features";

import { BodyWeightUpdateFields } from "../../../../../hooks/formHooks/update/useBodyWeightUpdate";

// Body weight //
export const BodyWeight = styled(() => (
  <ControlledTextField
    variant="standard"
    size="medium"
    label="Body Weight"
    type="tel"
    fieldName={BodyWeightUpdateFields.BODY_WEIGHT}
  />
))``;
//
