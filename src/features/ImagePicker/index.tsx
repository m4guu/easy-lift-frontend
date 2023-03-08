import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { Dropzone } from "./views/Dropzone";

interface ImagePickerProps {
  fieldName: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ fieldName }) => {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="caption" color={theme.palette.text.secondary}>
        Image
      </Typography>
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange } }) => (
          <Dropzone changeImageField={onChange} />
        )}
      />
    </Box>
  );
};

export default ImagePicker;
