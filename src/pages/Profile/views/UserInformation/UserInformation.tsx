import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Divider, List } from "@mui/material";
import { styled } from "@mui/system";

import { UserFieldInfo } from "../../../../components";
import { UserBasicInfo } from "./views/UserBasicInfo/UserBasicInfo";
import { EmailUpdateForm } from "./views/EmailUpdateForm/EmailUpdateForm";
import { PasswordUpdateForm } from "./views/PasswordUpdateForm/PasswordUpdateForm";

import { FieldUserInformation, User } from "../../../../shared/interfaces";
import {
  partialEmailField,
  partialPasswordField,
  partialUpdateEmailButtonProps,
  partialUpdatePasswordButtonProps,
} from "./constans";

type UserInformationProps = {
  user: User;
};

export const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
  const emailField: FieldUserInformation = {
    ...partialEmailField,
    value: user.email,
    updateButtonProps: {
      ...partialUpdateEmailButtonProps,
      tForm: <EmailUpdateForm currentEmail={user.email} />,
    },
  };
  const passwordField: FieldUserInformation = {
    ...partialPasswordField,
    updateButtonProps: {
      ...partialUpdatePasswordButtonProps,
      tForm: <PasswordUpdateForm />,
    },
  };

  const fields = [emailField, passwordField];
  return (
    <Box>
      <NoPaddingDivider />
      <UserBasicInfo user={user} />
      <NoPaddingDivider />

      <List disablePadding>
        {fields &&
          fields.map((field) => {
            return (
              <Item key={uuidv4()}>
                <UserFieldInfo field={field} />
                <NoPaddingDivider />
              </Item>
            );
          })}
      </List>
    </Box>
  );
};

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  marginLeft: `-${theme.spacing(2)}`,
  marginRight: `-${theme.spacing(2)}`,
  margin: `0.7rem -${theme.spacing(2)}`,
}));

const Item = styled("li")({});
