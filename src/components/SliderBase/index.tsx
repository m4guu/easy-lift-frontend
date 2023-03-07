import React from "react";

import { Typography, FormControlLabel, Slider, Box } from "@mui/material";
import { styled, useTheme } from "@mui/system";

interface SliderBaseProps {
  label: string;
  valueLabel: string;
  selectedValue: number[];
  handleSelectValue: (_event: Event, value: number[] | number) => void;
  minValue: number;
  maxValue: number;
}

const SilderBase: React.FC<SliderBaseProps> = ({
  label,
  valueLabel,
  selectedValue,
  handleSelectValue,
  minValue,
  maxValue,
}) => {
  const theme = useTheme();
  return (
    <SilderContainer>
      <SliderLabel
        labelPlacement="top"
        label={
          <Typography variant="caption" color={theme.palette.text.secondary}>
            {label}
          </Typography>
        }
        control={
          <ControlSlider
            value={selectedValue}
            onChange={handleSelectValue}
            size="small"
            min={minValue}
            max={maxValue}
          />
        }
      />

      <SelectedValues>
        <Typography variant="caption">
          {selectedValue[0]} {valueLabel}
        </Typography>
        <Typography variant="caption">
          {selectedValue[1]} {valueLabel}
        </Typography>
      </SelectedValues>
    </SilderContainer>
  );
};

const SilderContainer = styled(Box)(({ theme }) => ({
  width: "15%",
  [theme.breakpoints.down("md")]: {
    width: "80% !important",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
  },
}));

const SliderLabel = styled(FormControlLabel)({
  width: "100%",
  margin: 0,
  alignItems: "flex-start",
});

const ControlSlider = styled(Slider)(({ theme }) => ({
  padding: `${theme.spacing(0.9)} 0`,
}));

const SelectedValues = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export default SilderBase;
