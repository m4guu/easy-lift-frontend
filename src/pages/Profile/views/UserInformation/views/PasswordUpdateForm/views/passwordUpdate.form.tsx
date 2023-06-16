import { styled } from "@mui/material";

import { ControlledTextField } from "../../../../../../../features";
import { PasswordUpdateFields } from "../../../../../../../hooks/formHooks/update/usePasswordUpdateForm";

// New Password //
export const NewPassword = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="New password"
    type="password"
    fieldName={PasswordUpdateFields.NEW_PASSWORD}
    placeholder="*****"
  />
))``;
//

// Password //
export const ConfirmPassword = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Confirm new password"
    type="password"
    fieldName={PasswordUpdateFields.CONFIRM_PASSWORD}
    placeholder="*****"
  />
))``;
//

// Password //
export const Password = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Current password"
    type="password"
    fieldName={PasswordUpdateFields.PASSWORD}
    placeholder="*****"
  />
))``;
//
