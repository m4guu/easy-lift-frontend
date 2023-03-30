import React, { useState } from "react";

import { Box, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";

export interface SettingAction {
  id: string;
  name: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface DotsSettingsProps {
  actions: SettingAction[];
}

const DotsSettings: React.FC<DotsSettingsProps> = ({ actions }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton color="primary" onClick={handleClick} sx={{ p: 0 }}>
        <MoreVertSharpIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <Item
            key={action.id}
            onClick={() => {
              setAnchorEl(null);
              action.onClick();
            }}
          >
            <ActionName>{action.name}</ActionName>
            {action.icon}
          </Item>
        ))}
      </Menu>
    </Box>
  );
};

const Item = styled(MenuItem)({
  display: "flex",
  justifyContent: "space-between",
});

const ActionName = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  paddingRight: theme.spacing(2),
}));

export default DotsSettings;
