import React from "react";

import { List, ListItem, Link, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { socials } from "./constans";

const MediaFooter: React.FC = () => {
  return (
    <Footer>
      <SocialList>
        {socials.map((social) => {
          return (
            <SocialItem key={social.id}>
              <SocialLink
                href={social.link}
                underline="hover"
                variant="caption"
                target="blank"
              >
                {social.icon} <Typography>{social.name}</Typography>
              </SocialLink>
            </SocialItem>
          );
        })}
      </SocialList>
    </Footer>
  );
};

const Footer = styled("footer")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  padding: `0 ${theme.spacing(50)}`,
}));
const SocialList = styled(List)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const SocialItem = styled(ListItem)({
  justifyContent: "center",
});
const SocialLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));
export default MediaFooter;
