import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import { Dropzone } from "./views/Dropzone";
import { ImagePickerSize, ImagePickerType } from "../../shared/enums";

interface ImagePickerProps {
  fieldName: string;
  type: ImagePickerType;
  size: ImagePickerSize;
  fullWidth?: boolean;
  initImagePreview?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  fieldName,
  type,
  size,
  fullWidth,
  initImagePreview,
}) => {
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
          <Dropzone
            changeImageField={onChange}
            type={type}
            size={size}
            fullwidth={fullWidth}
            initImagePreview={initImagePreview}
          />
        )}
      />
    </Box>
  );
};

export default ImagePicker;
