import React from "react";

import { Box, Divider } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { styled } from "@mui/system";

import { UserBasicInfo } from "./views/UserBasicInfo/UserBasicInfo";
import { UserFieldInfo } from "./views/UserBasicInfo/UserFieldInfo";
import { User } from "../../../../shared/interfaces";
import { passwordField } from "./views/constans";
import { API_URL } from "../../../../config/env.config";

export const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  const userImage = `${API_URL}${user.image}`;
  const userBasicInfo = [
    { name: "name", value: user.name! },
    { name: "height", value: user.height! },
    { name: "weight", value: user.bodyWeights?.at(-1)?.weight! },
  ];

  const emailField = {
    icon: <MailOutlineIcon />,
    name: "email",
    value: user.email,
  };

  return (
    <Box>
      <NoPaddingDivider />
      <UserBasicInfo image={userImage} basicInfo={userBasicInfo} />
      <NoPaddingDivider />
      <UserFieldInfo field={emailField} />
      <NoPaddingDivider />
      <UserFieldInfo field={passwordField} />
      <NoPaddingDivider />
    </Box>
  );
};

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  marginLeft: `-${theme.spacing(2)}`,
  marginRight: `-${theme.spacing(2)}`,
  margin: `0.7rem -${theme.spacing(2)}`,
}));
