import React from "react";

import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      variant="standard"
      label="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
