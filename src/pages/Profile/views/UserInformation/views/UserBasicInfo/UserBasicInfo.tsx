import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { styled, Theme } from "@mui/system";

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
  const isBeloweSmBreakpoint = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

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
        <UserAvatar variant="circular" src={userImage} alt="user" />
        <List disablePadding>
          {basicInfo.map((info) => {
            return (
              // todo: change dummy key
              <Item key={uuidv4()} disablePadding>
                <Caption variant="caption" color="primary">
                  {info.name}
                </Caption>
                <InfoValue>{info.value}</InfoValue>
              </Item>
            );
          })}
          {user && user.gyms && (
            // todo: find gyms by id when gyms will be added on backend
            <GymsContainer>
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
            </GymsContainer>
          )}
        </List>
      </Content>

      <EditButtonWithUpdateModal
        updateProps={updateBasicInfoButtonProps}
        variant="outlined"
        size="small"
        fullWidth={isBeloweSmBreakpoint}
      />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

const GymsContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

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

const InfoValue = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    wordWrap: "break-word",
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: "4rem",
  height: "4rem",
  [theme.breakpoints.down("sm")]: {
    width: "3rem",
    height: "3rem",
  },
}));
