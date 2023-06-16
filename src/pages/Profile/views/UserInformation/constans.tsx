import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";

import { FieldUserInformation } from "../../../../shared/interfaces";
import { UseUpdateUserModalArgs } from "../../../../hooks/modalHooks/UpdateUser/useUpdateUserModal";

export const partialEmailField: Omit<
  FieldUserInformation,
  "value" | "updateButtonProps"
> = {
  icon: <MailOutlineIcon fontSize="large" />,
  name: "email",
};

export const partialUpdateEmailButtonProps: Omit<
  UseUpdateUserModalArgs,
  "form"
> = {
  header: "change e-mail address",
  description:
    "We will make sure that all important messages from EasyLift are sent to your new e-mail address.",
};

export const partialPasswordField: Omit<
  FieldUserInformation,
  "updateButtonProps"
> = {
  icon: <KeyIcon fontSize="large" />,
  name: "password",
  value: "************",
};

export const partialUpdatePasswordButtonProps: Omit<
  UseUpdateUserModalArgs,
  "form"
> = {
  header: "change password",
  description:
    "You can update your password at any time to keep your EasyLift account secure.",
};
