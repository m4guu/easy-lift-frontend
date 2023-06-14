import { styled } from "@mui/material";

import { ControlledTextField } from "../../../../../../../features";
import { EmailUpdateFields } from "../../../../../../../hooks/formHooks/update/useEmailUpdateForm";

// Email //
export const UpdateEmail = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="New email address"
    type="email"
    fieldName={EmailUpdateFields.EMAIL}
    placeholder="xyz@gmail.com"
  />
))``;
//

// Confirm Email //
export const ConfirmEmail = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Confirm new email address"
    type="email"
    fieldName={EmailUpdateFields.CONFIRM_EMAIL}
    placeholder="xyz@gmail.com"
  />
))``;
//

// Password //
export const Password = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Password"
    type="password"
    fieldName={EmailUpdateFields.PASSWORD}
    placeholder="*****"
  />
))``;
//
