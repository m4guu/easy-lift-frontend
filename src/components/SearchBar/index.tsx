import React from "react";

import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps
  extends Omit<TextFieldProps, "variant" | "InputProps" | "label"> {}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <Search
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

const Search = styled(TextField)({});

export default SearchBar;
