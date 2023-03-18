import React from "react";

import {
  Typography,
  Box,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { ProgramLevels } from "../../../../../../shared/enums";

interface LevelFilterProps {
  selectedLevel: ProgramLevels;
  handleSelectLevel: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LevelFilter: React.FC<LevelFilterProps> = ({
  selectedLevel,
  handleSelectLevel,
}) => {
  const theme = useTheme();
  return (
    <RadioContainer>
      <FormLabel id="radios-label">
        <Typography variant="caption" color={theme.palette.text.secondary}>
          Program Level
        </Typography>
      </FormLabel>
      <Radios
        aria-labelledby="radios-label"
        value={selectedLevel}
        onChange={handleSelectLevel}
        defaultValue={ProgramLevels.NOVICE}
      >
        {Object.values(ProgramLevels).map((programLevel) => {
          return (
            <FormControlLabel
              key={programLevel}
              value={programLevel}
              control={<Radio size="small" />}
              label={<Typography variant="caption">{programLevel}</Typography>}
            />
          );
        })}
      </Radios>
    </RadioContainer>
  );
};

const RadioContainer = styled(Box)({
  textAlign: "center",
});
const Radios = styled(RadioGroup)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
