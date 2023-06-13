import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Avatar, Typography, Button, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";

type UserInfo = {
  image: string;
  basicInfo: { name: string; value: string | number }[];
  gyms?: string[];
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
              // todo: change dummy key
              <Item key={uuidv4()} disablePadding>
                <Caption variant="caption" color="primary">
                  {info.name}
                </Caption>
                <Typography>{info.value}</Typography>
              </Item>
            );
          })}
          {gyms && (
            // todo: find gyms by id when gyms will be added on backend
            <Box>
              <Caption variant="caption" color="primary">
                gyms
              </Caption>
              <List disablePadding>
                {gyms.map((gym, i) => {
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
