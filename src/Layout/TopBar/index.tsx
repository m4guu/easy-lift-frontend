import React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { PATHS } from "../../pages/paths";

import { useGetUserRoleAndImage } from "../../store/redux-store/slices/user/user.hooks";

import AccountSettings from "./AccountSettings";

const TopBar: React.FC = () => {
  const { role, image } = useGetUserRoleAndImage();
  const navigate = useNavigate();

  const buttonText = role === "user" ? "start training" : "create new program";
  const buttonLink = role === "user" ? PATHS.NEW_WORKOUT : PATHS.NEW_PROGRAM;

  return (
    <SectionContainer>
      <Button
        onClick={() => navigate(buttonLink)}
        variant="contained"
        startIcon={<AddIcon />}
      >
        {buttonText}
      </Button>
      <AccountSettingsBox>
        <AccountSettings image={image} />
      </AccountSettingsBox>
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  gap: "1rem",
  paddingRight: "1rem",
  height: "100%",
  borderBottom: `solid thin ${theme.palette.others.border_color}`,
  [theme.breakpoints.down("lg")]: {
    height: "inherit",
    borderTop: `solid thin ${theme.palette.others.border_color}`,
    justifyContent: "space-around",
    padding: "0.6rem 0rem",
  },
}));

const AccountSettingsBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));
export default TopBar;
