import React from "react";

import { styled } from "@mui/system";
import {
  Tooltip,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";

import { useUserContext } from "../../../contexts/userContext";

import { ThemeModeSwitch } from "../../../components";

type AccountSettingsProps = {
  image: string;
};

const AccountSettings: React.FC<AccountSettingsProps> = ({ image }) => {
  const { logout } = useUserContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <AccImgIconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <UserAvatar src={image} alt="Avatar" />
        </AccImgIconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <SettingsMenuItem>
          <LogoutButton
            onClick={() => {
              logout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </LogoutButton>
        </SettingsMenuItem>
        <ThemeModeSwitchBox>
          <ThemeModeSwitch />
        </ThemeModeSwitchBox>
      </Menu>
    </Box>
  );
};

const UserAvatar = styled(Avatar)({
  width: 56,
  height: 56,
});

const AccImgIconButton = styled(IconButton)({
  padding: 0,
});

const SettingsMenuItem = styled(MenuItem)({
  padding: 0,
});

const LogoutButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  borderRadius: 0,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ThemeModeSwitchBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

export default AccountSettings;
