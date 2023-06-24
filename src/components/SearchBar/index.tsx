import React from "react";

import {
  Box,
  InputBase,
  InputBaseProps,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC<InputBaseProps> = (props) => {
  return (
    <ControlLabel
      labelPlacement="top"
      label={
        <Typography
          sx={{ marginRight: "auto" }}
          variant="caption"
          color="text.secondary"
        >
          Search bar
        </Typography>
      }
      control={
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search..."
            value={props.value}
            onChange={props.onChange}
          />
        </Search>
      }
    />
  );
};

const Search = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  maxWidth: "20rem",
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: "all 0.3s ease-out",
    width: "100%",
  },
}));

const ControlLabel = styled(FormControlLabel)({
  margin: 0,
});
export default SearchBar;
