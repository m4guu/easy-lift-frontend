import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Divider, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";

import { UserBasicInfo } from "./views/UserBasicInfo/UserBasicInfo";
import { UserFieldInfo } from "./views/UserBasicInfo/UserFieldInfo";

type UserInformationProps = {
  userImage: string;
  basicInfo: { name: string; value: string | number }[];
  fields: { name: string; value: string; icon: JSX.Element }[];
  gyms?: string[];
};

export const UserInformation: React.FC<UserInformationProps> = ({
  userImage,
  basicInfo,
  fields,
  gyms,
}) => {
  return (
    <Box>
      <NoPaddingDivider />
      <UserBasicInfo image={userImage} basicInfo={basicInfo} gyms={gyms} />
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
