import { MenuItem } from "@mui/material";
import { styled } from "@mui/system";

import { ControlledTextField } from "../../../../../../features";
import { AuthFormFields } from "../../../../../../hooks/formHooks/auth/useAuthForm";
import { Role, TestId } from "../../../../../../shared/enums";

// Email //
export const AuthEmail = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="E-mail"
    type="email"
    fieldName={AuthFormFields.E_MAIL}
    placeholder="xyz@gmail.com"
  />
))``;
//

// Password //
export const AuthPassword = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Password"
    type="password"
    fieldName={AuthFormFields.PASSWORD}
    placeholder="*****"
    testId={TestId.PASSWORD}
  />
))``;
//

// Confirm Password //
export const ConfirmPassword = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Confirm Password"
    type="password"
    fieldName={AuthFormFields.CONFIRM_PASSWORD}
    placeholder="*****"
    testId={TestId.CONFIRM_PASSWORD}
  />
))``;
//

// Confirm Password //
export const AuthRole = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Role"
    select
    fieldName={AuthFormFields.ROLE}
  >
    {Object.values(Role).map((roleItem) => {
      return (
        <MenuItem key={roleItem} value={roleItem}>
          {roleItem}
        </MenuItem>
      );
    })}
  </ControlledTextField>
))``;
//
