import React from "react";

import { Box, Avatar, Typography, Button, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";

import { Gym } from "../../../../../../shared/interfaces";

type UserInfo = {
  image: string;
  basicInfo: { name: string; value: string | number }[];
  gyms?: Gym[];
};

export const UserBasicInfo: React.FC<UserInfo> = ({
  image,
  basicInfo,
  gyms,
}) => {
  return (
    <Container>
      <Content>
        <UserAvatar variant="circular" src={image} sizes="50" alt="user" />
        <List disablePadding>
          {basicInfo.map((info) => {
            return (
              <Item disablePadding>
                <Caption variant="caption" color="primary">
                  {info.name}
                </Caption>
                <Typography>{info.value}</Typography>
              </Item>
            );
          })}
        </List>
      </Content>
      <Button variant="outlined">edit</Button>
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
