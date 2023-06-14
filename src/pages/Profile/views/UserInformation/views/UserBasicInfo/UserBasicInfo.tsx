import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Avatar, Typography, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";

import { UseUpdateUserModalArgs } from "../../../../../../hooks/modalHooks/UpdateUser/useUpdateUserModal";

import {
  generateUserBasicInfo,
  generateDefaultUserConfigFormValues,
  generateDefaultTrainerConfigFormValues,
} from "../../../../../../utils/UserInformation";

import { UserConfigurationForm } from "../../../../../Configuration/views/ConfigurationForm/UserConfigurationForm";
import { TrainerConfigurationForm } from "../../../../../Configuration/views/ConfigurationForm/TrainerConfigurationForm";
import { EditButtonWithUpdateModal } from "../../../../../../components/EditButtonWithUpdateModal";

import { Role } from "../../../../../../shared/enums";
import { User } from "../../../../../../shared/interfaces";
import { API_URL } from "../../../../../../config/env.config";

export const UserBasicInfo: React.FC<{ user: User }> = ({ user }) => {
  const userImage = `${API_URL}${user?.image}`;
  const basicInfo = generateUserBasicInfo(user);
  const tForm =
    user.role === Role.user ? (
      <UserConfigurationForm
        defaultValues={generateDefaultUserConfigFormValues(user)}
      />
    ) : (
      <TrainerConfigurationForm
        defaultValues={generateDefaultTrainerConfigFormValues(user)}
      />
    );

  const updateBasicInfoButtonProps: UseUpdateUserModalArgs = {
    tHeader: "Update my data",
    tForm,
  };

  return (
    <Container>
      <Content>
        <UserAvatar variant="circular" src={userImage} sizes="50" alt="user" />
        <List disablePadding>
          {basicInfo.map((info) => {
            return (
              // todo: change dummy key
              <Item key={uuidv4()} disablePadding>
                <Caption variant="caption" color="primary">
                  {info.name}
                </Caption>
                <Typography>{info.value}</Typography>
              </Item>
            );
          })}
          {user && user.gyms && (
            // todo: find gyms by id when gyms will be added on backend
            <Box>
              <Caption variant="caption" color="primary">
                gyms
              </Caption>
              <List disablePadding>
                {user.gyms.map((gym, i) => {
                  return (
                    // todo: change dummy key
                    <Item key={uuidv4()} disablePadding>
                      gym number {i + 1}
                    </Item>
                  );
                })}
              </List>
            </Box>
          )}
        </List>
      </Content>

      <EditButtonWithUpdateModal
        updateProps={updateBasicInfoButtonProps}
        variant="outlined"
      />
    </Container>
  );
};

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Content = styled(Box)({
  display: "flex",
  gap: "1rem",
});
const Caption = styled(Typography)({
  textTransform: "capitalize",
});
const Item = styled(ListItem)({
  flexDirection: "column",
  alignItems: "flex-start",
});

const UserAvatar = styled(Avatar)({
  width: "4rem",
  height: "4rem",
});
